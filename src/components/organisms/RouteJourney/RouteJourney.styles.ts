import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from '@/styles/scale';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(24)}px;
  border-radius: ${moderateScale(24)}px;
  position: relative;
`;

export const StopsContainer = styled.View`
  padding-left: ${scale(8)}px;
`;

export const ConnectorLine = styled(LinearGradient)`
  position: absolute;
  left: ${scale(32) + moderateScale(11)}px;
  top: ${verticalScale(32) + moderateScale(8)}px;
  bottom: ${verticalScale(32) + moderateScale(32)}px; /* Adjusted to end at the last icon */
  width: ${scale(2)}px;
  border-radius: ${scale(1)}px;
`;
/* 
Note: The calculation for the connector line needs to be precise. 
Icon width is 24px, so center is 12px. 
IconContainer has width 24px.
Padding of Container is 24px.
IconContainer margin is 0 (it's inside Container).
So left = 24 (padding) + 12 (half of icon) = 36.
Wait, my StopItem has IconContainer (24px) then Content (margin-left: 12px).
So in StopItem, Icon is at the very left.
In Container, we have stops.
Left = 24 (Container padding) + 11 (approx center of 24px icon) = 35.
Let's use scale(35) as a base.
*/
