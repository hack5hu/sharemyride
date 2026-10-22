import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const ModalCard = styled.Pressable`
  width: 90%;
  max-height: 82%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(24)}px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(18)}px;
  padding-bottom: ${verticalScale(14)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_variant};
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  flex: 1;
`;

export const CloseButton = styled.Pressable`
  padding: ${moderateScale(6)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
`;

export const ModalScroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(24),
  },
})`
  flex-grow: 1;
`;

export const SectionTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(8)}px;
  letter-spacing: -0.2px;
`;

export const RuleCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8FAFC'};
  border-radius: ${moderateScale(12)}px;
  padding-horizontal: ${scale(14)}px;
  padding-vertical: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(8)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const RuleLeft = styled.View`
  flex: 1;
  margin-right: ${scale(10)}px;
`;

export const RuleTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const RuleDesc = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const FaqItem = styled.View`
  margin-bottom: ${verticalScale(10)}px;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(255,255,255,0.03)' : '#F1F5F9'};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(12)}px;
`;

export const FaqQuestion = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(4)}px;
`;

export const FaqAnswer = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(17)}px;
`;

export const TermBullet = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(11.5)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(6)}px;
  line-height: ${responsiveFont(16)}px;
`;

export const FooterContainer = styled.View`
  padding: ${moderateScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.surface_variant};
`;
