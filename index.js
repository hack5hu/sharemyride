/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import NotificationService from './src/serviceManager/notificationService';

// Register background handler
setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
  console.log('====== BACKGROUND NOTIFICATION RECEIVED ======');
  console.log(JSON.stringify(remoteMessage, null, 2));
  console.log('Message handled in the background!', remoteMessage);
  
  if (remoteMessage.notification) {
    await NotificationService.displayLocalNotification(
      remoteMessage.notification.title || 'Notification',
      remoteMessage.notification.body || '',
      remoteMessage.data
    );
  } else if (remoteMessage.data && remoteMessage.data.type === 'chat') {
    // If it's a data-only message for chat
    await NotificationService.displayLocalNotification(
      `New message from ${remoteMessage.data.name || 'someone'}`,
      remoteMessage.data.message || 'You received a new message',
      remoteMessage.data
    );
  }
});

AppRegistry.registerComponent(appName, () => App);
