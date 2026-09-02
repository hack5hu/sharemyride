import { type FormikProps } from 'formik';

export interface EditProfileFormValues {
  fullName: string;
  phone: string;
  dob: string;
  gender: string;
  bio?: string;
}

export interface EditProfileTemplateProps {
  formik: FormikProps<EditProfileFormValues>;
  loading: boolean;
  navigation: any; // Checked that navigation is standard react-navigation prop, we can type as any or navigation prop
  t: (key: string) => string;
}
