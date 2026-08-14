import React from 'react';
import { LocalRideResultsTemplate } from './LocalRideResultsTemplate';

export default {
  title: 'Templates/LocalRideResultsTemplate',
  component: LocalRideResultsTemplate,
};

export const Default = () => (
  <LocalRideResultsTemplate
    onBack={() => console.log('Back')}
    latitude={28.6139}
    longitude={77.209}
    localServiceAreaLabel="Local Service Area"
    requestLocalPartnerLabel="Request Local Partner"
    onRequestLocalPartner={() => console.log('Request')}
  />
);
