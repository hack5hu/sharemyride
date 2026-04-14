import { MapProps } from '@maplibre/maplibre-react-native';

export interface OlaMapProps extends MapProps {
  /**
   * Optional custom style URL, defaults to the Ola standard light map style
   */
  mapStyle?: string;
}
