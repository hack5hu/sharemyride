import React from 'react';
import { useTheme } from 'styled-components/native';
import { RequestTypeTemplate } from '@/components/templates/RequestTypeTemplate';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRidePublishStore } from '@/store/useRidePublishStore';

export const RequestTypeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useAppNavigation();
  const { requestType: t } = useLocale();

  // State for booking type: 'instant' or 'review'
  const [bookingType, setBookingType] = React.useState<'instant' | 'review'>(
    'instant',
  );

  const { setRequestType } = useRidePublishStore();

  const handleBackPress = () => navigation.goBack();
  const handleContinue = () => {
    setRequestType(bookingType);
    (navigation.navigate as any)('SummaryPublish');
  };

  return (
    <RequestTypeTemplate
      bookingType={bookingType}
      setBookingType={setBookingType}
      handleBackPress={handleBackPress}
      handleContinue={handleContinue}
      t={t}
      theme={theme}
    />
  );
};
