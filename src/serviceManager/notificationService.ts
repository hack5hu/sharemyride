import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { Logger } from '@/utils/logger';
import { navigate } from '@/navigation/navigationService';
import { useChatStore } from '@/store/useChatStore';

class NotificationService {
  /**
   * Initialize Notifee and Firebase Messaging
   */
  public static async initialize() {
    // Create default Android channel
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
    }

    // Handle background/foreground events
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification) {
        this.handleNotificationTap(detail.notification);
        await notifee.cancelNotification(detail.notification.id!);
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      if (type === EventType.PRESS && pressAction?.id === 'default' && notification) {
        // Handle notification press from background
        this.handleNotificationTap(notification);
        await notifee.cancelNotification(notification.id!);
      }
    });

    // Request permissions
    await this.requestPermission();
    
    // Set up FCM foreground listener
    this.setupFcmListeners();

    // Check if app was opened via notification
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification?.notification) {
      Logger.log('[Notifee] App opened via notification:', initialNotification);
      this.handleNotificationTap(initialNotification.notification);
    }
  }

  /**
   * Navigate to the appropriate screen based on notification data.
   * Also marks all messages from that sender as read (Optimistic UX).
   */
  public static handleNotificationTap(notification: any) {
    const data = notification.data || {};
    
    if (data.type === 'chat' && data.userId && data.name) {
      Logger.log('[NotificationService] Navigating to ChatDetails from tap', data);

      // Optimistically mark all messages in this conversation as read
      const { myUserId } = useChatStore.getState();
      if (myUserId) {
        const senderId = String(data.userId);
        const conversationId = myUserId < senderId
          ? `${myUserId}_${senderId}`
          : `${senderId}_${myUserId}`;
        useChatStore.getState().markConversationAsRead(conversationId);
      }

      navigate('ChatDetails', { 
        userId: String(data.userId), 
        name: String(data.name),
        rideId: data.rideId ? String(data.rideId) : undefined,
      });
    }
  }

  /**
   * Request notification permissions
   */
  public static async requestPermission() {
    try {
      const settings = await notifee.requestPermission();
      
      if (settings.authorizationStatus >= 1) {
        Logger.log('[Notifee] Permissions enabled');
      } else {
        Logger.warn('[Notifee] Permissions disabled');
      }

      // Also request FCM permission
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        Logger.log('[FCM] Auth status:', authStatus);
      }
    } catch (error) {
      Logger.error('[NotificationService] Permission request failed', error);
    }
  }

  /**
   * Get FCM Token
   */
  public static async getFcmToken(): Promise<string | null> {
    try {
      if (typeof messaging().registerDeviceForRemoteMessages === 'function') {
        await messaging().registerDeviceForRemoteMessages();
      }
      return await messaging().getToken();
    } catch (error) {
      Logger.error('[FCM] Token retrieval failed', error);
      return null;
    }
  }

  /**
   * Set up Firebase Cloud Messaging listeners
   */
  private static setupFcmListeners() {
    // Foreground messages
    messaging().onMessage(async remoteMessage => {
      Logger.log('[FCM] Foreground message arrived:', remoteMessage);

      const data = remoteMessage.data || {};
      const isChatNotification = data.type === 'chat';

      if (isChatNotification) {
        // Smart suppression: if user is already viewing this exact chat, do not show a banner.
        const { activeConversationId, myUserId } = useChatStore.getState();
        const myId = myUserId || '';
        const senderId = String(data.userId || '');
        const expectedConvId = myId < senderId
          ? `${myId}_${senderId}`
          : `${senderId}_${myId}`;

        if (activeConversationId === expectedConvId) {
          Logger.log('[FCM] Suppressed notification: user is already in this chat');
          return;
        }

        // Mark pending delivery in background — user is NOT in this chat
        await this.displayLocalNotification(
          `💬 ${String(data.name || 'New message')}`,
          String(data.message || 'You have a new message'),
          data as Record<string, string>
        );
      } else if (remoteMessage.notification) {
        await this.displayLocalNotification(
          remoteMessage.notification.title || 'Notification',
          remoteMessage.notification.body || '',
          remoteMessage.data as Record<string, string>
        );
      }
    });

    // Handle token refresh
    messaging().onTokenRefresh(token => {
      Logger.log('[FCM] Token refreshed:', token);
    });
  }

  /**
   * Display a local notification using Notifee
   */
  public static async displayLocalNotification(
    title: string,
    body: string,
    data?: Record<string, string | number | object>
  ) {
    const isChat = data?.type === 'chat';
    const groupId = isChat ? `chat-${data.userId}` : 'default-group';

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        color: '#04885b', // Primary brand color
        groupId: groupId,
      },
      data,
    });
  }
}

export default NotificationService;
