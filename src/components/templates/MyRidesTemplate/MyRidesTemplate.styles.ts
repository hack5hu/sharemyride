import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollLayout = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(120),
    paddingTop: verticalScale(8),
  },
})`
  flex: 1;
`;

export const Section = styled.View`
  padding-horizontal: ${scale(24)}px;
  margin-bottom: ${verticalScale(32)}px;
`;

export const ListWrapper = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const FABContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: ${verticalScale(100)}px;
  right: ${scale(24)}px;
  width: ${moderateScale(56)}px;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(28)}px;
  elevation: 8;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 12px;
  overflow: hidden;
`;

export const FABGradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
