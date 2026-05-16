import React from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { MessageItem } from '@/components/molecules/MessageItem';
import { Typography } from '@/components/atoms/Typography';
import { Container, TitleContainer } from './RecentMessagesSection.styles';
import { RecentMessagesSectionProps } from './types';
import { verticalScale } from '@/styles';
import { EmptyState } from '@/components/molecules/EmptyState';

export const RecentMessagesSection: React.FC<RecentMessagesSectionProps> = ({
  messages,
  onMessagePress,
}) => {
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: any }) => (
    <MessageItem 
      {...item} 
      onPress={() => onMessagePress(item.id)} 
    />
  );

  return (
    <Container>
      {messages.length > 0 && (
        <TitleContainer>
          <Typography 
            variant="label" 
            size="sm" 
            weight="bold" 
            color="on_surface_variant"
            style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}
          >
            {t('chat.recentMessages')}
          </Typography>
        </TitleContainer>
      )}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingBottom: verticalScale(32),
          flexGrow: 1,
        }}
        scrollEnabled={false}
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
};
