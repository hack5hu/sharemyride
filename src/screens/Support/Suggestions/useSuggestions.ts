import { useState, useCallback } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import {
  NotificationType,
  TicketStatus,
  TicketCategory,
} from '@/constants/enums';
import {
  Ticket,
  TicketUpdate,
} from '@/components/templates/SuggestionsTemplate/types.d';
import { Logger } from '@/utils/logger';

// Simple string interpolation helper for templates
const interpolate = (str: string, params: Record<string, string | number>) => {
  let result = str;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{{${key}}}`, String(value));
  });
  return result;
};

const INITIAL_MOCK_TICKETS = (): Ticket[] => [
  {
    id: 'SR-3081',
    category: TicketCategory.FEATURE,
    summary: 'Add Dark Mode support',
    description:
      'It would be great to have dark mode support in the ZyncRide app. The white screens can be very bright during night travel. Standard dark mode theme across the app would improve readability.',
    screenshots: [],
    createdAt: '10 Jun 2026',
    status: TicketStatus.IN_PROGRESS,
    updates: [
      {
        date: '10 Jun 2026',
        author: 'Support Bot',
        message:
          'Thank you for suggesting this! We have registered your suggestion and categorized it as a feature request.',
      },
      {
        date: '11 Jun 2026',
        author: 'ZyncRide Support',
        message:
          'We love this suggestion! Our design team is currently creating dark mode mockups, and this feature is planned for the next major release. We will update you once it goes live.',
      },
    ],
  },
  {
    id: 'SR-4920',
    category: TicketCategory.BUG,
    summary: 'Map picker freezes on low network',
    description:
      'When selecting location in low connectivity regions, the map component sometimes freezes or the loading indicator runs indefinitely.',
    screenshots: [],
    createdAt: '08 Jun 2026',
    status: TicketStatus.RESOLVED,
    updates: [
      {
        date: '08 Jun 2026',
        author: 'Support Bot',
        message:
          'Thank you for reporting this issue. We have logged it as a bug report.',
      },
      {
        date: '09 Jun 2026',
        author: 'Dev Team',
        message:
          'We found a thread-blocking call during coordinate reverse-geocoding under slow networks. A fix has been merged.',
      },
      {
        date: '10 Jun 2026',
        author: 'ZyncRide Support',
        message:
          'This issue is resolved in version 1.0.3. Please update your application via Play Store or App Store. Thank you for your feedback!',
      },
    ],
  },
];

export const useSuggestions = () => {
  const {
    suggestions: t,
    common: commonTranslations,
    notification: notificationTranslations,
  } = useLocale();
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

      if (result.didCancel || !result.assets) {
        return;
      }

      const newUris = result.assets
        .map(asset => asset.uri)
        .filter((uri): uri is string => uri !== undefined);

      setScreenshots(prev => [...prev, ...newUris].slice(0, 5));
    } catch (error) {
      Logger.error('Pick screenshot error', error);
      showNotification(
        NotificationType.ERROR,
        commonTranslations.error,
        notificationTranslations.defaultErrorMessage,
      );
    }
  }, [
    screenshots.length,
    commonTranslations.error,
    notificationTranslations.defaultErrorMessage,
  ]);

  const handleDeleteScreenshot = useCallback((index: number) => {
    setScreenshots(prev => prev.filter((_, idx) => idx !== index));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: {
      category?: string;
      summary?: string;
      description?: string;
    } = {};

    if (!selectedCategory) {
      newErrors.category = t.validationErrorCategory;
    }
    if (!summary.trim()) {
      newErrors.summary = t.validationErrorSummary;
    }
    if (!description.trim()) {
      newErrors.description = t.validationErrorDescription;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedCategory, summary, description, t]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API response time
      await new Promise(resolve => setTimeout(resolve, 1500));

      const ticketNum = Math.floor(1000 + Math.random() * 9000).toString();
      const ticketId = `SR-${ticketNum}`;

      const today = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      };
      const formattedDate = today.toLocaleDateString('en-GB', options);

      const msg = interpolate(t.successMessage, { ticketNumber: ticketId });

      const initialUpdate: TicketUpdate = {
        date: formattedDate,
        author: 'Support Bot',
        message: msg,
      };

      const newTicket: Ticket = {
        id: ticketId,
        category: selectedCategory!,
        summary: summary.trim(),
        description: description.trim(),
        screenshots: [...screenshots],
        createdAt: formattedDate,
        status: TicketStatus.OPEN,
        updates: [initialUpdate],
      };

      setTickets(prev => [newTicket, ...prev]);

      showNotification(NotificationType.SUCCESS, t.successTitle, msg);

      // Clear Form
      setSelectedCategory(null);
      setSummary('');
      setDescription('');
      setScreenshots([]);
      setErrors({});

      // Switch to History Tab
      setActiveTab('history');
    } catch (error) {
      Logger.error('Submit suggestions error', error);
      showNotification(
        NotificationType.ERROR,
        commonTranslations.error,
        notificationTranslations.defaultErrorMessage,
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    selectedCategory,
    summary,
    description,
    screenshots,
    t,
    commonTranslations.error,
    notificationTranslations.defaultErrorMessage,
    validateForm,
  ]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
    onBack: handleBack,
    interpolate,
  };
};
