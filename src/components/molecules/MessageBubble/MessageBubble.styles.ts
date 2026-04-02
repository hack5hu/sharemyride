import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View<{ isSender: boolean }>`
  flex-direction: ${({ isSender }) => (isSender ? 'row-reverse' : 'row')};
  align-items: flex-end;
  margin-bottom: ${verticalScale(16)}px;
  max-width: 85%;
  align-self: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
`;

export const BubbleWrapper = styled.View<{ isSender: boolean }>`
  background-color: ${({ theme, isSender }) =>
    isSender ? theme.colors.primary_container : theme.colors.surface_container_high};
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(20)}px;
  border-bottom-left-radius: ${({ isSender }) => (isSender ? moderateScale(20) : 0)}px;
  border-bottom-right-radius: ${({ isSender }) => (isSender ? 0 : moderateScale(20))}px;
  min-width: ${scale(60)}px;
`;

export const MessageText = styled.Text<{ isSender: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  line-height: ${moderateScale(20)}px;
  color: ${({ theme, isSender }) =>
    isSender ? theme.colors.on_primary_container : theme.colors.on_surface};
`;

export const Footer = styled.View<{ isSender: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ isSender }) => (isSender ? 'flex-end' : 'flex-start')};
  margin-top: ${verticalScale(4)}px;
  margin-horizontal: ${scale(4)}px;
`;

export const Timestamp = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  font-weight: 500;
`;
