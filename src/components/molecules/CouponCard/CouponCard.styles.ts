import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const CardContainer = styled.View<{ isClaimed?: boolean }>`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${moderateScale(14)}px;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${props =>
    props.isClaimed
      ? props.theme.colors.primary
      : props.theme.colors.outline_variant};
  overflow: hidden;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(14)}px;
  padding-top: ${verticalScale(12)}px;
  padding-bottom: ${verticalScale(8)}px;
`;

export const DiscountTag = styled.View<{ isClaimed?: boolean }>`
  background-color: ${props =>
    props.isClaimed
      ? props.theme.colors.primary
      : props.theme.colors.primary_container};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const DiscountTagText = styled.Text<{ isClaimed?: boolean }>`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(12)}px;
  color: ${props =>
    props.isClaimed
      ? props.theme.colors.on_primary
      : props.theme.colors.on_primary_container};
  font-weight: 700;
`;

export const CostBadge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #FEF3C7;
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const CostText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(11)}px;
  color: #B45309;
  margin-left: ${scale(4)}px;
`;

export const CardBody = styled.View`
  padding-horizontal: ${scale(14)}px;
  padding-bottom: ${verticalScale(10)}px;
`;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(14)}px;
  color: ${props => props.theme.colors.on_surface};
  margin-bottom: ${verticalScale(4)}px;
`;

export const Description = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${responsiveFont(12)}px;
  color: ${props => props.theme.colors.on_surface_variant};
  line-height: ${responsiveFont(16)}px;
`;

export const DashedDivider = styled.View`
  height: ${moderateScale(1)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${props => props.theme.colors.outline_variant};
  border-style: dashed;
  margin-vertical: ${verticalScale(8)}px;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(14)}px;
  padding-bottom: ${verticalScale(12)}px;
`;

export const MinFareText = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.on_surface_variant};
`;

export const ActionButton = styled.Pressable<{ disabled?: boolean; isClaimed?: boolean }>`
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.surface_variant
      : props.isClaimed
      ? props.theme.colors.primary
      : props.theme.colors.primary};
  padding-horizontal: ${scale(14)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonText = styled.Text<{ disabled?: boolean }>`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(12)}px;
  color: ${props =>
    props.disabled
      ? props.theme.colors.on_surface_variant
      : props.theme.colors.on_primary};
  font-weight: 700;
`;

export const CodePill = styled.View`
  background-color: ${props => props.theme.colors.surface_variant};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(6)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${props => props.theme.colors.outline_variant};
  border-style: dashed;
`;

export const CodeText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(13)}px;
  color: ${props => props.theme.colors.primary};
  letter-spacing: 1px;
`;
