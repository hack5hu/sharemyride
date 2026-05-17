import { MessageStatus } from '@/types/chat';
import { useTheme } from 'styled-components/native';

export const getMessageStatusIcon = (status: MessageStatus, isMe: boolean) => {
  const theme = useTheme();

  if (!isMe) {
    return null; // No status icon for incoming messages
  }

  const normalizedStatus = status?.toUpperCase() || 'SENT';

  const statusMap: Record<string, { name: string; color: string }> = {
    READ: { name: 'done-all', color: theme.colors.read_receipt },
    DELIVERED: { name: 'done-all', color: theme.colors.on_surface_variant },
    SENT: { name: 'check', color: theme.colors.on_surface_variant },
    PENDING: { name: 'check', color: theme.colors.on_surface_variant },
  };

  return statusMap[normalizedStatus] || statusMap.SENT;
};
