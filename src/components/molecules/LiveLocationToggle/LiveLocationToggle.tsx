import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Toggle } from '@/components/atoms/Toggle';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';
import {
  Container,
  LeftSection,
  IconBox,
  TextContent,
  PrimaryText,
  Description,
} from './LiveLocationToggle.styles';
import { type LiveLocationToggleProps } from './types.d';

export const LiveLocationToggle: React.FC<LiveLocationToggleProps> = ({
  isEnabled,
  onToggle,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <LeftSection>
        <IconBox>
          <Icon
            name="share-location"
            size={moderateScale(20)}
            color={theme.colors.tertiary}
          />
        </IconBox>
        <TextContent>
          <PrimaryText>{t('common.shareLiveLocation')}</PrimaryText>
          <Description>{t('common.letOthersTrack')}</Description>
        </TextContent>
      </LeftSection>

      <Toggle value={isEnabled} onValueChange={onToggle} />
    </Container>
  );
};
