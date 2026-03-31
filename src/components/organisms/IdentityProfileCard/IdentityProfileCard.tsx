import React, { useState } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Surface } from '../../atoms/Surface';
import { Typography } from '../../atoms/Typography';
import { Input } from '../../atoms/Input';
import { AvatarPicker } from '../../molecules/AvatarPicker';
import { GenderSelector } from '../../molecules/GenderSelector';
import { HeaderRow, InfoContainer, FormContainer } from './IdentityProfileCard.styles';
import { useTranslation } from '@/hooks/useTranslation';
import { formatDOBInput, formatDateToDDMMYYYY, parseDateFromDDMMYYYY } from '@/utils/date';

export interface IdentityProfileCardProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  errors?: any;
}

export const IdentityProfileCard: React.FC<IdentityProfileCardProps> = ({
  values,
  setFieldValue,
  errors,
}) => {
  const { t } = useTranslation();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateConfirm = (date: Date) => {
    setIsDatePickerOpen(false);
    setFieldValue('dob', formatDateToDDMMYYYY(date));
  };

  const handleDOBChange = (text: string) => {
    const formatted = formatDOBInput(text, values.dob || '');
    setFieldValue('dob', formatted);
  };

  return (
    <Surface elevation="lowest" rounded="md" padding="lg" >
      <HeaderRow>
        <AvatarPicker
          dob={values.dob}
          onImageSelected={(uri) => setFieldValue('profileImage', uri)}
          uri={values.profileImage}
        />
        <InfoContainer>
          <Typography variant="title" size="lg" weight="bold">
            {t('profileSetup.identityProfile')}
          </Typography>
          <Typography
            variant="label"
            size="sm"
            weight="bold"
            color="on_surface_variant"
            style={{ textTransform: 'uppercase', letterSpacing: 1.5 }}
          >
            {t('profileSetup.publicPresence')}
          </Typography>
        </InfoContainer>
      </HeaderRow>

      <FormContainer>
        <Input
          label={t('profileSetup.fullNameLabel')}
          value={values.fullName}
          onChangeText={(text) => setFieldValue('fullName', text)}
          placeholder={t('profileSetup.fullNamePlaceholder')}
          error={errors?.fullName}
        />

        <View style={{ flexDirection: 'row', gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Input
              label={t('profileSetup.dobLabel')}
              value={values.dob}
              onChangeText={handleDOBChange}
              placeholder="DD/MM/YYYY"
              onFocus={() => setIsDatePickerOpen(true)}
              rightIcon="calendar-today"
              error={errors?.dob}
              keyboardType="numeric"
            />
          </View>
        </View>

        <GenderSelector
          label={t('profileSetup.genderLabel')}
          value={values.gender}
          onValueChange={(val) => setFieldValue('gender', val)}
        />
      </FormContainer>

      <DatePicker
        modal
        open={isDatePickerOpen}
        date={parseDateFromDDMMYYYY(values.dob || '')}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={() => setIsDatePickerOpen(false)}
      />
    </Surface>
  );
};

