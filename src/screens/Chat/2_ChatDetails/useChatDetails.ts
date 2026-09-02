import { useRoute } from '@react-navigation/native';
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { ConnectionStatus, MessageStatus } from '@/constants/enums';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useTranslation } from '@/hooks/useTranslation';
import { ChatService } from '@/serviceManager/ChatService';
import { RideService } from '@/serviceManager/RideService';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';
import { type ChatMessage } from '@/types/chat';
import { mapChatMessages } from './chatMessageMapper';
import { useChatActions } from './useChatActions';

export const useChatDetails = () => {
  const route = useRoute<any>();
  const historyFetchStartedRef = useRef(false);
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const receiverId = route.params?.userId;
  const myUserId = user?.userId;
  const conversationId =
    myUserId && receiverId
      ? myUserId < receiverId
        ? `${myUserId}_${receiverId}`
        : `${receiverId}_${myUserId}`
      : '';

  const storeMessages = useChatStore(state => state.messages);
  const setActiveConversation = useChatStore(
    state => state.setActiveConversation,
  );
  const users = useChatStore(state => state.users);
  const connectionStatus = useChatStore(state => state.connectionStatus);
  const cachedUser = users[receiverId];
  const [message, setMessage] = useState('');
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isSafetyVisible, setIsSafetyVisible] = useState(true);
  const [dynamicRideInfo, setDynamicRideInfo] = useState<any>(
    route.params?.rideInfo,
  );

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useChatSocket(true);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || !myUserId || !receiverId) return;

    setIsLoadingMore(true);
    try {
      const { isLast } = await ChatService.fetchHistory(
        myUserId,
        receiverId,
        page,
        30,
      );
      setHasMore(!isLast);
      if (!isLast) {
        setPage(prev => prev + 1);
      }
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, myUserId, receiverId, page]);

  useEffect(() => {
    if (myUserId && receiverId && conversationId) {
      setActiveConversation(conversationId);
      historyFetchStartedRef.current = true;
      handleLoadMore();
      ChatService.markAsRead(myUserId, receiverId);
    }

    return () => {
      setActiveConversation(null);
      historyFetchStartedRef.current = false;
    };
  }, [myUserId, receiverId, conversationId, setActiveConversation, handleLoadMore]);

  useEffect(() => {
    if (
      receiverId &&
      receiverId !== 'Unknown' &&
      !cachedUser?.name &&
      !route.params?.name
    ) {
      ChatService.fetchUserProfile(receiverId);
    }
  }, [receiverId, cachedUser?.name, route.params?.name]);

  useEffect(() => {
    const fetchRideDetails = async () => {
      const rideId = route.params?.rideId;
      if (rideId && !route.params?.rideInfo) {
        try {
          const ride = await RideService.getRideDetail(rideId);
          if (ride) {
            setDynamicRideInfo({
              pickup:
                ride.sourceStopName ||
                ride.timeline?.[0]?.name ||
                ride.startLocation?.name ||
                'Unknown Location',
              dropoff:
                ride.destinationStopName ||
                ride.timeline?.[ride.timeline.length - 1]?.name ||
                ride.destinationLocation?.name ||
                'Unknown Location',
              date:
                ride.departureDate ||
                (ride.startTime
                  ? new Date(ride.startTime).toLocaleDateString()
                  : 'Today'),
              time:
                ride.departureTime ||
                (ride.startTime
                  ? new Date(ride.startTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '--:--'),
            });
          }
        } catch (error) {
          console.error('Failed to fetch ride details in chat:', error);
        }
      }
    };

    fetchRideDetails();
  }, [myUserId, receiverId, route.params?.rideId, route.params?.rideInfo]);

  const messages = useMemo(() => {
    const rawMessages = storeMessages[conversationId] || [];

    return mapChatMessages(rawMessages, myUserId, t);
  }, [storeMessages, conversationId, myUserId, t]);

  const handleSafetyClose = useCallback(() => {
    setIsSafetyVisible(false);
  }, []);

  const prevStatusRef = useRef<ConnectionStatus | null>(null);

  useEffect(() => {
    const isTransitionToConnected =
      connectionStatus === ConnectionStatus.CONNECTED &&
      prevStatusRef.current !== null &&
      prevStatusRef.current !== ConnectionStatus.CONNECTED;

    if (isTransitionToConnected && conversationId && myUserId && receiverId) {
      if (!historyFetchStartedRef.current) {
        historyFetchStartedRef.current = true;
        ChatService.fetchHistory(myUserId, receiverId).catch(() => undefined);
      } else if (prevStatusRef.current === ConnectionStatus.DISCONNECTED) {
        ChatService.fetchHistory(myUserId, receiverId).catch(() => undefined);
      }

      const rawMessages =
        useChatStore.getState().messages[conversationId] || [];
      const failedMessages = rawMessages.filter(
        (m: ChatMessage) =>
          m.senderId === myUserId && m.status === MessageStatus.FAILED,
      );

      failedMessages.forEach((m: ChatMessage) => {
        ChatService.resendMessage(conversationId, m.messageId);
      });
    }
    prevStatusRef.current = connectionStatus;
  }, [connectionStatus, conversationId, myUserId, receiverId]);

  const actions = useChatActions({
    message,
    setMessage,
    myUserId,
    receiverId,
    conversationId,
    dynamicRideInfo,
    routeParams: route.params,
    setIsReportModalVisible,
    t,
    cachedUser,
  });

  return {
    t,
    message,
    setMessage,
    messages,
    dynamicRideInfo,
    isSafetyVisible,
    handleSafetyClose,
    handleLoadMore,
    cachedUser,
    connectionStatus,
    isReportModalVisible,
    setIsReportModalVisible,
    ...actions,
  };
};

