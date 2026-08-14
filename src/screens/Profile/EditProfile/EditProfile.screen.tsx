import React from 'react';
import { useEditProfile } from './useEditProfile';
import { EditProfileTemplate } from '@/components/templates/EditProfileTemplate';

export const EditProfileScreen: React.FC = () => {
  const { formik, loading, navigation, t } = useEditProfile();

  return (
    <EditProfileTemplate
      formik={formik}
      loading={loading}

      navigation={navigation}
      t={t}
    />
  );
};
