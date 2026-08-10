import React from 'react';
import { DefaultTheme } from 'styled-components/native';
import { GeoJSONSource, Layer } from '@/components/organisms/OlaMap';

export interface RouteMapLayersProps {
  geoJSON: unknown;
  theme: DefaultTheme;
}

export const RouteMapLayers: React.FC<RouteMapLayersProps> = React.memo(({
  geoJSON,
  theme,
}) => {
  return (
    <>
      <GeoJSONSource
        id="ride-route-source"
        data={geoJSON as any}
      />

      {/* Highlighted Booked Route Segment */}
      <Layer
        id="route-line-highlighted"
        source="ride-route-source"
        type="line"
        filter={[
          'all',
          ['==', ['get', 'type'], 'route'],
          ['==', ['get', 'status'], 'highlighted'],
        ]}
        paint={{
          'line-color': theme.colors.primary,
          'line-width': 6,
        }}
        layout={{
          'line-cap': 'round',
          'line-join': 'round',
        }}
      />
      {/* Muted Unselected Route Segments */}
      <Layer
        id="route-line-unselected"
        source="ride-route-source"
        type="line"
        filter={[
          'all',
          ['==', ['get', 'type'], 'route'],
          ['==', ['get', 'status'], 'unselected'],
        ]}
        paint={{
          'line-color': theme.colors.outline,
          'line-width': 3.5,
          'line-opacity': 0.5,
        }}
        layout={{
          'line-cap': 'round',
          'line-join': 'round',
        }}
      />
      {/* Connecting Path: User Searched Pickup to Ride Pickup */}
      <Layer
        id="route-line-connection-pickup"
        source="ride-route-source"
        type="line"
        filter={[
          'all',
          ['==', ['get', 'type'], 'connection'],
          ['==', ['get', 'status'], 'pickup'],
        ]}
        paint={{
          'line-color': '#00875a',
          'line-width': 4,
          'line-dasharray': [2, 2],
        }}
        layout={{
          'line-cap': 'round',
          'line-join': 'round',
        }}
      />
      {/* Connecting Path: Ride Dropoff to User Searched Dropoff */}
      <Layer
        id="route-line-connection-dropoff"
        source="ride-route-source"
        type="line"
        filter={[
          'all',
          ['==', ['get', 'type'], 'connection'],
          ['==', ['get', 'status'], 'dropoff'],
        ]}
        paint={{
          'line-color': theme.colors.error,
          'line-width': 4,
          'line-dasharray': [2, 2],
        }}
        layout={{
          'line-cap': 'round',
          'line-join': 'round',
        }}
      />
      <Layer
        id="marker-start"
        source="ride-route-source"
        type="circle"
        filter={[
          'all',
          ['==', ['get', 'type'], 'marker'],
          ['==', ['get', 'role'], 'start'],
        ]}
        paint={{
          'circle-color': '#00875a',
          'circle-radius': 8,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#FFFFFF',
        }}
      />
      <Layer
        id="marker-end"
        source="ride-route-source"
        type="circle"
        filter={[
          'all',
          ['==', ['get', 'type'], 'marker'],
          ['==', ['get', 'role'], 'end'],
        ]}
        paint={{
          'circle-color': theme.colors.error,
          'circle-radius': 8,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#FFFFFF',
        }}
      />
      <Layer
        id="marker-stop"
        source="ride-route-source"
        type="circle"
        filter={[
          'all',
          ['==', ['get', 'type'], 'marker'],
          ['==', ['get', 'role'], 'stop'],
        ]}
        paint={{
          'circle-color': theme.colors.primary_container,
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': theme.colors.primary,
        }}
      />
      {/* User Searched Pickup Marker */}
      <Layer
        id="marker-user-pickup"
        source="ride-route-source"
        type="circle"
        filter={[
          'all',
          ['==', ['get', 'type'], 'marker'],
          ['==', ['get', 'role'], 'user-pickup'],
        ]}
        paint={{
          'circle-color': theme.colors.primary,
          'circle-radius': 8,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#FFFFFF',
        }}
      />
      {/* User Searched Dropoff Marker */}
      <Layer
        id="marker-user-dropoff"
        source="ride-route-source"
        type="circle"
        filter={[
          'all',
          ['==', ['get', 'type'], 'marker'],
          ['==', ['get', 'role'], 'user-dropoff'],
        ]}
        paint={{
          'circle-color': theme.colors.tertiary,
          'circle-radius': 8,
          'circle-stroke-width': 3,
          'circle-stroke-color': '#FFFFFF',
        }}
      />
    </>
  );
});

RouteMapLayers.displayName = 'RouteMapLayers';
