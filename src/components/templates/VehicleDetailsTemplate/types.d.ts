export interface VehicleDetailsTemplateProps {
  formik: any;
  isLoading: boolean;
  carColors: any[];
  setSeater: any;
  setColor: (color: string) => void;
  goBack: () => void;
  t: any;
  theme: any;
}
