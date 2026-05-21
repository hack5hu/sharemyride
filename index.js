/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import NotificationService from './src/serviceManager/notificationService';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
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
