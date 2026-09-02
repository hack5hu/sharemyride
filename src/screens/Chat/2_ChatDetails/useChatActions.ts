import { useCallback } from 'react';
import { Linking } from 'react-native';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import {
  AnalyticsService,
  AnalyticsEvent,
} from '@/serviceManager/AnalyticsService';
import { ChatService } from '@/serviceManager/ChatService';
import { UserService } from '@/serviceManager/UserService';

interface UseChatActionsProps {
  message: string;
  setMessage: (msg: string) => void;
  myUserId?: string;
  receiverId?: string;
  conversationId: string;
  dynamicRideInfo: any;
  routeParams: any;
  setIsReportModalVisible: (visible: boolean) => void;
  t: (key: string) => string;
  cachedUser?: { phoneNumber?: string };
}

export const useChatActions = ({
  message,
  setMessage,
  myUserId,
  receiverId,
  conversationId,
  dynamicRideInfo,
  routeParams,
  setIsReportModalVisible,
  t,
  cachedUser,
}: UseChatActionsProps) => {
  const navigation = useAppNavigation();

  const handleSend = useCallback(() => {
    if (!message.trim() || !myUserId || !receiverId || receiverId === 'Unknown')
      {return;}

    ChatService.sendMessage({
      senderId: myUserId,
      receiverId,
      content: message,
      type: 'text',
      metadata: {
        userName: routeParams?.name,
        userAvatar: routeParams?.avatarUri,
        userRating: routeParams?.rating,
        rideId: routeParams?.rideId,
        rideInfo: dynamicRideInfo,
      },
    });

    AnalyticsService.logEvent(AnalyticsEvent.CHAT_MESSAGE_SENT, {
      type: 'text',
      receiver_id: receiverId,
    });

    setMessage('');
  }, [message, myUserId, receiverId, routeParams, dynamicRideInfo, setMessage]);

  const handleLocationShare = useCallback(() => {
    navigation.navigate('SelectLocation' as any, {
      userId: receiverId,
      name: routeParams?.name,
      avatarUri: routeParams?.avatarUri,
      rideId: routeParams?.rideId,
      rideInfo: dynamicRideInfo,
      rating: routeParams?.rating,
    });
  }, [navigation, receiverId, routeParams, dynamicRideInfo]);

  const handleMapPress = useCallback(
    (location: any) => {
      navigation.navigate('RideRouteMap', {
        destination: {
          latitude: location.latitude,
          longitude: location.longitude,
          name: location.locationName || 'Destination',
          address: location.address,
        },
      });
    },
    [navigation],
  );

  const handleReportSubmit = useCallback(
    async (data: {
      categoryId: string;
      reason?: string;
      description: string;
    }) => {
      setIsReportModalVisible(false);
      const targetUserId = receiverId;
      if (!targetUserId || targetUserId === 'Unknown') return;

      try {
        await UserService.reportUser({
          reportedUserId: targetUserId,
          reason: data.reason || data.categoryId.toUpperCase(),
          description: data.description,
        });
        showNotification(
          NotificationType.SUCCESS,
          t('chat.reportSuccessTitle') || 'Report Submitted',
          t('chat.reportSuccessMessage') ||
            'Thank you for reporting. Our team will review this user.',
        );
      } catch (e: any) {
        console.error('Chat report submission error:', e);
        showNotification(
          NotificationType.ERROR,
          'Submission Failed',
          e?.response?.data?.message ||
            e?.message ||
            'Failed to submit report. Please try again.',
        );
      }
    },
    [receiverId, setIsReportModalVisible, t],
  );

  const handleRetry = useCallback(
    (messageId: string) => {
      if (conversationId) {
        ChatService.resendMessage(conversationId, messageId);
      }
    },
    [conversationId],
  );

  const handleReconnect = useCallback(() => {
    if (myUserId) {
      ChatService.connect(myUserId).catch(() => undefined);
    }
  }, [myUserId]);

  const handleCall = useCallback(() => {
    const phone = cachedUser?.phoneNumber;
    if (phone) {
      Linking.openURL(`tel:${phone}`).catch(err => {
        console.error('Failed to open dialer from chat:', err);
      });
    }
  }, [cachedUser?.phoneNumber]);

  const handleProfilePress = useCallback(() => {
    if (receiverId) {
      navigation.navigate('UserProfileDetail', {
        userId: receiverId,
      });
    }
  }, [navigation, receiverId]);

  return {
    handleSend,
    handleLocationShare,
    handleMapPress,
    handleReportSubmit,
    handleRetry,
    handleReconnect,
    handleCall,
    handleProfilePress,
  };
};

