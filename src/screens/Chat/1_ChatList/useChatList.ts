import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ChatService } from '@/serviceManager/ChatService';

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
  const { setConversations } = useChatStore();

  // Activate socket
  useChatSocket(true);

  useEffect(() => {
    if (user?.userId) {
      setMyUserId(user.userId);
    }
  }, [user?.userId, setMyUserId]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const data = await ChatService.fetchConversations(page, 20);
    
    if (data) {
      let content = [];
      let isLast = false;

      // Handle Spring Data Page or raw array
      if (Array.isArray(data)) {
        content = data;
        isLast = data.length < 20;
      } else if (data.content && Array.isArray(data.content)) {
        content = data.content;
        isLast = data.last ?? (data.content.length < 20);
      }

      if (content.length > 0 && user?.userId) {
        const mappedConversations = content.map((item: any) => ({
          conversationId: item.conversationId || item.id,
          participants: [user.userId, item.otherUserId || item.id],
          unreadCount: item.unreadCount || 0,
          updatedAt: item.lastMessageTime ? new Date(item.lastMessageTime).getTime() : Date.now(),
          metadata: {
            name: item.otherUserName || item.name,
            avatarUri: item.otherUserPhoto || item.photo,
          },
          lastMessage: {
            messageId: `preview-${item.conversationId || item.id}`,
            senderId: item.otherUserId || item.id, // Just to satisfy UI
            receiverId: user.userId,
            content: item.lastMessagePreview || item.lastMessage?.content || '',
            timestamp: item.lastMessageTime ? new Date(item.lastMessageTime).getTime() : Date.now(),
            status: item.lastMessageStatus || 'SENT',
            type: 'text',
          },
        }));
        setConversations(mappedConversations);
      }

      setHasMore(!isLast);
      if (!isLast) {
        setPage(prev => prev + 1);
      }
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messages = useMemo(() => {
    const myUserId = user?.userId;
    if (!myUserId) return [];

    return [...storeConversations]
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .map(conv => {
        const lastMsg = conv.lastMessage;
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
          unreadCount: conv.unreadCount,
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
  }, [storeConversations, user?.userId, users, t]);

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
