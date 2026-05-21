import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Box } from '@/components/atoms/Box';
import { moderateScale, verticalScale } from '@/styles';
import { useLocale } from '@/constants/localization';

interface CancellationReasonBoxProps {
  cancellationReason: string;
}

export const CancellationReasonBox: React.FC<CancellationReasonBoxProps> = React.memo(({ cancellationReason }) => {
  const theme = useTheme();
  const translations = useLocale();

  return (
    <Box 
      backgroundColor={theme.colors.error + '10'} 
      padding={moderateScale(12)} 
      borderRadius={moderateScale(12)}
      marginBottom={verticalScale(16)}
      flexDirection="row"
      alignItems="center"
    >
      <Icon name="error-outline" size={moderateScale(20)} color={theme.colors.error} />
      <Box marginLeft={moderateScale(8)} flex={1}>
        <Typography variant="label" size="xs" weight="bold" color="error">
          {translations.rideDetails.cancellationReasonTitle.toUpperCase()}
        </Typography>
        <Typography variant="body" size="sm" color="on_surface">
          {cancellationReason}
        </Typography>
      </Box>
    </Box>
  );
});
