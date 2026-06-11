import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const FormContainer = styled.View`
  gap: ${verticalScale(20)}px;
`;

export const InputContainer = styled.View`
  position: relative;
  margin-bottom: ${verticalScale(12)}px;
`;

export const InputTapOverlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

export const TruecallerRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(4)}px;
  gap: ${scale(4)}px;
`;
export const DummyRow = styled.View`
  margin-vertical: ${verticalScale(20)}px;
`;

export const TermsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-top: ${verticalScale(4)}px;
`;

export const SecurityBadge = styled.View`
  width: ${scale(36)}px;
  height: ${scale(36)}px;
  border-radius: ${scale(18)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}1A`};
  justify-content: center;
  align-items: center;
`;
