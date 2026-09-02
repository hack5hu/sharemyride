import { type MapProps } from '@maplibre/maplibre-react-native';
import type { StyleSpecification } from '@maplibre/maplibre-gl-style-spec';

export interface OlaMapProps extends Omit<MapProps, 'mapStyle'> {
  /**
   * Optional custom style URL or style object, defaults to the Ola standard light map style
   */
  mapStyle?: string | StyleSpecification;
}

