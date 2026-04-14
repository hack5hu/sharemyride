import React from 'react';
import { RouteSelectionTemplate } from '@/components/templates/RouteSelectionTemplate';
import { useRouteSelection } from './useRouteSelection';

export const RouteSelectionScreen: React.FC = () => {
  const {
    routes,
    selectedRouteId,
    handleBackPress,
    handleSelectRoute,
    handleContinuePress,
  } = useRouteSelection();

  return (
    <RouteSelectionTemplate
      onBackPress={handleBackPress}
      onContinuePress={handleContinuePress}
      routes={routes}
      selectedRouteId={selectedRouteId}
      onSelectRoute={handleSelectRoute}
    />
  );
};
