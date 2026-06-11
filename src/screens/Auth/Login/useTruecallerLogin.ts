import { useState, useCallback, useEffect } from 'react';
import { Keyboard, Alert } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';
import { useTruecaller, type TruecallerAndroidResponse } from '@ajitpatel28/react-native-truecaller';
import { useAuthStore } from '@/store/useAuthStore';
import { Logger } from '@/utils/logger';
import { useNetworkLoggerStore } from '@/store/useNetworkLoggerStore';
import {
  USER_DISMISS_CODES,
  TRANSIENT_SDK_CODES,
  executeTruecallerAuth,
  syncUserProfileAndData,
  getTruecallerOptions,
} from './truecallerHelper';

interface UseTruecallerLoginProps {
  setLoading: (loading: boolean) => void;
}

export const useTruecallerLogin = ({ setLoading }: UseTruecallerLoginProps) => {
  const { t } = useTranslation();
  const { setAuth } = useAuthStore();
  const [isTruecallerSupported, setIsTruecallerSupported] = useState(false);
  const [hasDismissedTruecaller, setHasDismissedTruecaller] = useState(false);

  const verifyTruecaller = useCallback(
    async (params: {
      authorizationCode?: string;
      codeVerifier?: string;
    }) => {
      setLoading(true);
      try {
        if (!params.authorizationCode) {
          showNotification(
            NotificationType.ERROR,
            t('notification.defaultErrorTitle'),
            t('login.truecallerInvalidCredentials')
          );
          setLoading(false);
          return;
        }

        const response = await executeTruecallerAuth(
          params.authorizationCode,
          params.codeVerifier
        );

        if (response.data.status === 'success' || response.status === 200) {
          const { token, userId, userProfileCompleted: completed } = response.data;
          await syncUserProfileAndData(userId, token, completed, setAuth);
          showNotification(
            NotificationType.SUCCESS,
            t('notification.welcomeSuccessTitle'),
            t('notification.welcomeBack')
          );
        } else {
          showNotification(
            NotificationType.ERROR,
            t('notification.defaultErrorTitle'),
            response.data.message || t('notification.defaultErrorMessage')
          );
        }
      } catch (error: any) {
        Logger.error('Truecaller login failed', error);
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(error, t('login.truecallerLoginFailed'))
        );
      } finally {
        setLoading(false);
      }
    },
    [setAuth, t, setLoading]
  );

  const handleTruecallerSuccess = useCallback(
    (data: {
      accessToken?: string;
      authorizationCode?: string;
      codeVerifier?: string;
    }) => verifyTruecaller(data),
    [verifyTruecaller]
  );

  const androidSuccessHandler = useCallback((data: TruecallerAndroidResponse) => {
    useNetworkLoggerStore.getState().addLog({
      id: `tc-${Date.now()}`,
      method: 'SDK',
      url: 'truecaller://verify',
      requestHeaders: {},
      requestBody: null,
      responseStatus: 200,
      responseHeaders: null,
      responseBody: data,
      startTime: Date.now(),
      endTime: Date.now(),
      duration: 0,
      isError: false,
    });

    const accessToken = (data as any).accessToken || '';
    handleTruecallerSuccess({
      accessToken,
      authorizationCode: data.authorizationCode,
      codeVerifier: (data as any).codeVerifier,
    });
  }, [handleTruecallerSuccess]);

  const {
    initializeTruecallerSDK,
    openTruecallerForVerification,
    isSdkUsable,
    userProfile,
    error: truecallerError,
  } = useTruecaller(getTruecallerOptions(androidSuccessHandler));

  // Robust initialization logic with delay and retries
  useEffect(() => {
    let active = true;
    let timerId: ReturnType<typeof setTimeout>;
    let retries = 0;
    const maxRetries = 3;

    const init = () => {
      Logger.log(`Initializing Truecaller SDK (attempt ${retries + 1})...`);
      initializeTruecallerSDK()
        .then(() => isSdkUsable())
        .then((supported) => {
          Logger.log('Truecaller SDK support check:', supported);
          if (active) {
            setIsTruecallerSupported(supported);
          }
        })
        .catch((err) => {
          Logger.log(`Truecaller SDK init attempt ${retries + 1} failed:`, err);
          if (active) {
            if (retries < maxRetries) {
              retries++;
              timerId = setTimeout(init, 1000);
            } else {
              setIsTruecallerSupported(false);
            }
          }
        });
    };

    // Delay initialization to let Android Activity mount
    timerId = setTimeout(init, 500);

    return () => {
      active = false;
      clearTimeout(timerId);
    };
  }, [initializeTruecallerSDK, isSdkUsable]);

  useEffect(() => {
    if (userProfile) {
      handleTruecallerSuccess({ accessToken: (userProfile as any).accessToken || '' });
    }
  }, [userProfile, handleTruecallerSuccess]);

  useEffect(() => {
    Logger.log('Truecaller error event:', truecallerError);
    if (!truecallerError) return;

    const errorStr = String(truecallerError);

    useNetworkLoggerStore.getState().addLog({
      id: `tc-err-${Date.now()}`,
      method: 'SDK',
      url: 'truecaller://error',
      requestHeaders: {},
      requestBody: null,
      responseStatus: 400,
      responseHeaders: null,
      responseBody: { error: truecallerError },
      startTime: Date.now(),
      endTime: Date.now(),
      duration: 0,
      isError: true,
    });

    if (USER_DISMISS_CODES.test(errorStr)) {
      setHasDismissedTruecaller(true);
    } else if (TRANSIENT_SDK_CODES.test(errorStr)) {
      Logger.log('Truecaller transient SDK error ignored:', errorStr);
    } else {
      showNotification(
        NotificationType.ERROR,
        t('login.truecallerErrorTitle'),
        getErrorMessage(truecallerError, t('login.truecallerLoginFailed'))
      );
    }
  }, [truecallerError, t]);

  const handleTruecallerLogin = async () => {
    Keyboard.dismiss();
    try {
      if (await isSdkUsable()) {
        setHasDismissedTruecaller(false);
        await openTruecallerForVerification();
      } else {
        showNotification(
          NotificationType.ERROR,
          t('login.truecallerUnavailableTitle'),
          t('login.truecallerUnavailableMessage')
        );
      }
    } catch (err) {
      Logger.error('Could not start Truecaller login', err);
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        t('login.truecallerStartError')
      );
    }
  };

  const handleInputFocus = async () => {
    if (isTruecallerSupported && !hasDismissedTruecaller) {
      Keyboard.dismiss();
      await handleTruecallerLogin();
    }
  };

  return {
    isTruecallerSupported,
    hasDismissedTruecaller,
    handleTruecallerLogin,
    handleInputFocus,
  };
};
