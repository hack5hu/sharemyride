import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatSocket } from '@/hooks/useChatSocket';
import { chatService } from '@/serviceManager/chatService';

export const useChatList = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { 
    conversations: storeConversations, 
    messages: storeMessages,
    setMyUserId,
    users
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Activate socket and fetch conversations
  useChatSocket(true);
  
  useEffect(() => {
    if (user?.userId) {
      setMyUserId(user.userId);
    }
  }, [user?.userId, setMyUserId]);

  const messages = useMemo(() => {
    const myUserId = user?.userId;
    if (!myUserId) return [];
    
    return [...storeConversations]
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .map((conv) => {
        const lastMsg = conv.lastMessage;
        if (!lastMsg) return null;
        
        const otherParticipantId = conv.participants.find(p => p !== myUserId);
        if (!otherParticipantId || otherParticipantId === 'Unknown') return null;
        
        // Trigger profile fetch if not in cache
        if (!users[otherParticipantId]) {
          chatService.fetchUserProfile(otherParticipantId);
        }

        const cachedUser = users[otherParticipantId];
        const metadata = conv.metadata || lastMsg.metadata || {};

        return {
          id: otherParticipantId,
          name: cachedUser?.name || metadata.userName || metadata.name || `User ${otherParticipantId.slice(0, 8)}`,
          lastMessage: (lastMsg.type === 'location' || lastMsg.content.startsWith('[LOCATION_DATA]:')) 
            ? t('chat.locationShared') 
            : lastMsg.content,
          time: new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unreadCount: conv.unreadCount,
          isLastMessageFromMe: lastMsg.senderId === myUserId,
          lastMessageStatus: lastMsg.status,
          source: metadata.pickup || metadata.source,
          destination: metadata.dropoff || metadata.destination,
          isOnline: true,
          isVerified: cachedUser?.isVerified ?? metadata.isVerified ?? true,
          avatarSource: (cachedUser?.avatarUri || metadata.userAvatar || metadata.avatarUri) 
            ? { uri: cachedUser?.avatarUri || metadata.userAvatar || metadata.avatarUri } 
            : undefined,
          // Pass extra data for navigation
          rating: cachedUser?.rating || metadata.userRating || metadata.rating || 5.0,
          rideId: metadata.rideId,
          rideInfo: metadata.rideInfo,
        };
      }).filter(Boolean);
  }, [storeConversations, user?.userId, users, t]);

  const filteredMessages = useMemo(() => {
    return messages.filter(m => 
      m!.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m!.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredMessages,
    t,
  };
};
