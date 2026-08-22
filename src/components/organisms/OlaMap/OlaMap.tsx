import React, { useEffect, forwardRef } from 'react';
import {
  Map as MapView,
  TransformRequestManager,
  OfflineManager,
  type MapRef,
} from '@maplibre/maplibre-react-native';
import { OLA_API_KEY, getOlaStyleUrl } from '@/constants/OlaStyle';
import type { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';
import { OlaMapProps } from './types.d';

// Run setup only once
let isTransformRequestSetup = false;

const setupOlaMap = (): void => {
  if (isTransformRequestSetup) return;

  try {
    // Set 100MB ambient tile cache to ensure repeat location views are cached
    OfflineManager.setMaximumAmbientCacheSize(100 * 1024 * 1024);

    TransformRequestManager.addUrlSearchParam({
      id: 'ola-api-key',
      match: /api\.olamaps\.io/,
      name: 'api_key',
      value: OLA_API_KEY,
    });

    TransformRequestManager.addUrlTransform({
      id: 'ola-key-cleanup',
      match: 'api\\.olamaps\\.io',
      find: '([?&])key=[^&?]+',
      replace: '$1',
    });

    isTransformRequestSetup = true;
  } catch {
    // Native modules may not be available during testing or early initialization
  }
};

// Eagerly initialize native interceptors on module load
setupOlaMap();

const DEFAULT_STYLE = getOlaStyleUrl as unknown as StyleSpecification;


export const OlaMap = React.memo(
  forwardRef<MapRef, OlaMapProps>(
    (
      {
        mapStyle = DEFAULT_STYLE,
        children,
        touchRotate = false,
        touchPitch = false,
        compass = false,
        ...rest
      },
      ref,
    ) => {
      useEffect(() => {
        setupOlaMap();
      }, []);

      return (
        <MapView
          ref={ref}
          mapStyle={mapStyle}
          touchRotate={touchRotate}
          touchPitch={touchPitch}
          compass={compass}
          {...rest}
        >
          {children}
        </MapView>
      );
    },
  ),
);

OlaMap.displayName = 'OlaMap';


