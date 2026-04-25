import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ChatListTemplate } from '@/components/templates/ChatListTemplate';
import { SearchInput } from '@/components/molecules/SearchInput';
import { RecentMessagesSection } from '@/components/organisms/RecentMessagesSection';
import { BottomNav } from '@/components/organisms/BottomNav';
import { useChatList } from './useChatList';
import { ChatListScreenProps } from './types.d';
import { moderateScale } from '@/styles';
import * as S from './ChatList.styles';

export const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
  const { searchQuery, setSearchQuery, filteredMessages, t } = useChatList();

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
          onMessagePress={(id) => {
            const chat = (filteredMessages as any[]).find(m => m.id === id);
            navigation.navigate('ChatDetails', { 
              chatId: id, 
              name: chat?.name || 'Marcus' 
            });
          }}
        />
      }
      bottomNav={
        <BottomNav activeTab="CHATS" />
      }
      fab={
        <S.FloatingActionButton activeOpacity={0.9}>
          <MaterialIcon name="add-comment" size={moderateScale(24)} color="#FFFFFF" />
        </S.FloatingActionButton>
      }
    />
  );
};
