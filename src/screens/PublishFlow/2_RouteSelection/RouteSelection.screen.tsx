import React from 'react';
import { RouteSelectionTemplate } from '@/components/templates/RouteSelectionTemplate';
import { useRouteSelection } from './useRouteSelection';

export const RouteSelectionScreen: React.FC = () => {
  const {
    routes,
    routesData,
    selectedRouteId,
    isLoading,
    handleBackPress,
    handleSelectRoute,
    handleContinuePress,
  } = useRouteSelection();

  return (
    <RouteSelectionTemplate
      onBackPress={handleBackPress}
      onContinuePress={handleContinuePress}
      routes={routes}
      routesData={routesData}
      selectedRouteId={selectedRouteId}
      onSelectRoute={handleSelectRoute}
      isLoading={isLoading}
    />
  );
};
