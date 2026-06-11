/**
 * Mock for @react-native-firebase/app and @react-native-firebase/messaging in Storybook (Web platform)
 */
const mockMessaging = () => ({
  getToken: () => Promise.resolve('mock-fcm-token-12345'),
  requestPermission: () => Promise.resolve(1),
  registerDeviceForRemoteMessages: () => Promise.resolve(),
  isDeviceRegisteredForRemoteMessages: true,
  onMessage: () => () => {},
  onNotificationOpenedApp: () => () => {},
  getInitialNotification: () => Promise.resolve(null),
});

mockMessaging.AuthorizationStatus = {
  AUTHORIZED: 1,
  DENIED: 0,
  NOT_DETERMINED: -1,
  PROVISIONAL: 2,
};

const mockFirebaseApp = {
  messaging: mockMessaging,
  initializeApp: () => {},
  app: () => ({}),
};

export default mockMessaging;
export { mockFirebaseApp as firebase };
