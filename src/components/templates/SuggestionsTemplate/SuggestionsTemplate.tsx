import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { TicketCategory, TicketStatus } from '@/constants/enums';
import {
  Container,
  KeyboardAvoidingView,
  TabHeader,
  TabButton,
  ScrollContent,
} from './SuggestionsTemplate.styles';
import { SuggestionsTemplateProps, Ticket } from './types.d';
import { SubmitFormSection } from './components/SubmitFormSection';
import { TicketHistorySection } from './components/TicketHistorySection';

export const SuggestionsTemplate: React.FC<SuggestionsTemplateProps> = React.memo(
  ({
    title,
    activeTab,
    onTabChange,
    selectedCategory,
    onSelectCategory,
    summary,
    onSummaryChange,
    description,
    onDescriptionChange,
    screenshots,
    onAddScreenshot,
    onDeleteScreenshot,
    onSubmit,
    isSubmitting,
    errors,
    tickets,
    onBack,
    t,
    interpolate,
  }) => {
    const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

    const categories = React.useMemo(() => [
      { id: TicketCategory.FEATURE, label: t.categoryFeature },
      { id: TicketCategory.BUG, label: t.categoryBug },
      { id: TicketCategory.IMPROVEMENT, label: t.categoryImprovement },
      { id: TicketCategory.OTHER, label: t.categoryOther },
    ], [t]);

    const getStatusBadgeVariant = React.useCallback((status: Ticket['status']) => {
      switch (status) {
        case TicketStatus.OPEN:
          return 'pending';
        case TicketStatus.IN_PROGRESS:
          return 'primary';
        case TicketStatus.UNDER_REVIEW:
          return 'tertiary';
        case TicketStatus.RESOLVED:
          return 'matched';
        default:
          return 'pending';
      }
    }, []);

    const getStatusLabel = React.useCallback((status: Ticket['status']): string => {
      switch (status) {
        case TicketStatus.OPEN:
          return t.ticketStatusOpen;
        case TicketStatus.IN_PROGRESS:
          return t.ticketStatusInProgress;
        case TicketStatus.UNDER_REVIEW:
          return t.ticketStatusUnderReview;
        case TicketStatus.RESOLVED:
          return t.ticketStatusResolved;
        default:
          return status;
      }
    }, [t]);

    const toggleExpandTicket = React.useCallback((id: string) => {
      setExpandedTicketId(prev => (prev === id ? null : id));
    }, []);

    return (
      <ScreenShell title={title} onBack={onBack}>
        <Container>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <TabHeader>
              <TabButton
                active={activeTab === 'submit'}
                onPress={() => onTabChange('submit')}
              >
                <Typography
                  variant="title"
                  size="sm"
                  weight="bold"
                  color={
                    activeTab === 'submit' ? 'primary' : 'on_surface_variant'
                  }
                >
                  {t.submitTab}
                </Typography>
              </TabButton>
              <TabButton
                active={activeTab === 'history'}
                onPress={() => onTabChange('history')}
              >
                <Typography
                  variant="title"
                  size="sm"
                  weight="bold"
                  color={
                    activeTab === 'history' ? 'primary' : 'on_surface_variant'
                  }
                >
                  {t.historyTab}
                </Typography>
              </TabButton>
            </TabHeader>

            <ScrollContent showsVerticalScrollIndicator={false}>
              {activeTab === 'submit' ? (
                <SubmitFormSection
                  t={t}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={onSelectCategory}
                  summary={summary}
                  onSummaryChange={onSummaryChange}
                  description={description}
                  onDescriptionChange={onDescriptionChange}
                  screenshots={screenshots}
                  onAddScreenshot={onAddScreenshot}
                  onDeleteScreenshot={onDeleteScreenshot}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  errors={errors}
                />
              ) : (
                <TicketHistorySection
                  tickets={tickets}
                  expandedTicketId={expandedTicketId}
                  toggleExpandTicket={toggleExpandTicket}
                  getStatusLabel={getStatusLabel}
                  getStatusBadgeVariant={getStatusBadgeVariant}
                  interpolate={interpolate}
                  categories={categories}
                  t={t}
                />
              )}
            </ScrollContent>
          </KeyboardAvoidingView>
        </Container>
      </ScreenShell>
    );
  },
);

SuggestionsTemplate.displayName = 'SuggestionsTemplate';
