import React from 'react';
import { EditProfileTemplate } from '@/components/templates/EditProfileTemplate';
import { useEditProfile } from './useEditProfile';

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
