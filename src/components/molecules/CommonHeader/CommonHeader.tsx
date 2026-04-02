import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale, moderateScale } from '@/styles';

export interface CommonHeaderProps {
  title: string;
  onBackPress: () => void;
  showSearch?: boolean;
  onSearchPress?: () => void;
}

const HeaderContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_container_low};
  z-index: 100;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

const IconButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  border-radius: ${moderateScale(24)}px;
`;

export const CommonHeader: React.FC<CommonHeaderProps> = ({ 
  title, 
  onBackPress, 
  showSearch, 
  onSearchPress 
}) => {
  return (
    <HeaderContainer>
      <LeftSection>
        <IconButton onPress={onBackPress} activeOpacity={0.7}>
          <Icon name="arrow-back" size={moderateScale(24)} color="#334155" />
        </IconButton>
        <Typography variant="title" size="md" weight="bold">{title}</Typography>
      </LeftSection>
      
      {showSearch && (
        <IconButton onPress={onSearchPress} activeOpacity={0.7}>
          <Icon name="search" size={moderateScale(24)} color="#10b981" />
        </IconButton>
      )}
    </HeaderContainer>
  );
};
