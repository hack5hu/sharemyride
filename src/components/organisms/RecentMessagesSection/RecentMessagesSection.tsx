import React, { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from '@/hooks/useTranslation';
import {
  MessageItem,
  MessageItemProps,
} from '@/components/molecules/MessageItem';

import {
  Container,
  TitleContainer,
  SectionTitle,
} from './RecentMessagesSection.styles';
import { RecentMessagesSectionProps } from './types';
import { verticalScale } from '@/styles';
import { EmptyState } from '@/components/molecules/EmptyState';

export const RecentMessagesSection: React.FC<RecentMessagesSectionProps> =
  React.memo(({ messages, onMessagePress }) => {
    const { t } = useTranslation();

    const renderItem = useCallback(
      ({ item }: { item: MessageItemProps }) => (
        <MessageItem {...item} onPress={() => onMessagePress(item.id)} />
      ),
      [onMessagePress],
    );

    return (
      <Container>
        {messages.length > 0 && (
          <TitleContainer>
            <SectionTitle
              variant="label"
              size="sm"
              weight="bold"
              color="on_surface_variant"
            >
              {t('chat.recentMessages')}
            </SectionTitle>
          </TitleContainer>
        )}
        <FlashList
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: verticalScale(32),
          }}
          ListEmptyComponent={
            <EmptyState
              icon="forum"
              title={t('chat.emptyTitle')}
              description={t('chat.emptyDescription')}
            />
          }
        />
      </Container>
    );
  });
