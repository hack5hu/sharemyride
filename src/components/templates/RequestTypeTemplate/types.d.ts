export interface RequestTypeTemplateProps {
  bookingType: 'instant' | 'review';
  setBookingType: (type: 'instant' | 'review') => void;
  handleBackPress: () => void;
  handleContinue: () => void;
  t: any;
  theme: any;
}
