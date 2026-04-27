import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  GlassCard, 
  PrefHeader, 
  PrefLabel, 
  EditButton, 
  BadgeRow, 
  PrefBadge, 
  PrefBadgeText 
} from './PreferencesSection.styles';
import { moderateScale } from '@/styles';

interface PreferencesSectionProps {
  preferences: any[];
  onEdit: () => void;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({ preferences, onEdit }) => {
  const theme = useTheme();

  return (
    <GlassCard>
      <PrefHeader>
        <PrefLabel>Preferences</PrefLabel>
        <EditButton onPress={onEdit}>
          <Icon name="edit" size={moderateScale(14)} color={theme.colors.primary} />
        </EditButton>
      </PrefHeader>
      
      <BadgeRow>
        {preferences.map((pref) => (
          <PrefBadge key={pref.id}>
            <Icon name={pref.icon} size={moderateScale(16)} color={theme.colors.primary} />
            <PrefBadgeText>{pref.label}</PrefBadgeText>
          </PrefBadge>
        ))}
        {preferences.length === 0 && (
          <PrefBadgeText style={{ opacity: 0.5 }}>No preferences set</PrefBadgeText>
        )}
      </BadgeRow>
    </GlassCard>
  );
};
