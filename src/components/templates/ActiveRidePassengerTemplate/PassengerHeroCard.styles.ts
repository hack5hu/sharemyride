import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const HeroCard = styled(LinearGradient).attrs(({ theme }) => ({
  colors: [
    theme.colors.primary,
    theme.colors.primary_container || '#004390',
  ],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  margin-bottom: ${verticalScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.18;
  shadow-radius: 14px;
  elevation: 6;
`;

export const HeroBadgeContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  padding-horizontal: ${scale(9)}px;
  padding-vertical: ${verticalScale(3.5)}px;
  border-radius: ${moderateScale(10)}px;
  align-self: flex-start;
  margin-bottom: ${verticalScale(2)}px;
`;

export const HeroLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10.5)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: 1.1px;
  text-transform: uppercase;
`;

export const ETARow = styled.View`
  flex-direction: row;
  align-items: baseline;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(2)}px;
`;

export const ETANumber = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(40)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: -1px;
`;

export const ETAMinutesText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(17)}px;
  color: ${({ theme }) => theme.colors.on_primary}DD;
`;

export const NextStopContainer = styled.View`
  margin-top: ${verticalScale(10)}px;
  background-color: rgba(255, 255, 255, 0.15);
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(14)}px;
`;

export const NextStopRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(8)}px;
`;

export const NextStopText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(13)}px;
  line-height: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const HeroActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(8)}px;
  padding-left: ${scale(24)}px;
`;

export const HeroActionPill = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: rgba(255, 255, 255, 0.22);
  padding-horizontal: ${scale(9)}px;
  padding-vertical: ${verticalScale(4.5)}px;
  border-radius: ${moderateScale(10)}px;
`;

export const HeroActionPillText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const DistancePill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(5)}px;
  margin-top: ${verticalScale(10)}px;
  background-color: rgba(255, 255, 255, 0.22);
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(16)}px;
  align-self: flex-start;
`;

export const DistanceText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11.5)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
