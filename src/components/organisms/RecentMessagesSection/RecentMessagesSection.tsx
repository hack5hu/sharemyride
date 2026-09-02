import { FlashList } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { EmptyState } from '@/components/molecules/EmptyState';
import {
  MessageItem,
  type MessageItemProps,
} from '@/components/molecules/MessageItem';
import { useTranslation } from '@/hooks/useTranslation';
import { verticalScale } from '@/styles';
import {
  Container,
  TitleContainer,
  SectionTitle,
} from './RecentMessagesSection.styles';
import { type RecentMessagesSectionProps } from './types';

export const RecentMessagesSection: React.FC<RecentMessagesSectionProps> =
  React.memo(({ messages, onMessagePress, onLoadMore, isLoading }) => {
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
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingBottom: verticalScale(32),
          }}
          ListFooterComponent={isLoading ? <EmptyState icon="hourglass-empty" title={t('common.loading')} description="" /> : null}
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
