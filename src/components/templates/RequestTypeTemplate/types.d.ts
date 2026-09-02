import { type DefaultTheme } from 'styled-components/native';

export interface RequestTypeTemplateProps {
  bookingType: 'instant' | 'review';
  setBookingType: (type: 'instant' | 'review') => void;
  handleBackPress: () => void;
  handleContinue: () => void;
  t: {
    title: string;
    subtitle: string;
    instantBookingTitle: string;
    instantBookingSubtitle: string;
    requestReviewTitle: string;
    requestReviewSubtitle: string;
    proTipTitle: string;
    proTipText: string;
    continueButton: string;
  };
  theme: DefaultTheme;
}
