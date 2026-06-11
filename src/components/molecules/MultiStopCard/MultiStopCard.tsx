import React from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}26`};
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(12)}px;
  overflow: hidden;
  position: relative;
`;

const WatermarkContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${moderateScale(12)}px;
  opacity: 0.1;
`;

const Title = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const Subtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

const CustomizeButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding-vertical: ${verticalScale(12)}px;
  padding-horizontal: ${scale(16)}px;
  border-radius: ${moderateScale(12)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 4px;
  elevation: 1;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}1A`};
`;

const CustomizeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export interface MultiStopCardProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  onCustomize: () => void;
}

export const MultiStopCard: React.FC<MultiStopCardProps> = ({
  title,
  subtitle,
  buttonLabel,
  onCustomize,
}) => {
  const theme = useTheme();

  return (
    <Card>
      <WatermarkContainer>
        <MaterialIcons name="route" size={moderateScale(60)} color={theme.colors.on_surface} />
      </WatermarkContainer>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <CustomizeButton onPress={onCustomize} activeOpacity={0.8}>
        <MaterialIcons name="settings-input-component" size={moderateScale(20)} color={theme.colors.primary} />
        <CustomizeText>{buttonLabel}</CustomizeText>
      </CustomizeButton>
    </Card>
  );
};
