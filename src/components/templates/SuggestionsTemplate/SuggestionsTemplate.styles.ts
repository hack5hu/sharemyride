import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';
import { LinearGradient } from 'react-native-linear-gradient';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const TabHeader = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(4)}px;
  margin-horizontal: ${scale(16)}px;
  margin-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding-vertical: ${verticalScale(12)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.surface_container_lowest : 'transparent'};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: moderateScale(16),
    gap: verticalScale(20),
  },
})`
  flex: 1;
`;

export const FormCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(16)}px;
`;

export const LabelContainer = styled.View`
  gap: ${verticalScale(4)}px;
`;

export const CategoryRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const CategoryItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding-horizontal: ${scale(14)}px;
  padding-vertical: ${verticalScale(10)}px;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.primary_container : theme.colors.surface_container_high};
`;

export const ScreenshotStrip = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const ScreenshotThumbnailContainer = styled.View`
  position: relative;
  width: ${scale(72)}px;
  height: ${scale(72)}px;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
`;

export const ScreenshotImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

export const DeleteButtonContainer = styled.View`
  position: absolute;
  top: ${verticalScale(2)}px;
  right: ${scale(2)}px;
`;

export const AddScreenshotBtn = styled.TouchableOpacity`
  width: ${scale(72)}px;
  height: ${scale(72)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
  gap: ${verticalScale(4)}px;
`;

export const StyledCategoryErrorText = styled(Typography)`
  margin-top: ${verticalScale(4)}px;
`;

export const SubmitBtnWrapper = styled.TouchableOpacity`
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
  margin-vertical: ${verticalScale(12)}px;
`;

export const SubmitGradientBtn = styled(LinearGradient).attrs<{ isSubmitting: boolean }>(({ theme }) => ({
  colors: [theme.colors.primary, theme.colors.primary_container],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))<{ isSubmitting: boolean }>`
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ isSubmitting }) => (isSubmitting ? 0.7 : 1)};
`;

export const TicketCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(12)}px;
`;

export const TicketHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TicketBody = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const ExpansionContent = styled.View`
  padding-top: ${verticalScale(12)}px;
  margin-top: ${verticalScale(4)}px;
  gap: ${verticalScale(12)}px;
`;

export const UpdateItem = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(10)}px;
  padding: ${moderateScale(10)}px;
  gap: ${verticalScale(4)}px;
`;

export const TicketListContainer = styled.View`
  gap: ${moderateScale(12)}px;
`;

export const StyledStaffUpdatesTitle = styled(Typography)`
  margin-top: ${verticalScale(8)}px;
`;
