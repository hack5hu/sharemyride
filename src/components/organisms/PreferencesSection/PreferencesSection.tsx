import React from 'react';
import { View } from 'react-native';
import { Surface } from '../../atoms/Surface';
import { Typography } from '../../atoms/Typography';
import { Toggle } from '../../atoms/Toggle';
import { Tag } from '../../atoms/Tag';
import { LocationInput } from '../../molecules/LocationInput';
import { SectionHeader, ToggleRow, TagWrapper } from './PreferencesSection.styles';
import { useTranslation } from '@/hooks/useTranslation';

export interface PreferencesSectionProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = React.memo(({
  values,
  setFieldValue,
}) => {
  const { t } = useTranslation();

  const interests = [
    { key: 'interestDigitalArt', label: t('profileSetup.interestDigitalArt') },
    { key: 'interestSustainableLiving', label: t('profileSetup.interestSustainableLiving') },
    { key: 'interestMinimalism', label: t('profileSetup.interestMinimalism') },
    { key: 'interestTypography', label: t('profileSetup.interestTypography') },
    { key: 'interestTechEthics', label: t('profileSetup.interestTechEthics') },
    { key: 'interestArchitecture', label: t('profileSetup.interestArchitecture') },
  ];

  return (
    <View style={{ gap: 16, marginTop: 16 }}>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        {/* <Surface elevation="low" rounded="md" padding="lg" style={{ flex: 2 }}>
          <LocationInput
            label={t('profileSetup.locationPreference')}
            value={values.location}
            onValueChange={(val) => setFieldValue('location', val)}
          />
        </Surface> */}

        <Surface elevation="low" rounded="md" padding="lg" style={{ flex: 1, justifyContent: 'space-between' }}>
          <Typography
            variant="label"
            size="sm"
            weight="bold"
            color="on_surface_variant"
            style={{ textTransform: 'uppercase', letterSpacing: 1.5 }}
          >
            {t('profileSetup.newsletter')}
          </Typography>
          <ToggleRow>
            <Typography variant="body" size="sm" weight="bold">
              {t('profileSetup.curatedPicks')}
            </Typography>
            <Toggle
              value={values.newsletter}
              onValueChange={(val) => setFieldValue('newsletter', val)}
            />
          </ToggleRow>
        </Surface>
      </View>
    </View>
  );
});
