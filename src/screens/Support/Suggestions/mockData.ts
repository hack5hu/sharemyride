import { TicketCategory, TicketStatus } from '@/constants/enums';
import { Ticket } from '@/components/templates/SuggestionsTemplate/types.d';
import { FeedbackItem } from '@/serviceManager/FeedbackService';

export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return 'Recently';
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
  } catch {
    // fallback
  }
  return dateStr;
};

export const mapFeedbackToTicket = (
  item: FeedbackItem,
  index: number,
): Ticket => {
  const formattedDate = formatDate(item.createdAt);
  const ticketId =
    item.ticketNumber ||
    (item.feedbackId ? `FB-${item.feedbackId}` : `FB-${1000 + index}`);

  return {
    id: ticketId,
    category: item.category || TicketCategory.OTHER_SUGGESTIONS,
    summary: item.summary,
    description: item.description,
    screenshots: item.screenshotUrls || [],
    createdAt: formattedDate,
    status: (item.status as TicketStatus) || TicketStatus.OPEN,
    updates: item.message
      ? [
          {
            date: formattedDate,
            author: 'ZyncRide Support',
            message: item.message,
          },
        ]
      : [],
  };
};

export const INITIAL_MOCK_TICKETS = (): Ticket[] => [];
