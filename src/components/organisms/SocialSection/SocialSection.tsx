import React from 'react';
import { SocialButton } from '../../molecules/SocialButton';
import { Typography } from '../../atoms/Typography';
import { useLocale } from '@/constants/localization';
import { Container, DividerRow, DividerLine, DividerText, ButtonsRow } from './SocialSection.styles';
import { SocialSectionProps } from './types';

export const SocialSection: React.FC<SocialSectionProps> = ({ onPressGoogle, onPressApple }) => {
  const t = useLocale();

  return (
    <Container>
      <DividerRow>
        <DividerLine />
        <DividerText>
          <Typography variant="label" size="sm" weight="bold" color="on_surface_variant">
            {t.login.orContinueWith}
          </Typography>
        </DividerText>
        <DividerLine />
      </DividerRow>

      <ButtonsRow>
        <SocialButton provider="google" onPress={onPressGoogle} />
        <SocialButton provider="apple" onPress={onPressApple} />
      </ButtonsRow>
    </Container>
  );
};
