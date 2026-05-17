import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { useCallback } from 'react';

export type AppNavigationProp = StackNavigationProp<RootStackParamList>;

export const useAppNavigation = () => {
  const navigation = useNavigation<AppNavigationProp>();

  const navigate = useCallback(
    <RouteName extends keyof RootStackParamList>(
      name: RouteName,
      params?: RootStackParamList[RouteName]
    ) => {
      (navigation.navigate as any)(name, params);
    },
    [navigation]
  );

  const push = useCallback(
    <RouteName extends keyof RootStackParamList>(
      name: RouteName,
      params?: RootStackParamList[RouteName]
    ) => {
      if ('push' in navigation) {
        (navigation.push as any)(name, params);
      } else {
        (navigation.navigate as any)(name, params);
      }
    },
    [navigation]
  );

  const replace = useCallback(
    <RouteName extends keyof RootStackParamList>(
      name: RouteName,
      params?: RootStackParamList[RouteName]
    ) => {
      if ('replace' in navigation) {
        (navigation.replace as any)(name, params);
      } else {
        (navigation.navigate as any)(name, params);
      }
    },
    [navigation]
  );

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const popToTop = useCallback(() => {
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
      params?: RootStackParamList[RouteName]
    ) => {
      navigation.reset({
        index: 0,
        routes: [{ name: name as any, params }],
      });
    },
    [navigation]
  );

  /**
   * Resets navigation stack with a custom array sequence of route objects (stack array).
   */
  const resetWithStack = useCallback(
    (routes: Array<{ name: keyof RootStackParamList; params?: any }>) => {
      navigation.reset({
        index: routes.length - 1,
        routes: routes as any[],
      });
    },
    [navigation]
  );

  return {
    navigation,
    navigate,
    push,
    replace,
    goBack,
    popToTop,
    resetTo,
    resetWithStack,
  };
};
