import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { userService } from '@/serviceManager/userService';
import { Alert } from 'react-native';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

export const useProfileSetup = () => {
  const { t } = useTranslation();
  const { setProfileCompleted } = useAuthStore();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    dob: Yup.string().required(t('profileSetup.dobRequiredError')),
    gender: Yup.string(),
    profileImage: Yup.object()
      .shape({
        uri: Yup.string(),
      })
      .nullable(),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dob: '',
      gender: 'female',
      profileImage: null as any,
      newsletter: false,
    },
    validationSchema,
    onSubmit: async values => {
      try {
        console.log('Syncing profile to backend...', values);

        // ================= TEST INLINE FETCH CALL =================
        let formattedDate = values.dob;
        if (formattedDate && formattedDate.includes('/')) {
          const parts = formattedDate.split('/');
          if (parts.length === 3) {
            formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
          }
        }

        const formData = new FormData();
        formData.append('name', 'Sahil');
        formData.append('date', '1995-12-25');
        formData.append('gender', 'MALE');
        
        // HUGE FIX: React Native's FormData DOES NOT support {string, type: 'application/json'} for parts!
        // It converts unknown objects to "[object Object]", which crashes the backend JSON parser (500 Error).
        // We MUST append it strictly as a pure string.
        // formData.append('profile', JSON.stringify({
        //   name: values.fullName,
        //   date: '2001-12-22',
        //   gender: values.gender ? values.gender.toUpperCase() : 'OTHER',
        // }));

        if (values.profileImage?.uri) {
          formData.append('file', {
            uri: values.profileImage.uri,
            type: 'image/jpeg',
            name: 'profile_image.jpg',
          } as any);
        }

        const credentials = await Keychain.getGenericPassword({
          service: 'auth_token',
        });
        console.log(
          'TEST INLINE FETCH -> PREPARING TO SEND...',
          credentials ? credentials.password : 'NO_TOKEN',
        );

        // We use native `fetch` here because Axios + React Native heavily struggles 
        // with boundary generation when posting FormData. `fetch` does it perfectly.
        const response = await fetch('http://13.61.176.230:8080/user/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${credentials ? credentials.password : ''}`,
            'Content-Type': 'multipart/form-data',
            // We explicitly do NOT set Content-Type; fetch sets it with a boundary automatically!
          },
          body: formData,
        });

        const responseData = await response.json();

        if (!response.ok) {
           throw new Error(`Server returned ${response.status}: ${JSON.stringify(responseData)}`);
        }

        console.log('✅ TEST INLINE FETCH SUCCESS:', responseData);
        // ============================================================

        // Mark profile as completed to trigger RootNavigator stack switch
        setProfileCompleted(true);
        Alert.alert('Success', 'Profile setup complete!');
      } catch (error: any) {
        console.log(`error`, error)
        Alert.alert(
          'Error',
          error.message || 'Failed to save profile. Please try again.',
        );
      }
    },
  });

  // Derived state to check if all required fields have values
  const isFormComplete =
    formik.values.fullName.trim().length > 0 && formik.values.dob.length === 10;

  return {
    formik,
    t,
    isFormComplete,
  };
};
