import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { chatService } from '@/serviceManager/chatService';
import rideService from '@/serviceManager/rideService';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ChatMessage, MessageStatus } from '@/types/chat';

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<any>();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  const receiverId = route.params?.userId;
  const myUserId = user?.userId;
  const conversationId = (myUserId && receiverId) 
    ? (myUserId < receiverId ? `${myUserId}_${receiverId}` : `${receiverId}_${myUserId}`)
    : '';

  const { 
    messages: storeMessages, 
    updateMessageStatus, 
    setActiveConversation,
    users
  } = useChatStore();
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
      chatService.fetchHistory(myUserId, receiverId);
      chatService.markAsRead(myUserId, receiverId);
      
      // Fetch profile if not in cache
      if (receiverId !== 'Unknown' && !users[receiverId]) {
        chatService.fetchUserProfile(receiverId);
      }
    }

    return () => setActiveConversation(null);
  }, [myUserId, receiverId, conversationId, setActiveConversation, users]);

  const cachedUser = users[receiverId];

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
    return [...rawMessages].reverse().map((m: ChatMessage): Message => {
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

      return {
        id: m.messageId,
        text: m.content.startsWith('[LOCATION_DATA]:') ? `Shared Location: ${locationData?.locationName || ''}` : m.content,
        timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: m.senderId === myUserId,
        status: (m.status || 'SENT').toLowerCase() as any,
        type: isLocation ? 'map' : 'text',
        locationData,
      };
    });
  }, [storeMessages, conversationId, myUserId]);

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
  }, [route.params?.selectedLocation, navigation, myUserId, receiverId, dynamicRideInfo]);

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
      const oldestTimestamp = rawMessages[0]?.timestamp;
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

  const handleReportSubmit = useCallback((data: { categoryId: string; description: string }) => {
    console.log('Report submitted:', data);
    setIsReportModalVisible(false);
  }, []);

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
  };
};
