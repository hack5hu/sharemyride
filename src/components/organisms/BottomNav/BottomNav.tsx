import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Typography } from '../../atoms/Typography';
import { Container, NavItem } from './BottomNav.styles';
import { useTranslation } from '@/hooks/useTranslation';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';

export type BottomTabType = 'BOOK' | 'PUBLISH' | 'MY_RIDES' | 'CHATS' | 'PROFILE';

export interface BottomNavProps {
  activeTab: BottomTabType;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = (tab: BottomTabType) => {
    if (tab === activeTab) return;

    switch (tab) {
      case 'PROFILE':
        navigation.navigate('ProfileHub');
        break;
      default:
        navigation.navigate('Dummy', { 
          title: t(`profileHub.nav${tab.replace('_', '').toLowerCase().charAt(0).toUpperCase() + tab.replace('_', '').toLowerCase().slice(1)}`),
          activeTab: tab 
        });
        break;
    }
  };

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
