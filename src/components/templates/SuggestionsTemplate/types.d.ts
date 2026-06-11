import { TicketStatus, TicketCategory } from '@/constants/enums';
import { SuggestionsTranslations } from '@/constants/localization/types';

export interface TicketUpdate {
  date: string;
  message: string;
  author: string;
}

export interface Ticket {
  id: string;
  category: TicketCategory;
  summary: string;
  description: string;
  screenshots: string[];
  createdAt: string;
  status: TicketStatus;
  updates: TicketUpdate[];
}

export interface SuggestionsTemplateProps {
  title: string;
  activeTab: 'submit' | 'history';
  onTabChange: (tab: 'submit' | 'history') => void;

  // Submit Form states and callbacks
  selectedCategory: TicketCategory | null;
  onSelectCategory: (category: TicketCategory) => void;
  summary: string;
  onSummaryChange: (text: string) => void;
  description: string;
  onDescriptionChange: (text: string) => void;
  screenshots: string[];
  onAddScreenshot: () => void;
  onDeleteScreenshot: (index: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  errors: {
    category?: string;
    summary?: string;
    description?: string;
  };

  // Ticket history
  tickets: Ticket[];
  onBack: () => void;
  t: SuggestionsTranslations;
  interpolate: (str: string, params: Record<string, string | number>) => string;
}
