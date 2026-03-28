import React from 'react';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography } from '../../atoms/Typography';
import { StyledSocialButton, IconImage } from './SocialButton.styles';
import { SocialButtonProps } from './types';

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, ...props }) => {
  const isGoogle = provider === 'google';

  return (
    <StyledSocialButton activeOpacity={0.7} {...props}>
      {isGoogle ? (
        <IconImage
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYLiG6k1OZKL_yhkcdLq0Y0woQr3dFt-_0YKVqhEMHmLn-rGx6_wUNYTdEqKnh5fmrnZrUQCxS58eYl4YQVApreaaZ_21y97JKTkjqPt5sjdequaPVnxeBOTCrX4Ld9H5a7PHCrkLJq-vqLMXmSKzFatSAZ1NXHIVLrO5s7mB098qjRvECw9ed9qmW6zXcQyhlOTRamkUWDagwBhs3F_DXPo5Ltd_SliLzJNOGFWrJV0tRSmAt_LlLHpNB8dcCgA9HAVdYPk7zYc3y' }}
        />
      ) : (
        <IconMCI name="apple" size={22} color="#000000" />
      )}
      <Typography variant="label" size="lg" weight="semibold">
        {isGoogle ? 'Google' : 'Apple'}
      </Typography>
    </StyledSocialButton>
  );
};

