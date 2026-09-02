import { type ChatMessage } from '@/types/chat';

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

export interface DateHeaderItem {
  id: string;
  type: 'date_header';
  text: string;
}

export type ChatListItem = Message | DateHeaderItem;

export const getFormatDate = (
  timestamp: number,
  t: (key: string) => string,
): string => {
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

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const mapChatMessages = (
  rawMessages: ChatMessage[],
  myUserId: string | undefined,
  t: (key: string) => string,
): ChatListItem[] => {
  const sorted = [...rawMessages].sort((a, b) => a.timestamp - b.timestamp);
  const mapped: ChatListItem[] = [];
  let lastDateString = '';

  sorted.forEach((m: ChatMessage) => {
    const isLocation =
      m.type === 'location' || m.content.startsWith('[LOCATION_DATA]:');
    let locationData = m.metadata?.location;

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
      text: m.content.startsWith('[LOCATION_DATA]:')
        ? `Shared Location: ${locationData?.locationName || ''}`
        : m.content,
      timestamp: new Date(m.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isSender: m.senderId === myUserId,
      status: (m.status || 'SENT').toLowerCase() as Message['status'],
      type: isLocation ? 'map' : 'text',
      locationData,
    });
  });

  return [...mapped].reverse();
};
