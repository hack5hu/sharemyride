import React from 'react';
import { ChatListTemplate } from '@/components/templates/ChatListTemplate';
import { SearchInput } from '@/components/molecules/SearchInput';
import { RecentMessagesSection } from '@/components/organisms/RecentMessagesSection';
import { BottomNav } from '@/components/organisms/BottomNav';
import { useChatList } from './useChatList';
import { ChatListScreenProps } from './types';

export const ChatListScreen: React.FC<ChatListScreenProps> = ({
  navigation,
}) => {
  const { searchQuery, setSearchQuery, filteredMessages, t, loadMore, isLoading } = useChatList();

  return (
    <ChatListTemplate
      searchBar={
        <SearchInput
          placeholder={t('chat.searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      }
      content={
        <RecentMessagesSection
          messages={filteredMessages as any}
          onLoadMore={loadMore}
          isLoading={isLoading}
          onMessagePress={id => {
            const chat = (filteredMessages as any[]).find(m => m.id === id);
            navigation.navigate('ChatDetails', {
              userId: id,
              rideId: chat?.rideId,
              name: chat?.name || 'User',
              avatarUri: chat?.avatarSource?.uri,
              rating: chat?.rating,
              rideInfo: chat?.rideInfo,
            });
          }}
        />
      }
      bottomNav={<BottomNav activeTab="CHATS" />}
    />
  );
};
