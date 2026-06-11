import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';
import { NotificationType } from '@/constants/enums';

export const NotificationContainer = styled.View<{ type: NotificationType }>`
  width: ${scale(342)}px;
  padding: ${moderateScale(12)}px ${moderateScale(16)}px;
  border-radius: ${({ theme }) => theme.roundness.lg}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  flex-direction: row;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.12;
  shadow-radius: 12px;
  elevation: 8;
  margin-top: ${verticalScale(40)}px;
`;

export const IconContainer = styled.View`
  margin-right: ${scale(12)}px;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;
