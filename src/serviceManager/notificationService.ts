import notifee, { AndroidImportance, EventType, AndroidStyle } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { Logger } from '@/utils/logger';
import { navigate } from '@/navigation/navigationService';
import { useChatStore } from '@/store/useChatStore';
import { requestNotificationPermission } from '@/utils/permissionUtils';
import { MessageStatus } from '@/constants/enums';
import { useAuthStore } from '@/store';

export class NotificationService {
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

      if (
        type === EventType.PRESS &&
        pressAction?.id === 'default' &&
        notification
      ) {
        // Handle notification press from background
        this.handleNotificationTap(notification);
        await notifee.cancelNotification(notification.id!);
      }
    });

    // Request permissions
    await this.requestPermission();

    // === iOS Push Notification Diagnostics ===
    if (Platform.OS === 'ios') {
      try {
        const isRegistered = messaging().isDeviceRegisteredForRemoteMessages;
        Logger.log(`🔔 [iOS Diag] isDeviceRegisteredForRemoteMessages: ${isRegistered}`);

        const apnsToken = await messaging().getAPNSToken();
        Logger.log(`🔔 [iOS Diag] APNs Token: ${apnsToken || 'NULL - THIS IS THE PROBLEM'}`);

        const fcmToken = await messaging().getToken();
        Logger.log(`🔔 [iOS Diag] FCM Token: ${fcmToken || 'NULL'}`);

        const authStatus = await messaging().hasPermission();
        Logger.log(`🔔 [iOS Diag] Auth Status: ${authStatus} (1=AUTHORIZED, 2=PROVISIONAL, 0=DENIED, -1=NOT_DETERMINED)`);
      } catch (diagError) {
        Logger.error('🔔 [iOS Diag] Error during diagnostics:', diagError);
        console.error('🔔 [iOS Diag] Error:', diagError);
      }
    }

    // Set up FCM foreground listener and tap listener
    this.setupFcmListeners();

    // Check if app was opened via Notifee local notification
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification?.notification) {
      Logger.log('[Notifee] App opened via notification:', initialNotification);
      this.handleNotificationTap(initialNotification.notification);
    }

    // Check if app was opened via FCM push notification from completely quit state
    try {
      const fcmInitial = await messaging().getInitialNotification();
      if (fcmInitial) {
        Logger.log('[FCM] App opened via notification (quit state):', fcmInitial);
        this.handleNotificationTap(fcmInitial);
      }
    } catch (err) {
      Logger.error('[FCM] getInitialNotification error:', err);
    }
  }

  /**
   * Navigate to the appropriate screen based on notification data.
   * Also marks all messages from that sender as read (Optimistic UX).
   */
  public static handleNotificationTap(notification: any) {
    Logger.log('[NotificationService] Tapped full payload:', notification);

    const data = notification.data || {};
    const typeStr = String(data.type || '').toLowerCase();

    const rideIdVal = data.rideId || data.ride_id || data.bookingId || data.booking_id;

    if (typeStr === 'chat' && data.userId && data.name) {
      Logger.log(
        '[NotificationService] Navigating to ChatDetails from tap',
        data,
      );

      // Optimistically mark all messages in this conversation as read
      const { myUserId } = useChatStore.getState();
      if (myUserId) {
        const senderId = String(data.userId);
        const conversationId =
          myUserId < senderId
            ? `${myUserId}_${senderId}`
            : `${senderId}_${myUserId}`;
        useChatStore.getState().markConversationAsRead(conversationId);
      }

      navigate('ChatDetails', {
        userId: String(data.userId),
        name: String(data.name),
        rideId: rideIdVal ? String(rideIdVal) : undefined,
      });
    } else if (typeStr === 'ride_request' || typeStr.includes('request')) {
      Logger.log(
        '[NotificationService] Navigating to MyRides (requests) from tap',
        data,
      );
      navigate('MyRides');
    } else if (rideIdVal) {
      Logger.log(
        '[NotificationService] Navigating to RideDetails from tap',
        data,
      );
      navigate('RideDetails', {
        rideId: String(rideIdVal),
      });
    } else {
      Logger.log(
        '[NotificationService] Notification tapped, but no specific routing matched',
        data,
      );
    }
  }

  /**
   * Request notification permissions
   */
  public static async requestPermission() {
    try {
      if (Platform.OS === 'ios') {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
      }
      await requestNotificationPermission();
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
      if (Platform.OS === 'ios') {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
      }
      return await messaging().getToken();
    } catch (error) {
      Logger.warn('[FCM] Token retrieval failed', error);
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
      const typeStr = String(data.type || '').toLowerCase();
      const isChatNotification = typeStr === 'chat';

      if (isChatNotification) {
        // Smart suppression: if user is already viewing this exact chat, do not show a banner.
        const { activeConversationId, myUserId } = useChatStore.getState();
        const authUser = useAuthStore.getState().user;
        const myId = String(myUserId || authUser?.userId || authUser?.id || '');
        if (myId && !myUserId) {
          useChatStore.getState().setMyUserId(myId);
        }
        const senderId = String(data.userId || '');
        const expectedConvId =
          myId < senderId ? `${myId}_${senderId}` : `${senderId}_${myId}`;

        if (activeConversationId === expectedConvId) {
          Logger.log(
            '[FCM] Suppressed notification: user is already in this chat',
          );
          return;
        }

        // Add message to local store to update bottom nav badge count
        const timestampStr = data.timestamp;
        let timestampVal = Date.now();
        if (typeof timestampStr === 'string' || typeof timestampStr === 'number') {
          const num = Number(timestampStr);
          timestampVal = isNaN(num) ? new Date(timestampStr as string).getTime() : num;
        }

        const rawMessageContent = String(data.message || remoteMessage.notification?.body || 'New message');

        const chatMessage = {
          messageId: String(data.messageId || `fcm-${Date.now()}`),
          senderId: senderId,
          receiverId: myId,
          content: rawMessageContent,
          timestamp: timestampVal,
          status: MessageStatus.DELIVERED,
          type: 'text' as const,
          metadata: data.rideId ? { rideId: String(data.rideId) } : undefined,
        };
        useChatStore.getState().addMessage(expectedConvId, chatMessage);

        // Extract display name and body with fallback to notification payload
        const displayTitle = data.name 
          ? `💬 ${data.name}` 
          : (remoteMessage.notification?.title ? `💬 ${remoteMessage.notification.title}` : '💬 New message');

        const displayMessageContent = rawMessageContent.startsWith('[LOCATION_DATA]:') 
          ? '📍 Location shared' 
          : rawMessageContent;

        // Mark pending delivery in background — user is NOT in this chat
        await this.displayLocalNotification(
          displayTitle,
          displayMessageContent,
          data as Record<string, string>,
        );
      } else {
        const title =
          remoteMessage.notification?.title ||
          (typeof data.title === 'string' ? data.title : '') ||
          (typeof data.name === 'string' ? data.name : '') ||
          'Notification';
        const body =
          remoteMessage.notification?.body ||
          (typeof data.body === 'string' ? data.body : '') ||
          (typeof data.message === 'string' ? data.message : '') ||
          '';

        if (title || body) {
          await this.displayLocalNotification(
            title,
            body,
            data as Record<string, string>,
          );
        }
      }
    });

    // Handle clicks when the app is in the background (but running)
    messaging().onNotificationOpenedApp(remoteMessage => {
      Logger.log('[FCM] Notification opened app in background:', remoteMessage);
      this.handleNotificationTap(remoteMessage);
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
    data?: Record<string, string | number | object>,
  ) {
    const isChat = data?.type === 'chat';
    const rideIdVal = data?.rideId || data?.ride_id || data?.bookingId || data?.booking_id;
    
    let groupId = 'default-group';
    let tag: string = `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (isChat && data?.userId) {
      groupId = `chat-${data.userId}`;
      tag = `chat-${data.userId}`;
    } else if (rideIdVal) {
      groupId = `ride-${rideIdVal}`;
      tag = `ride-${rideIdVal}`;
    }

    let styleConfig: any = undefined;

    if (isChat && data?.userId) {
      try {
        const { messages, myUserId } = useChatStore.getState();
        const authUser = useAuthStore.getState().user;
        const senderId = String(data.userId);
        const myId = String(myUserId || authUser?.userId || authUser?.id || '');
        const conversationId =
          myId < senderId ? `${myId}_${senderId}` : `${senderId}_${myId}`;
        const chatMessages = messages[conversationId] || [];
        
        // Extract up to 5 latest messages for the inbox lines view
        const lines = chatMessages.slice(-5).map(m => {
          return m.content.startsWith('[LOCATION_DATA]:') ? '📍 Location shared' : m.content;
        });
        if (lines.length > 0) {
          styleConfig = {
            type: AndroidStyle.INBOX,
            lines: lines,
          };
        }
      } catch (err) {
        Logger.warn('[Notification] Failed to generate inbox style:', err);
      }
    }

    // Display a single collapsed/replaced notification
    await notifee.displayNotification({
      id: tag, // Reusing tag as ID replaces the previous notification so it collapses
      title: isChat ? title.replace('💬 ', '') : title, // Clean title
      body,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
        color: '#04885b', // Primary brand color
        groupId: groupId,
        tag: tag,
        style: styleConfig,
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
        },
      },
      data,
    });
  }

  private static lastLiveNotificationBody: string = '';

  /**
   * Display or update a live location notification quietly in notification shade/lock screen
   */
  public static async displayLiveLocationNotification(title: string, body: string) {
    if (this.lastLiveNotificationBody === body) {
      return;
    }
    this.lastLiveNotificationBody = body;

    try {
      if (Platform.OS === 'android') {
        await notifee.createChannel({
          id: 'live_location',
          name: 'Live Location Tracking',
          importance: AndroidImportance.LOW,
          sound: undefined,
          vibration: false,
        });
      }

      await notifee.displayNotification({
        id: 'live_location_tracking_notification',
        title,
        body,
        android: {
          channelId: 'live_location',
          onlyAlertOnce: true, // Seamless in-place update without popping
          ongoing: false,
          autoCancel: true,
          importance: AndroidImportance.LOW,
          pressAction: {
            id: 'default',
          },
          color: '#0058bc',
        },
        ios: {
          categoryId: 'live_location',
          interruptionLevel: 'passive', // Does not buzz or interrupt
          foregroundPresentationOptions: {
            badge: false,
            banner: false, // Prevents popup banner from dropping down over the screen!
            list: true,    // Available quietly in notification tray / lock screen
            sound: false,
          },
        },
        data: {
          type: 'live_location',
        },
      });
    } catch (error) {
      Logger.warn('[NotificationService] Failed to display live location notification:', error);
    }
  }

  /**
   * Cancel the live location notification
   */
  public static async cancelLiveLocationNotification() {
    this.lastLiveNotificationBody = '';
    try {
      await notifee.cancelNotification('live_location_tracking_notification');
    } catch (error) {
      Logger.warn('[NotificationService] Failed to cancel live location notification:', error);
    }
  }
}


