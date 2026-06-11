import React, { useState } from 'react';
import { ScrollView, Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';
import { StatusBadge, type StatusBadgeVariant } from '@/components/atoms/StatusBadge';
import { IconButton } from '@/components/atoms/IconButton';
import { EmptyState } from '@/components/molecules/EmptyState';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { TicketCategory, TicketStatus } from '@/constants/enums';
import {
  Container,
  KeyboardAvoidingView,
  TabHeader,
  TabButton,
  ScrollContent,
  FormCard,
  LabelContainer,
  CategoryRow,
  CategoryItem,
  ScreenshotStrip,
  ScreenshotThumbnailContainer,
  ScreenshotImage,
  DeleteButtonContainer,
  AddScreenshotBtn,
  SubmitBtnWrapper,
  SubmitGradientBtn,
  TicketCard,
  TicketHeader,
  TicketBody,
  ExpansionContent,
  UpdateItem,
  TicketListContainer,
  StyledCategoryErrorText,
  StyledStaffUpdatesTitle,
} from './SuggestionsTemplate.styles';
import { SuggestionsTemplateProps, Ticket } from './types.d';
import { moderateScale } from '@/styles';

export const SuggestionsTemplate: React.FC<SuggestionsTemplateProps> = ({
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
  const theme = useTheme();
  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  const categories = [
    { id: TicketCategory.FEATURE, label: t.categoryFeature },
    { id: TicketCategory.BUG, label: t.categoryBug },
    { id: TicketCategory.IMPROVEMENT, label: t.categoryImprovement },
    { id: TicketCategory.OTHER, label: t.categoryOther },
  ];

  const getStatusBadgeVariant = (status: Ticket['status']): StatusBadgeVariant => {
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
  };

  const getStatusLabel = (status: Ticket['status']): string => {
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
  };

  const toggleExpandTicket = (id: string) => {
    setExpandedTicketId(prev => (prev === id ? null : id));
  };

  const renderSubmitForm = () => (
    <FormCard>
      <LabelContainer>
        <Typography variant="title" size="sm" color="on_surface">
          {t.categoryLabel}
        </Typography>
        <CategoryRow>
          {categories.map(cat => (
            <CategoryItem
              key={cat.id}
              isSelected={selectedCategory === cat.id}
              onPress={() => onSelectCategory(cat.id)}
            >
              <Typography
                variant="label"
                size="sm"
                weight="medium"
                color={selectedCategory === cat.id ? 'on_primary_container' : 'on_surface_variant'}
              >
                {cat.label}
              </Typography>
            </CategoryItem>
          ))}
        </CategoryRow>
        {errors.category && (
          <StyledCategoryErrorText variant="label" size="xxs" color="error">
            {errors.category}
          </StyledCategoryErrorText>
        )}
      </LabelContainer>

      <Input
        label={t.summaryLabel}
        placeholder={t.summaryPlaceholder}
        value={summary}
        onChangeText={onSummaryChange}
        error={errors.summary}
        required
      />

      <Input
        label={t.descriptionLabel}
        placeholder={t.descriptionPlaceholder}
        value={description}
        onChangeText={onDescriptionChange}
        error={errors.description}
        multiline
        numberOfLines={4}
        required
      />

      <LabelContainer>
        <Typography variant="title" size="sm" color="on_surface">
          {t.screenshotsLabel}
        </Typography>
        <Typography variant="body" size="xs" color="on_surface_variant">
          {t.screenshotsDescription}
        </Typography>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ScreenshotStrip>
            {screenshots.map((uri, idx) => (
              <ScreenshotThumbnailContainer key={`${uri}-${idx}`}>
                <ScreenshotImage source={{ uri }} />
                <DeleteButtonContainer>
                  <IconButton
                    icon="close"
                    size="sm"
                    variant="surface"
                    onPress={() => onDeleteScreenshot(idx)}
                  />
                </DeleteButtonContainer>
              </ScreenshotThumbnailContainer>
            ))}
            {screenshots.length < 5 && (
              <AddScreenshotBtn onPress={onAddScreenshot}>
                <Icon name="add-a-photo" size={24} color={theme.colors.on_surface_variant} />
                <Typography variant="label" size="xxs" color="on_surface_variant">
                  {t.addPhoto}
                </Typography>
              </AddScreenshotBtn>
            )}
          </ScreenshotStrip>
        </ScrollView>
      </LabelContainer>

      <SubmitBtnWrapper onPress={onSubmit} disabled={isSubmitting}>
        <SubmitGradientBtn isSubmitting={isSubmitting}>
          <Typography variant="title" size="md" weight="bold" color="on_primary">
            {isSubmitting ? t.submittingButton : t.submitButton}
          </Typography>
        </SubmitGradientBtn>
      </SubmitBtnWrapper>
    </FormCard>
  );

  const renderTicketList = () => {
    if (tickets.length === 0) {
      return (
        <EmptyState
          icon="history"
          title={t.noTicketsTitle}
          description={t.noTicketsMessage}
        />
      );
    }

    return (
      <TicketListContainer>
        {tickets.map(ticket => {
          const isExpanded = expandedTicketId === ticket.id;
          const categoryObj = categories.find(c => c.id === ticket.category);
          return (
            <TicketCard key={ticket.id} onPress={() => toggleExpandTicket(ticket.id)} activeOpacity={0.9}>
              <TicketHeader>
                <Typography variant="label" size="xs" weight="bold" color="secondary">
                  {interpolate(t.ticketNumber, { ticketNumber: ticket.id })}
                </Typography>
                <StatusBadge
                  label={getStatusLabel(ticket.status)}
                  variant={getStatusBadgeVariant(ticket.status)}
                />
              </TicketHeader>

              <TicketBody>
                <Typography variant="title" size="md" weight="bold" color="on_surface">
                  {ticket.summary}
                </Typography>
                <Typography variant="label" size="xxs" color="on_surface_variant">
                  {categoryObj?.label || ticket.category} • {interpolate(t.ticketCreatedOn, { date: ticket.createdAt })}
                </Typography>
              </TicketBody>

              {isExpanded && (
                <ExpansionContent>
                  <Typography variant="body" size="sm" color="on_surface_variant">
                    {ticket.description}
                  </Typography>

                  {ticket.screenshots.length > 0 && (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <ScreenshotStrip>
                        {ticket.screenshots.map((uri, idx) => (
                          <ScreenshotThumbnailContainer key={`${uri}-${idx}`}>
                            <ScreenshotImage source={{ uri }} />
                          </ScreenshotThumbnailContainer>
                        ))}
                      </ScreenshotStrip>
                    </ScrollView>
                  )}

                  <StyledStaffUpdatesTitle variant="title" size="sm" color="on_surface" weight="bold">
                    {t.updatesLabel}
                  </StyledStaffUpdatesTitle>

                  {ticket.updates.map((update, idx) => (
                    <UpdateItem key={idx}>
                      <Typography variant="label" size="xs" weight="bold" color="primary">
                        {update.author} • {update.date}
                      </Typography>
                      <Typography variant="body" size="sm" color="on_surface">
                        {update.message}
                      </Typography>
                    </UpdateItem>
                  ))}
                </ExpansionContent>
              )}
            </TicketCard>
          );
        })}
      </TicketListContainer>
    );
  };

  return (
    <ScreenShell title={title} onBack={onBack}>
      <Container>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <TabHeader>
            <TabButton active={activeTab === 'submit'} onPress={() => onTabChange('submit')}>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color={activeTab === 'submit' ? 'primary' : 'on_surface_variant'}
              >
                {t.submitTab}
              </Typography>
            </TabButton>
            <TabButton active={activeTab === 'history'} onPress={() => onTabChange('history')}>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color={activeTab === 'history' ? 'primary' : 'on_surface_variant'}
              >
                {t.historyTab}
              </Typography>
            </TabButton>
          </TabHeader>

          <ScrollContent showsVerticalScrollIndicator={false}>
            {activeTab === 'submit' ? renderSubmitForm() : renderTicketList()}
          </ScrollContent>
        </KeyboardAvoidingView>
      </Container>
    </ScreenShell>
  );
};
