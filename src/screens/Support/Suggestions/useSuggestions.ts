import { useState, useCallback, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import {
  NotificationType,
  TicketStatus,
  TicketCategory,
} from '@/constants/enums';
import { Ticket } from '@/components/templates/SuggestionsTemplate/types.d';
import { FeedbackService } from '@/serviceManager/FeedbackService';
import { Logger } from '@/utils/logger';
import {
  mapFeedbackToTicket,
  formatDate,
  INITIAL_MOCK_TICKETS,
} from './mockData';

const interpolate = (str: string, params: Record<string, string | number>) => {
  let result = str;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{{${key}}}`, String(value));
  });
  return result;
};

export const useSuggestions = () => {
  const { suggestions: t, common, notification } = useLocale();
  const navigation = useAppNavigation();

  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');
  const [selectedCategory, setSelectedCategory] =
    useState<TicketCategory | null>(null);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    category?: string;
    summary?: string;
    description?: string;
  }>({});
  const [tickets, setTickets] = useState<Ticket[]>(() =>
    INITIAL_MOCK_TICKETS(),
  );

  const fetchTickets = useCallback(async () => {
    try {
      const response = await FeedbackService.getMyFeedback();
      if (Array.isArray(response)) {
        setTickets(response.map(mapFeedbackToTicket));
      }
    } catch (error) {
      Logger.error('Fetch my feedback error', error);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleSelectCategory = useCallback((category: TicketCategory) => {
    setSelectedCategory(category);
    setErrors(prev => ({ ...prev, category: undefined }));
  }, []);

  const handleSummaryChange = useCallback((text: string) => {
    setSummary(text);
    setErrors(prev => ({ ...prev, summary: undefined }));
  }, []);

  const handleDescriptionChange = useCallback((text: string) => {
    setDescription(text);
    setErrors(prev => ({ ...prev, description: undefined }));
  }, []);

  const handleAddScreenshot = useCallback(async () => {
    if (screenshots.length >= 5) return;
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 5 - screenshots.length,
      });
      if (result.didCancel || !result.assets) return;
      const newUris = result.assets
        .map(a => a.uri)
        .filter((uri): uri is string => uri !== undefined);
      setScreenshots(prev => [...prev, ...newUris].slice(0, 5));
    } catch (error) {
      Logger.error('Pick screenshot error', error);
      showNotification(
        NotificationType.ERROR,
        common.error,
        notification.defaultErrorMessage,
      );
    }
  }, [screenshots.length, common.error, notification.defaultErrorMessage]);

  const handleDeleteScreenshot = useCallback((index: number) => {
    setScreenshots(prev => prev.filter((_, idx) => idx !== index));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: {
      category?: string;
      summary?: string;
      description?: string;
    } = {};
    if (!selectedCategory) newErrors.category = t.validationErrorCategory;
    if (!summary.trim()) newErrors.summary = t.validationErrorSummary;
    if (!description.trim())
      newErrors.description = t.validationErrorDescription;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedCategory, summary, description, t]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm() || !selectedCategory) return;
    setIsSubmitting(true);
    try {
      const response = await FeedbackService.submitFeedback({
        category: selectedCategory,
        summary: summary.trim(),
        description: description.trim(),
        files: screenshots,
      });

      const today = new Date().toISOString();
      const formattedDate = formatDate(today);
      const ticketId =
        response?.ticketId ||
        (response?.id
          ? `FB-${response.id}`
          : `FB-${Math.floor(1000 + Math.random() * 9000)}`);
      const msg = interpolate(t.successMessage, { ticketNumber: ticketId });

      const newTicket: Ticket = {
        id: ticketId,
        category: selectedCategory,
        summary: summary.trim(),
        description: description.trim(),
        screenshots: [...screenshots],
        createdAt: formattedDate,
        status: TicketStatus.OPEN,
        updates: [{ date: formattedDate, author: 'Support Bot', message: msg }],
      };

      setTickets(prev => [newTicket, ...prev]);
      showNotification(NotificationType.SUCCESS, t.successTitle, msg);

      setSelectedCategory(null);
      setSummary('');
      setDescription('');
      setScreenshots([]);
      setErrors({});
      setActiveTab('history');
      fetchTickets();
    } catch (error) {
      Logger.error('Submit feedback error', error);
      showNotification(
        NotificationType.ERROR,
        common.error,
        notification.defaultErrorMessage,
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    validateForm,
    selectedCategory,
    summary,
    description,
    screenshots,
    t,
    common.error,
    notification.defaultErrorMessage,
    fetchTickets,
  ]);

  return {
    t,
    activeTab,
    onTabChange: setActiveTab,
    selectedCategory,
    onSelectCategory: handleSelectCategory,
    summary,
    onSummaryChange: handleSummaryChange,
    description,
    onDescriptionChange: handleDescriptionChange,
    screenshots,
    onAddScreenshot: handleAddScreenshot,
    onDeleteScreenshot: handleDeleteScreenshot,
    onSubmit: handleSubmit,
    isSubmitting,
    errors,
    tickets,
    onBack: useCallback(() => navigation.goBack(), [navigation]),
    interpolate,
  };
};
