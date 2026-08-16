/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { NotificationService } from './src/serviceManager/NotificationService';

// Disable console outputs in production release builds
if (!__DEV__) {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.debug = () => {};
}

// Register background handler
setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
  
  if (remoteMessage.notification) {
    // FCM automatically displays background notifications if the `notification` payload is present.
    // We do NOT need to manually display it here with Notifee, otherwise it causes duplicates.
  } else if (remoteMessage.data && remoteMessage.data.type === 'chat') {
    // If it's a data-only message for chat, FCM won't show it automatically, so we handle it.
    await NotificationService.displayLocalNotification(
      `New message from ${remoteMessage.data.name || 'someone'}`,
      remoteMessage.data.message || 'You received a new message',
      remoteMessage.data
    );
  }
});

AppRegistry.registerComponent(appName, () => App);
