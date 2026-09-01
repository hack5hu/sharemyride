import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatSocket } from '@/hooks/useChatSocket';
import { ChatService } from '@/serviceManager/ChatService';
import { parseChatTimestamp } from '@/utils/date';
import { mapConversationToListItem } from './chatListHelper';

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
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);
  const pageRef = useRef(0);
  const hasMoreRef = useRef(true);

  useChatSocket(true);

  useEffect(() => {
    if (user?.userId) {
      setMyUserId(user.userId);
    }
  }, [user?.userId, setMyUserId]);

  const loadMore = useCallback(async (targetPage?: number) => {
    const pageToFetch = targetPage !== undefined ? targetPage : pageRef.current;
    if (isLoadingRef.current || (!hasMoreRef.current && targetPage === undefined))
      return;

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
          isLast = data.last ?? data.content.length < 20;
        }

        const currentUserId = user?.userId;
        if (content.length > 0 && currentUserId) {
          const { messages: localMessages, setConversations, upsertUser } =
            useChatStore.getState();
          const mappedConversations = content.map((item: any) => {
            const otherUserId = String(item.otherUserId || item.id);
            const myId = String(currentUserId);
            const standardConvId = ChatService.getConversationId(
              myId,
              otherUserId,
            );
            const convMessages = localMessages[standardConvId] || [];
            const lastLocalMsg =
              convMessages.length > 0
                ? convMessages[convMessages.length - 1]
                : null;

            const serverTimestamp = item.lastMessageTime
              ? parseChatTimestamp({ timestamp: item.lastMessageTime })
              : 0;
            const serverContent =
              item.lastMessagePreview || item.lastMessage?.content || '';

            const isLocalNewer =
              lastLocalMsg &&
              (lastLocalMsg.timestamp > serverTimestamp ||
                (lastLocalMsg.timestamp === serverTimestamp &&
                  lastLocalMsg.content === serverContent));

            const isMe =
              item.lastMessageSenderId === myId ||
              item.lastSenderId === myId ||
              item.senderId === myId ||
              item.isLastMessageFromMe === true ||
              item.isFromMe === true ||
              (isLocalNewer && lastLocalMsg?.senderId === myId);

            const lastSender = isMe ? myId : otherUserId;
            const lastReceiver = isMe ? otherUserId : myId;

            const chosenLastMessage =
              isLocalNewer && lastLocalMsg
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

            const otherName = item.otherUserName || item.name;
            const otherPhoto = item.otherUserPhoto || item.photo;
            if (otherName || otherPhoto) {
              upsertUser({
                userId: otherUserId,
                name: otherName || '',
                avatarUri: otherPhoto,
              });
            }

            return {
              conversationId: standardConvId,
              participants: [myId, otherUserId],
              unreadCount: isMe ? 0 : item.unreadCount || 0,
              updatedAt: Math.max(
                serverTimestamp,
                chosenLastMessage.timestamp || 0,
              ),
              metadata: {
                name: otherName,
                avatarUri: otherPhoto,
              },
              lastMessage: chosenLastMessage,
            };
          });
          setConversations(mappedConversations);
        }

        hasMoreRef.current = !isLast;
        pageRef.current = pageToFetch + 1;
      } else {
        hasMoreRef.current = false;
      }
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [user?.userId]);

  useFocusEffect(
    useCallback(() => {
      loadMore(0);
    }, [loadMore]),
  );

  const messages = useMemo(() => {
    const myUserId = user?.userId;
    if (!myUserId) return [];

    return storeConversations
      .slice()
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      .map(conv =>
        mapConversationToListItem(conv, myUserId, storeMessages, users, t),
      )
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

