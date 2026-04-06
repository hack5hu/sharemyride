import React from 'react';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import {
  CardContainer,
  LeftSection,
  IconCircle,
  LabelText,
  ValueText,
} from './SelectionPreviewCard.styles';

export interface SelectionPreviewCardProps {
  label: string;
  value: string;
  icon?: string;
}

export const SelectionPreviewCard: React.FC<SelectionPreviewCardProps> = ({
  label,
  value,
  icon = 'calendar-today',
}) => {
  const theme = useTheme();

  return (
    <CardContainer>
      <LeftSection>
        <IconCircle>
          <MaterialIcons name={icon} size={moderateScale(20)} color={theme.colors.primary} />
        </IconCircle>
        <View>
          <LabelText>{label}</LabelText>
          <ValueText>{value}</ValueText>
        </View>
      </LeftSection>
      <MaterialIcons name="check-circle" size={moderateScale(24)} color={theme.colors.primary} />
    </CardContainer>
  );
};
