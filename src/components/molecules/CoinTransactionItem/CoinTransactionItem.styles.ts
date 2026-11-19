import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${moderateScale(14)}px;
  padding-horizontal: ${scale(14)}px;
  padding-vertical: ${verticalScale(12)}px;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(10)}px;
  elevation: 1;
  shadow-color: #000000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 2px;
`;

export const IconContainer = styled.View<{ isEarned: boolean }>`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(21)}px;
  background-color: ${props =>
    props.isEarned
      ? props.theme.name === 'dark'
        ? 'rgba(16, 185, 129, 0.18)'
        : '#DCFCE7'
      : props.theme.name === 'dark'
      ? 'rgba(239, 68, 68, 0.18)'
      : '#FEE2E2'};
  align-items: center;
  justify-content: center;
  margin-right: ${scale(12)}px;
`;

export const DetailsContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(14)}px;
  color: ${props => props.theme.colors.on_surface};
`;

export const Description = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${responsiveFont(12)}px;
  color: ${props => props.theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const DateText = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.outline};
  margin-top: ${verticalScale(2)}px;
`;

export const AmountContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
  margin-left: ${scale(8)}px;
`;

export const AmountText = styled.Text<{ isEarned: boolean }>`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  color: ${props =>
    props.isEarned
      ? props.theme.name === 'dark'
        ? '#34D399'
        : '#15803D'
      : props.theme.name === 'dark'
      ? '#F87171'
      : '#B91C1C'};
  font-weight: 700;
`;

