import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ChatListTemplate } from '@/components/templates/ChatListTemplate';
import { SearchInput } from '@/components/molecules/SearchInput';
import { RecentMessagesSection } from '@/components/organisms/RecentMessagesSection';
import { BottomNav } from '@/components/organisms/BottomNav';
import { useChatList } from './useChatList';
import { ChatListScreenProps } from './types.d';
import { moderateScale } from '@/styles';
import { useTheme } from 'styled-components/native';

export const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
  const { searchQuery, setSearchQuery, filteredMessages, t } = useChatList();
  const theme = useTheme();

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
        <TouchableOpacity 
          style={{
            width: moderateScale(56),
            height: moderateScale(56),
            borderRadius: moderateScale(16),
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 12,
            elevation: 8,
          }}
          activeOpacity={0.9}
        >
          <MaterialIcon name="add-comment" size={moderateScale(24)} color="#FFFFFF" />
        </TouchableOpacity>
      }
    />
  );
};
