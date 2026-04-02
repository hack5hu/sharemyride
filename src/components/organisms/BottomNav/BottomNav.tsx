import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Container, NavItem } from './BottomNav.styles';
import { BottomTabType, BottomNavProps } from './types';
import { useBottomNav } from './useBottomNav';

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const theme = useTheme();
  const { t, handlePress } = useBottomNav(activeTab);

  const renderItem = (tab: BottomTabType, icon: string, labelKey: string) => {
    const isActive = activeTab === tab;
    return (
      <NavItem active={isActive} onPress={() => handlePress(tab)}>
        <Icon 
          name={icon} 
          size={24} 
          color={isActive ? theme.colors.primary : theme.colors.outline} 
        />
        <Typography 
          variant="label" 
          size="sm" 
          weight="bold" 
          color={isActive ? 'primary' : 'on_surface_variant'}
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

