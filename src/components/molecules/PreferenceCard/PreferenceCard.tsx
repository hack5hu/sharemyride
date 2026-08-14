import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import {
  CardContainer,
  IconWrapper,
  StatusRow,
  Indicator,
  StyledStatusText,
} from './PreferenceCard.styles';
import { PreferenceCardProps } from './types';

export const PreferenceCard: React.FC<PreferenceCardProps> = ({
  icon,
  title,
  enabled,
  onPress,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <CardContainer active={enabled} onPress={onPress}>
      <IconWrapper active={enabled}>
        <Icon
          name={icon}
          size={24}
          color={enabled ? theme.colors.on_primary_fixed : theme.colors.primary}
        />
      </IconWrapper>

      <Box>
        <Typography
          variant="label"
          size="lg"
          weight="bold"
          color={enabled ? 'on_primary_container' : 'on_surface'}
        >
          {title}
        </Typography>

        <StatusRow>
          <StyledStatusText
            variant="label"
            size="sm"
            weight="bold"
            color={enabled ? 'primary' : 'on_surface_variant'}
          >
            {enabled
              ? t('travelPreferences.enabled').toUpperCase()
              : t('travelPreferences.disabled').toUpperCase()}
          </StyledStatusText>
          <Indicator active={enabled} />
        </StatusRow>
      </Box>
    </CardContainer>
  );
};
