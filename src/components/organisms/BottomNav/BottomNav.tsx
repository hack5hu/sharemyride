import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Container, NavItem, Badge, BadgeText } from './BottomNav.styles';
import { BottomTabType, BottomNavProps } from './types';
import { useBottomNav } from './useBottomNav';
import { useChatStore } from '@/store/useChatStore';

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const theme = useTheme();
  const { t, handlePress } = useBottomNav(activeTab);
  const { conversations } = useChatStore();
  
  const unreadConversationsCount = conversations.filter(conv => (conv.unreadCount || 0) > 0).length;

  const renderItem = (tab: BottomTabType, icon: string, labelKey: string) => {
    const isActive = activeTab === tab;
    const showBadge = tab === 'CHATS' && unreadConversationsCount > 0;

    return (
      <NavItem active={isActive} onPress={() => handlePress(tab)}>
        <Icon 
          name={icon} 
          size={24} 
          color={isActive ? theme.colors.primary : theme.colors.outline} 
        />
        {showBadge && (
          <Badge>
            <BadgeText>{unreadConversationsCount > 99 ? '99+' : unreadConversationsCount}</BadgeText>
          </Badge>
        )}
        <Typography 
          variant="label" 
          size="sm" 
          weight="bold" 
          color={isActive ? theme.colors.primary : theme.colors.on_surface_variant}
          numberOfLines={1}
          align="center"
        >
          {t(`profileHub.${labelKey}`)}
        </Typography>
      </NavItem>
    );
  };

  return (
    <Container>
      {renderItem('BOOK', 'directions-car', 'navBook')}
      {renderItem('PUBLISH', 'add-circle', 'navPublish')}
      {renderItem('MY_RIDES', 'history', 'navMyRides')}
      {renderItem('CHATS', 'forum', 'navChats')}
      {renderItem('PROFILE', 'account-circle', 'navProfile')}
    </Container>
  );
};

