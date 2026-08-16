import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ChatService } from '@/serviceManager/ChatService';
import { parseChatTimestamp } from '@/utils/date';

export const useChatList = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const {
    conversations: storeConversations,
    messages: storeMessages,
    setMyUserId,
    users,
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const pageRef = useRef(0);
  const hasMoreRef = useRef(true);

  // Activate socket
  useChatSocket(true);

  useEffect(() => {
    if (user?.userId) {
      setMyUserId(user.userId);
    }
  }, [user?.userId, setMyUserId]);

  const loadMore = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage !== undefined ? targetPage : pageRef.current;
    if (isLoadingRef.current || (!hasMoreRef.current && targetPage === undefined)) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const data = await ChatService.fetchConversations(pageToFetch, 20);
      
      if (data) {
        let content = [];
        let isLast = false;

        if (Array.isArray(data)) {
          content = data;
          isLast = data.length < 20;
        } else if (data.content && Array.isArray(data.content)) {
          content = data.content;
          isLast = data.last ?? (data.content.length < 20);
        }

        const currentUserId = user?.userId;
        if (content.length > 0 && currentUserId) {
          const { messages: localMessages, setConversations } = useChatStore.getState();
          const mappedConversations = content.map((item: any) => {
            const otherUserId = String(item.otherUserId || item.id);
            const myId = String(currentUserId);
            const standardConvId = ChatService.getConversationId(myId, otherUserId);
            const convMessages = localMessages[standardConvId] || [];
            const lastLocalMsg = convMessages.length > 0 ? convMessages[convMessages.length - 1] : null;

            const serverTimestamp = item.lastMessageTime
              ? parseChatTimestamp({ timestamp: item.lastMessageTime })
              : 0;
            const serverContent = item.lastMessagePreview || item.lastMessage?.content || '';

            const isLocalNewer =
              lastLocalMsg &&
              (lastLocalMsg.timestamp > serverTimestamp ||
                (lastLocalMsg.timestamp === serverTimestamp && lastLocalMsg.content === serverContent));

            const isMe =
              item.lastMessageSenderId === myId ||
              item.lastSenderId === myId ||
              item.senderId === myId ||
              item.isLastMessageFromMe === true ||
              item.isFromMe === true ||
              (isLocalNewer && lastLocalMsg?.senderId === myId);

            const lastSender = isMe ? myId : otherUserId;
            const lastReceiver = isMe ? otherUserId : myId;

            const chosenLastMessage = isLocalNewer && lastLocalMsg
              ? lastLocalMsg
              : {
                  messageId: `preview-${item.conversationId || item.id}`,
                  senderId: lastSender,
                  receiverId: lastReceiver,
                  content: serverContent,
                  timestamp: serverTimestamp,
                  status: (item.lastMessageStatus || 'SENT').toUpperCase(),
                  type: 'text',
                };
            
            return {
              conversationId: standardConvId,
              participants: [myId, otherUserId],
              unreadCount: isMe ? 0 : (item.unreadCount || 0),
              updatedAt: Math.max(serverTimestamp, chosenLastMessage.timestamp || 0),
              metadata: {
                name: item.otherUserName || item.name,
                avatarUri: item.otherUserPhoto || item.photo,
              },
              lastMessage: chosenLastMessage,
            };
          });
          setConversations(mappedConversations);
        }

        hasMoreRef.current = !isLast;
        setHasMore(!isLast);
        pageRef.current = pageToFetch + 1;
        setPage(pageToFetch + 1);
      } else {
        hasMoreRef.current = false;
        setHasMore(false);
      }
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [user?.userId]);

  useFocusEffect(
    useCallback(() => {
      loadMore(0);
    }, [loadMore])
  );

  const messages = useMemo(() => {
    const myUserId = user?.userId;
    if (!myUserId) return [];

    return storeConversations
      .slice()
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .map(conv => {
        const convMessages = storeMessages[conv.conversationId] || [];
        let lastMsg = conv.lastMessage;
        const lastLocalMsg =
          convMessages.length > 0 ? convMessages[convMessages.length - 1] : null;

        if (lastLocalMsg && conv.lastMessage) {
          if (lastLocalMsg.timestamp > (conv.lastMessage.timestamp || 0)) {
            lastMsg = lastLocalMsg;
          } else if (lastLocalMsg.content === conv.lastMessage.content) {
            lastMsg = lastLocalMsg;
          }
        }
        
        if (!lastMsg) return null;

        const otherParticipantId = conv.participants.find(p => p !== myUserId);
        if (!otherParticipantId || otherParticipantId === 'Unknown')
          return null;

        // Trigger profile fetch if not in cache
        if (!users[otherParticipantId]) {
          ChatService.fetchUserProfile(otherParticipantId);
        }

        const cachedUser = users[otherParticipantId];
        const metadata = conv.metadata || lastMsg.metadata || {};

        return {
          id: otherParticipantId,
          name: String(
            cachedUser?.name ||
              metadata.userName ||
              metadata.name ||
              `User ${otherParticipantId.slice(0, 8)}`,
          ),
          lastMessage: String(
            lastMsg.type === 'location' ||
              lastMsg.content.startsWith('[LOCATION_DATA]:')
              ? t('chat.locationShared')
              : lastMsg.content,
          ),
          time: new Date(lastMsg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          unreadCount: lastMsg.senderId === myUserId ? 0 : conv.unreadCount,
          isLastMessageFromMe: lastMsg.senderId === myUserId,
          lastMessageStatus: lastMsg.status,
          source: metadata.pickup || metadata.source,
          destination: metadata.dropoff || metadata.destination,
          isOnline: true,
          isVerified: cachedUser?.isVerified ?? metadata.isVerified ?? true,
          avatarSource:
            metadata.avatarUri || metadata.userAvatar || cachedUser?.avatarUri
              ? {
                  uri:
                    metadata.avatarUri ||
                    metadata.userAvatar ||
                    cachedUser?.avatarUri,
                }
              : undefined,
          // Pass extra data for navigation
          rating:
            cachedUser?.rating || metadata.userRating || metadata.rating || 5.0,
          rideId: metadata.rideId,
          rideInfo: metadata.rideInfo,
        };
      })
      .filter(Boolean);
  }, [storeConversations, storeMessages, user?.userId, users, t]);

  const filteredMessages = useMemo(() => {
    return messages.filter(
      m =>
        m!.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m!.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [messages, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredMessages,
    t,
    loadMore,
    isLoading,
  };
};
