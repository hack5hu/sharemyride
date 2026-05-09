import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideComfortSection.styles';

const PREFERENCE_ICONS: Record<string, string> = {
  noSmoking: 'smoke-free',
  petFriendly: 'pets',
  luggageAllowed: 'luggage',
  ladiesOnly: 'female',
  manualApproval: 'how-to-reg',
  autoApproval: 'flash-on',
};

const PREFERENCE_LABELS: Record<string, string> = {
  noSmoking: 'Smoke-Free Ride',
  petFriendly: 'Pets Welcome',
  luggageAllowed: 'Luggage OK',
  ladiesOnly: 'Ladies Only',
  manualApproval: 'Approval Required',
  autoApproval: 'Instant Booking',
};

interface RideComfortSectionProps {
  features: string[];
}

export const RideComfortSection: React.FC<RideComfortSectionProps> = ({ features }) => {
  const theme = useTheme();

  const preferenceFeatures = features.filter(f => !f.startsWith('music:'));
  const musicFeature = features.find(f => f.startsWith('music:'));
  const musicGenre = musicFeature?.replace('music:', '');

  if (preferenceFeatures.length === 0 && !musicGenre) return null;

  return (
    <S.SectionCard>
      <S.SectionLabelRow>
        <S.SectionDot color={theme.colors.secondary} />
        <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
          JOURNEY COMFORT
        </Typography>
      </S.SectionLabelRow>
      <S.ChipsWrap>
        {preferenceFeatures.map((feat) => (
          <S.PreferenceChip key={feat} accent={feat === 'noSmoking'}>
            <Icon
              name={PREFERENCE_ICONS[feat] || 'check-circle'}
              size={moderateScale(15)}
              color={feat === 'noSmoking' ? theme.colors.error : theme.colors.primary}
            />
            <Typography variant="label" size="sm" weight="medium">
              {PREFERENCE_LABELS[feat] || feat}
            </Typography>
          </S.PreferenceChip>
        ))}
        {musicGenre && (
          <S.PreferenceChip>
            <Icon name="music-note" size={moderateScale(15)} color={theme.colors.secondary} />
            <Typography variant="label" size="sm" weight="medium">
              {musicGenre} Vibes
            </Typography>
          </S.PreferenceChip>
        )}
      </S.ChipsWrap>
    </S.SectionCard>
  );
};
