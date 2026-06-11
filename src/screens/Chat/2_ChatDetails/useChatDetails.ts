import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { chatService } from '@/serviceManager/chatService';
import rideService from '@/serviceManager/rideService';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ChatMessage } from '@/types/chat';
import { ConnectionStatus, MessageStatus } from '@/constants/enums';

const getFormatDate = (timestamp: number, t: any) => {
  const date = new Date(timestamp);
  const today = new Date();
  
  const isSameDay = (d1: Date, d2: Date) => 
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
    
  if (isSameDay(date, today)) {
    return t('common.today');
  }
  
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (isSameDay(date, yesterday)) {
    return t('chat.yesterday');
  }
  
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
};

export interface Message {
  id: string;
  text?: string;
  timestamp: string;
  isSender: boolean;
  status?: 'sent' | 'delivered' | 'read' | 'pending' | 'failed';
  type?: 'text' | 'map';
  locationData?: {
    latitude: number;
    longitude: number;
    locationName?: string;
    address?: string;
    arrivingIn?: string;
    imageUri?: string;
  };
}

export const useChatDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<any>();
  const historyFetchStartedRef = useRef(false);
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  const receiverId = route.params?.userId;
  const myUserId = user?.userId;
  const conversationId = (myUserId && receiverId) 
    ? (myUserId < receiverId ? `${myUserId}_${receiverId}` : `${receiverId}_${myUserId}`)
    : '';

  const storeMessages = useChatStore(state => state.messages);
  const setActiveConversation = useChatStore(state => state.setActiveConversation);
  const users = useChatStore(state => state.users);
  const connectionStatus = useChatStore(state => state.connectionStatus);
  const cachedUser = users[receiverId];
  const [message, setMessage] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isSafetyVisible, setIsSafetyVisible] = useState(true);
  const [dynamicRideInfo, setDynamicRideInfo] = useState<any>(route.params?.rideInfo);

  // Connect socket and handle lifecycle
  useChatSocket(true);

  // Initial load: Fetch history, mark as read, and set active conversation
  useEffect(() => {
    if (myUserId && receiverId && conversationId) {
      setActiveConversation(conversationId);
      historyFetchStartedRef.current = true;
      chatService.fetchHistory(myUserId, receiverId);
      chatService.markAsRead(myUserId, receiverId);
    }

    return () => {
      setActiveConversation(null);
      historyFetchStartedRef.current = false;
    };
  }, [myUserId, receiverId, conversationId, setActiveConversation]);

  // Fetch profile if not in cache
  useEffect(() => {
    if (receiverId && receiverId !== 'Unknown' && !cachedUser) {
      chatService.fetchUserProfile(receiverId);
    }
  }, [receiverId, cachedUser]);

  // Fetch ride details if rideId exists
  useEffect(() => {
    const fetchRideDetails = async () => {
      const rideId = route.params?.rideId;
      if (rideId && !route.params?.rideInfo) {
        try {
          const ride = await rideService.getRideDetail(rideId);
          if (ride) {
            setDynamicRideInfo({
              pickup: ride.sourceStopName || ride.timeline?.[0]?.name || ride.startLocation?.name || 'Unknown Location',
              dropoff: ride.destinationStopName || ride.timeline?.[ride.timeline.length - 1]?.name || ride.destinationLocation?.name || 'Unknown Location',
              date: ride.departureDate || (ride.startTime ? new Date(ride.startTime).toLocaleDateString() : 'Today'),
              time: ride.departureTime || (ride.startTime ? new Date(ride.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'),
            });
          }
        } catch (error) {
          console.error('⚠️ [Chat Details] Failed to fetch ride details:', error);
        }
      }
    };
    
    fetchRideDetails();
  }, [myUserId, receiverId, route.params?.rideId, route.params?.rideInfo]);

  // Map store messages to UI interface (Reversed for Inverted FlashList)
  const messages = useMemo(() => {
    const rawMessages = storeMessages[conversationId] || [];
    const sorted = [...rawMessages].sort((a, b) => a.timestamp - b.timestamp);
    
    const mapped: (Message | { id: string; type: 'date_header'; text: string })[] = [];
    let lastDateString = '';

    sorted.forEach((m: ChatMessage) => {
      const isLocation = m.type === 'location' || m.content.startsWith('[LOCATION_DATA]:');
      let locationData = m.metadata?.location;

      // If it's a location message but metadata is missing, parse it from content
      if (!locationData && m.content.startsWith('[LOCATION_DATA]:')) {
        try {
          const raw = m.content.replace('[LOCATION_DATA]:', '');
          const [coords, name, address] = raw.split('|');
          const [lat, long] = coords.split(',');
          locationData = {
            latitude: parseFloat(lat),
            longitude: parseFloat(long),
            locationName: name,
            address: address,
          };
        } catch (e) {
          console.error('Failed to parse location from string:', e);
        }
      }

      const dateString = getFormatDate(m.timestamp, t);
      if (dateString !== lastDateString) {
        mapped.push({
          id: `date-header-${dateString}`,
          type: 'date_header',
          text: dateString,
        });
        lastDateString = dateString;
      }

      mapped.push({
        id: m.messageId,
        text: m.content.startsWith('[LOCATION_DATA]:') ? `Shared Location: ${locationData?.locationName || ''}` : m.content,
        timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: m.senderId === myUserId,
        status: (m.status || 'SENT').toLowerCase() as any,
        type: isLocation ? 'map' : 'text',
        locationData,
      });
    });

    return [...mapped].reverse();
  }, [storeMessages, conversationId, myUserId, t]);

  // Handle incoming location from MapPicker
  useEffect(() => {
    if (route.params?.selectedLocation && myUserId && receiverId && receiverId !== 'Unknown') {
      const loc = route.params.selectedLocation;
      
      const locationString = `[LOCATION_DATA]:${loc.latitude},${loc.longitude}|${loc.name}|${loc.address || ''}`;
      
      chatService.sendMessage({
        senderId: myUserId,
        receiverId,
        content: locationString,
        type: 'location',
        metadata: {
          userName: route.params?.name,
          userAvatar: route.params?.avatarUri,
          userRating: route.params?.rating,
          rideId: route.params?.rideId,
          rideInfo: dynamicRideInfo,
          location: {
            latitude: loc.latitude,
            longitude: loc.longitude,
            locationName: loc.name,
            address: loc.address,
          }
        }
      });
      
      navigation.setParams({ selectedLocation: undefined } as any);
    }
  }, [
    route.params?.avatarUri,
    route.params?.name,
    route.params?.rating,
    route.params?.rideId,
    route.params?.selectedLocation,
    navigation,
    myUserId,
    receiverId,
    dynamicRideInfo,
  ]);

  const handleSafetyClose = useCallback(() => {
    setIsSafetyVisible(false);
  }, []);

  const handleSend = useCallback(() => {
    if (!message.trim() || !myUserId || !receiverId || receiverId === 'Unknown') return;
    
    chatService.sendMessage({
      senderId: myUserId,
      receiverId,
      content: message,
      type: 'text',
      metadata: {
        userName: route.params?.name,
        userAvatar: route.params?.avatarUri,
        userRating: route.params?.rating,
        rideId: route.params?.rideId,
        rideInfo: dynamicRideInfo,
      }
    });

    setMessage('');
  }, [message, myUserId, receiverId, route.params, dynamicRideInfo]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // ... previous effects ...

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !myUserId || !receiverId) return;

    const rawMessages = storeMessages[conversationId] || [];
    if (rawMessages.length < 20) return; // Don't try to load more if we have very few messages

    setIsLoadingMore(true);
    try {
      // In a real app, you'd pass this timestamp to fetch older messages
      // For now, we'll call fetchHistory which should ideally handle pagination
      await chatService.fetchHistory(myUserId, receiverId);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, myUserId, receiverId, conversationId, storeMessages]);

  const handleLocationShare = useCallback(() => {
    navigation.navigate('SelectLocation' as any, {
      userId: receiverId,
      name: route.params?.name,
      avatarUri: route.params?.avatarUri,
      rideId: route.params?.rideId,
      rideInfo: dynamicRideInfo,
      rating: route.params?.rating,
    });
  }, [navigation, receiverId, route.params, dynamicRideInfo]);

  const handleMapPress = useCallback((location: any) => {
    navigation.navigate('RideRouteMap', {
      destination: {
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.locationName || 'Destination',
        address: location.address,
      }
    });
  }, [navigation]);

  const handleReportSubmit = useCallback((_data: { categoryId: string; description: string }) => {
    setIsReportModalVisible(false);
  }, []);

  const handleRetry = useCallback((messageId: string) => {
    if (conversationId) {
      chatService.resendMessage(conversationId, messageId);
    }
  }, [conversationId]);

  const handleReconnect = useCallback(() => {
    if (myUserId) {
      chatService.connect(myUserId).catch(() => undefined);
    }
  }, [myUserId]);

  const prevStatusRef = useRef<ConnectionStatus | null>(null);

  // Auto-resend failed messages and fetch history when socket connects (upon transition to CONNECTED)
  useEffect(() => {
    const isTransitionToConnected =
      connectionStatus === ConnectionStatus.CONNECTED &&
      prevStatusRef.current !== null &&
      prevStatusRef.current !== ConnectionStatus.CONNECTED;

    if (isTransitionToConnected && conversationId && myUserId && receiverId) {
      // Only fetch history if we haven't started fetching it yet,
      // or if it's a reconnection (i.e. prevStatus was DISCONNECTED) to sync missed messages while offline.
      if (!historyFetchStartedRef.current) {
        historyFetchStartedRef.current = true;
        chatService.fetchHistory(myUserId, receiverId).catch(() => undefined);
      } else if (prevStatusRef.current === ConnectionStatus.DISCONNECTED) {
        chatService.fetchHistory(myUserId, receiverId).catch(() => undefined);
      }

      const rawMessages = useChatStore.getState().messages[conversationId] || [];
      const failedMessages = rawMessages.filter(
        (m: ChatMessage) => m.senderId === myUserId && m.status === MessageStatus.FAILED
      );
      
      failedMessages.forEach((m: ChatMessage) => {
        chatService.resendMessage(conversationId, m.messageId);
      });
    }
    prevStatusRef.current = connectionStatus;
  }, [connectionStatus, conversationId, myUserId, receiverId]);

  const handleProfilePress = useCallback(() => {
    if (receiverId) {
      navigation.navigate('UserProfileDetail', { userId: receiverId });
    }
  }, [navigation, receiverId]);

  return {
    t,
    message,
    setMessage,
    messages,
    handleSend,
    handleLocationShare,
    handleMapPress,
    isReportModalVisible,
    setIsReportModalVisible,
    handleReportSubmit,
    dynamicRideInfo,
    isSafetyVisible,
    handleSafetyClose,
    handleLoadMore,
    cachedUser,
    handleRetry,
    connectionStatus,
    handleReconnect,
    handleProfilePress,
  };
};
