import React from 'react';
import { ScrollView } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Ticket } from '../types.d';
import * as S from '../SuggestionsTemplate.styles';

export interface TicketHistorySectionProps {
  tickets: Ticket[];
  expandedTicketId: string | null;
  toggleExpandTicket: (id: string) => void;
  getStatusLabel: (status: Ticket['status']) => string;
  getStatusBadgeVariant: (status: Ticket['status']) => any;
  interpolate: (val: string, options: any) => string;
  categories: Array<{ id: string; label: string }>;
  t: any;
}

export const TicketHistorySection: React.FC<TicketHistorySectionProps> = React.memo(({
  tickets,
  expandedTicketId,
  toggleExpandTicket,
  getStatusLabel,
  getStatusBadgeVariant,
  interpolate,
  categories,
  t,
}) => {
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
    <S.TicketListContainer>
      {tickets.map(ticket => {
        const isExpanded = expandedTicketId === ticket.id;
        const categoryObj = categories.find(c => c.id === ticket.category);
        return (
          <S.TicketCard
            key={ticket.id}
            onPress={() => toggleExpandTicket(ticket.id)}
            activeOpacity={0.9}
          >
            <S.TicketHeader>
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color="secondary"
              >
                {interpolate(t.ticketNumber, { ticketNumber: ticket.id })}
              </Typography>
              <StatusBadge
                label={getStatusLabel(ticket.status)}
                variant={getStatusBadgeVariant(ticket.status)}
              />
            </S.TicketHeader>

            <S.TicketBody>
              <Typography
                variant="title"
                size="md"
                weight="bold"
                color="on_surface"
              >
                {ticket.summary}
              </Typography>
              <Typography
                variant="label"
                size="xxs"
                color="on_surface_variant"
              >
                {categoryObj?.label || ticket.category} •{' '}
                {interpolate(t.ticketCreatedOn, { date: ticket.createdAt })}
              </Typography>
            </S.TicketBody>

            {isExpanded && (
              <S.ExpansionContent>
                <Typography
                  variant="body"
                  size="sm"
                  color="on_surface_variant"
                >
                  {ticket.description}
                </Typography>

                {ticket.screenshots.length > 0 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    <S.ScreenshotStrip>
                      {ticket.screenshots.map((uri, idx) => (
                        <S.ScreenshotThumbnailContainer key={`${uri}-${idx}`}>
                          <S.ScreenshotImage source={{ uri }} />
                        </S.ScreenshotThumbnailContainer>
                      ))}
                    </S.ScreenshotStrip>
                  </ScrollView>
                )}

                <S.StyledStaffUpdatesTitle
                  variant="title"
                  size="sm"
                  color="on_surface"
                  weight="bold"
                >
                  {t.updatesLabel}
                </S.StyledStaffUpdatesTitle>

                {ticket.updates.map((update, idx) => (
                  <S.UpdateItem key={idx}>
                    <Typography
                      variant="label"
                      size="xs"
                      weight="bold"
                      color="primary"
                    >
                      {update.author} • {update.date}
                    </Typography>
                    <Typography variant="body" size="sm" color="on_surface">
                      {update.message}
                    </Typography>
                  </S.UpdateItem>
                ))}
              </S.ExpansionContent>
            )}
          </S.TicketCard>
        );
      })}
    </S.TicketListContainer>
  );
});

TicketHistorySection.displayName = 'TicketHistorySection';
