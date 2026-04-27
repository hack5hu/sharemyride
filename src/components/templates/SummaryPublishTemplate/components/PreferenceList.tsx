import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { 
  GlassCard, 
  SectionHeader, 
  SectionLabel, 
  EditButton, 
  BadgeRow, 
  PrefBadge, 
  PrefBadgeText, 
  EmptyStateWrapper, 
  EmptyStateText 
} from './PreferenceList.styles';

interface PreferenceListProps {
  preferences: any[] | null;
  onEdit: () => void;
  t: any;
}

export const PreferenceList: React.FC<PreferenceListProps> = ({ preferences, onEdit, t }) => {
  const theme = useTheme();

  return (
    <GlassCard>
      <SectionHeader>
        <SectionLabel>{t.ridePreferencesLabel}</SectionLabel>
        <EditButton onPress={onEdit} activeOpacity={0.7}>
          <Icon name="edit" size={moderateScale(16)} color={theme.colors.primary} />
        </EditButton>
      </SectionHeader>
      
      {preferences && preferences.length > 0 ? (
        <BadgeRow>
          {preferences.map((pref) => (
            <PrefBadge key={pref.id}>
              <Icon name={pref.icon} size={moderateScale(16)} color={theme.colors.primary} />
              <PrefBadgeText>{pref.label}</PrefBadgeText>
            </PrefBadge>
          ))}
        </BadgeRow>
      ) : (
        <EmptyStateWrapper onPress={onEdit}>
          <EmptyStateText>{t.addPreferencesLabel}</EmptyStateText>
        </EmptyStateWrapper>
      )}
    </GlassCard>
  );
};
