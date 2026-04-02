import React from 'react';
import { 
  SafeAreaContainer, 
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
  return (
    <SafeAreaContainer>
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
    </SafeAreaContainer>
  );
};
