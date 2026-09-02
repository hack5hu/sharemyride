import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useLocale } from '@/constants/localization';
import {
  ScrollContainer,
  SearchWrapper,
  FABContainer,
  HeaderWrapper,
} from './ChatListTemplate.styles';
import { type ChatListTemplateProps } from './types.d';

export const ChatListTemplate: React.FC<ChatListTemplateProps> = ({
  searchBar,
  content,
  bottomNav,
  fab,
}) => {
  const { chat } = useLocale();

  return (
    <ScreenShell noPaddingBottom={Boolean(bottomNav)}>
      <ScrollContainer showsVerticalScrollIndicator={false}>
        <HeaderWrapper>
          <Typography variant="display" size="sm" weight="bold">
            {chat.headerTitle}
          </Typography>
        </HeaderWrapper>

        <SearchWrapper>{searchBar}</SearchWrapper>

        {content}
      </ScrollContainer>

      {fab && <FABContainer>{fab}</FABContainer>}

      {bottomNav}
    </ScreenShell>
  );
};
