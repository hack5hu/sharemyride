import React from 'react';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useLocale } from '@/constants/localization';
import { 
  ScrollContainer, 
  SearchWrapper, 
  FABContainer 
} from './ChatListTemplate.styles';
import { ChatListTemplateProps } from './types.d';

export const ChatListTemplate: React.FC<ChatListTemplateProps> = ({
  searchBar,
  content,
  bottomNav,
  fab,
}) => {
  const { chat } = useLocale();

  return (
    <ScreenShell title={chat.headerTitle}>
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <SearchWrapper>
          {searchBar}
        </SearchWrapper>
        
        {content}
      </ScrollContainer>

      {fab && (
        <FABContainer>
          {fab}
        </FABContainer>
      )}

      {bottomNav}
    </ScreenShell>
  );
};
