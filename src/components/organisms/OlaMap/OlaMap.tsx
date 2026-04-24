import React, { useEffect, forwardRef } from 'react';
import { Map as MapView, TransformRequestManager } from '@maplibre/maplibre-react-native';
import { OLA_API_KEY } from '@/constants/OlaStyle';
import { OlaMapProps } from './types.d';

// Run setup only once
let isTransformRequestSetup = false;

const DEFAULT_STYLE = 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json';

export const OlaMap = React.memo(forwardRef<any, OlaMapProps>(({
  mapStyle = DEFAULT_STYLE,
  children,
  ...rest
}, ref) => {
  useEffect(() => {
    if (!isTransformRequestSetup) {
      TransformRequestManager.addUrlSearchParam({
        id: "ola-api-key",
        match: /api\.olamaps\.io/,
        name: "api_key",
        value: OLA_API_KEY,
      });

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
      logoEnabled={false}
      attributionEnabled={false}
      styleURL={mapStyle} // redundant but safe
      {...rest}
    >
      {children}
    </MapView>
  );
}));

OlaMap.displayName = 'OlaMap';
