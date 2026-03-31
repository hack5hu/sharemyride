import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from '@/hooks/useTranslation';

export const useProfileSetup = () => {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    dob: Yup.string().required(t('profileSetup.dobRequiredError')),
    gender: Yup.string().required('Required'),
    location: Yup.string(),
    newsletter: Yup.boolean(),
    interests: Yup.array().of(Yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dob: '',
      gender: 'female',
      location: '',
      newsletter: true,
      interests: ['interestMinimalism'],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      // Handle submission
    },
  });

  return {
    formik,
    t,
  };
};
