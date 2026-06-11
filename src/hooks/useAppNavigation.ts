import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useCallback } from 'react';

export type AppNavigationProp = StackNavigationProp<RootStackParamList>;

/** Module-level timestamp shared across all hook instances to prevent double-tap navigation */
const THROTTLE_MS = 500;
let lastNavigationTime = 0;

const canNavigate = (): boolean => {
  const now = Date.now();
  if (now - lastNavigationTime < THROTTLE_MS) {
    return false;
  }
  lastNavigationTime = now;
  return true;
};

export const useAppNavigation = () => {
  const navigation = useNavigation<AppNavigationProp>();

  const navigate = useCallback(
    <RouteName extends keyof RootStackParamList>(
      name: RouteName,
      params?: RootStackParamList[RouteName],
    ) => {
      if (!canNavigate()) return;
      (navigation.navigate as any)(name, params);
    },
    [navigation],
  );

  const push = useCallback(
    <RouteName extends keyof RootStackParamList>(
      name: RouteName,
      params?: RootStackParamList[RouteName],
    ) => {
      if (!canNavigate()) return;
      if ('push' in navigation) {
        (navigation.push as any)(name, params);
      } else {
        (navigation as any).navigate(name, params);
      }
    },
    [navigation],
  );

  const replace = useCallback(
    <RouteName extends keyof RootStackParamList>(
      name: RouteName,
      params?: RootStackParamList[RouteName],
    ) => {
      if (!canNavigate()) return;
      if ('replace' in navigation) {
        (navigation.replace as any)(name, params);
      } else {
        (navigation as any).navigate(name, params);
      }
    },
    [navigation],
  );

  const goBack = useCallback(() => {
    if (!canNavigate()) return;
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const pop = useCallback(
    (count?: number) => {
      if (!canNavigate()) return;
      if ('pop' in navigation) {
        (navigation as any).pop(count);
      } else {
        (navigation as any).goBack();
      }
    },
    [navigation],
  );

  const popToTop = useCallback(() => {
    if (!canNavigate()) return;
    if ('popToTop' in navigation) {
      (navigation as any).popToTop();
    }
  }, [navigation]);

  /**
   * Resets the entire navigation stack to a specific screen, removing all history.
   */
  const resetTo = useCallback(
    <RouteName extends keyof RootStackParamList>(
      name: RouteName,
      params?: RootStackParamList[RouteName],
    ) => {
      if (!canNavigate()) return;
      navigation.reset({
        index: 0,
        routes: [{ name: name as any, params }],
      });
    },
    [navigation],
  );

  /**
   * Resets navigation stack with a custom array sequence of route objects (stack array).
   */
  const resetWithStack = useCallback(
    (routes: Array<{ name: keyof RootStackParamList; params?: any }>) => {
      if (!canNavigate()) return;
      navigation.reset({
        index: routes.length - 1,
        routes: routes as any[],
      });
    },
    [navigation],
  );

  const setParams = useCallback(
    (params: Partial<RootStackParamList[keyof RootStackParamList]>) => {
      navigation.setParams(params as any);
    },
    [navigation],
  );

  const setOptions = useCallback(
    (options: Partial<any>) => {
      navigation.setOptions(options);
    },
    [navigation],
  );

  const reset = useCallback(
    (state: Parameters<typeof navigation.reset>[0]) => {
      if (!canNavigate()) return;
      navigation.reset(state);
    },
    [navigation],
  );

  return {
    ...navigation,
    navigation,
    navigate,
    push,
    replace,
    goBack,
    pop,
    popToTop,
    resetTo,
    resetWithStack,
    setParams,
  };
};
