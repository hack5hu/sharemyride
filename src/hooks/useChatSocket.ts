import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { chatService } from '@/serviceManager/chatService';
import { useChatStore } from '@/store/useChatStore';

/**
 * Hook to manage chat socket lifecycle.
 * Should be used in ChatList or ChatDetails screens to ensure connection
 * is only active when user is in the chat flow.
 */
export const useChatSocket = (isActive: boolean = true) => {
  const { user } = useAuthStore();
  const { flushOldMessages } = useChatStore();

  useEffect(() => {
    if (isActive && user?.userId) {
      chatService.connect(user.userId);
      // Periodic cleanup of old messages (14-day rule)
      flushOldMessages();
    }

    return () => {
      // We might not want to disconnect immediately if just navigating between chat screens
      // But for this requirement, we ensure it's handled.
      // chatService.disconnect();
    };
  }, [isActive, user?.userId, flushOldMessages]);
};
