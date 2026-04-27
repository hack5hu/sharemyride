import React from 'react';
import { SummaryPublishTemplate } from '@/components/templates/SummaryPublishTemplate/SummaryPublishTemplate';
import { useSummaryPublish } from './useSummaryPublish';

export const SummaryPublishScreen: React.FC = () => {
  const {
    routeData,
    schedule,
    vehicleData,
    pricingData,
    preferencesData,
    handleBack,
    handleSave,
    handlePublish,
    handleEditRoute,
    handleEditSchedule,
    handleEditVehicle,
    handleEditSeats,
    handleEditPreferences,
    isPublishing,
    validationError,
    canPublish,
  } = useSummaryPublish();

  return (
    <SummaryPublishTemplate
      route={routeData}
      schedule={schedule}
      vehicle={vehicleData}
      pricing={pricingData}
      preferences={preferencesData}
      isPublishing={isPublishing}
      validationError={validationError}
      canPublish={canPublish}
      onBack={handleBack}
      onSave={handleSave}
      onPublish={handlePublish}
      onEditRoute={handleEditRoute}
      onEditSchedule={handleEditSchedule}
      onEditVehicle={handleEditVehicle}
      onEditSeats={handleEditSeats}
      onEditPreferences={handleEditPreferences}
    />
  );
};
