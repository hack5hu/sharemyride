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
    setMyUserId
  } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Activate socket and fetch conversations
  useChatSocket(true);
  
  useEffect(() => {
    if (user?.userId) {
      setMyUserId(user.userId);
      // chatService.fetchConversations(user.userId);
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
        
        // Prioritize conversation-level metadata (other user name, ride info)
        const metadata = conv.metadata || lastMsg.metadata || {};

        return {
          id: otherParticipantId,
          name: metadata.userName || metadata.name || `User ${otherParticipantId}`,
          lastMessage: (lastMsg.type === 'location' || lastMsg.content.startsWith('[LOCATION_DATA]:')) 
            ? t('chat.locationShared') 
            : lastMsg.content,
          time: new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unreadCount: conv.unreadCount,
          isLastMessageFromMe: lastMsg.senderId === myUserId,
          lastMessageStatus: lastMsg.status,
          source: metadata.pickup || metadata.source || 'Ride',
          destination: metadata.dropoff || metadata.destination || 'Silicon Valley',
          isOnline: true,
          isVerified: metadata.isVerified ?? true,
          avatarSource: { uri: metadata.userAvatar || metadata.avatarUri || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD5atLF8UxYeBT-3ppSb2ss8EDLRaRZ12W6T_IQWI1PwSQEP37xBNj1JgYWFPflCaebiUxcC5GdByIedY9JqeLkPPTvFvvB9v3Bs1T7tbIPZhI6lq2_V9uuNkwBHq_HHYsNFgVIGw_4vJHLSfTLgZGAwmuwgl6A-wvy1eiJrBGJnHz_aIPJgQvNUcG4lRR33qNYDS0IhM7o_LJPfZJ4MsvTp--1_EijtMSEwjspFW5wrqsfLImUDN6EOnxwPqlNYln1-KxOtjkfaS_' },
          // Pass extra data for navigation
          rating: metadata.userRating || metadata.rating || 5.0,
          rideId: metadata.rideId,
          rideInfo: metadata.rideInfo,
        };
      }).filter(Boolean);
  }, [storeConversations, user?.userId]);

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
