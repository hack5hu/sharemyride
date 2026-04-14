import React, { useEffect, forwardRef } from 'react';
import { Map as MapView, TransformRequestManager } from '@maplibre/maplibre-react-native';
import { OLA_API_KEY } from '@/constants/OlaStyle';
import { OlaMapProps } from './types.d';

// Run setup only once
let isTransformRequestSetup = false;

export const OlaMap = forwardRef<any, OlaMapProps>(({
  mapStyle = 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
  children,
  ...rest
}, ref) => {
  useEffect(() => {
    if (!isTransformRequestSetup) {
      // Setup global credentials for Ola Maps API v11
      TransformRequestManager.addUrlSearchParam({
        id: "ola-api-key",
        match: /api\.olamaps\.io/,
        name: "api_key",
        value: OLA_API_KEY,
      });

      // Strip out any redundant 'key=' parameters from the style JSON
      TransformRequestManager.addUrlTransform({
        id: "ola-key-cleanup",
        match: "api\\.olamaps\\.io",
        find: "([?&])key=[^&?]+",
        replace: "$1",
      });

      isTransformRequestSetup = true;
    }
  }, []);

  return (
    <MapView
      ref={ref}
      mapStyle={mapStyle}
      {...rest}
    >
      {children}
    </MapView>
  );
});

OlaMap.displayName = 'OlaMap';
