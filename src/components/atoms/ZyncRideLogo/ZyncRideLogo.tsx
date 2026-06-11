import React from 'react';
import Svg, { G, Path, Circle, Text as SvgText, TSpan } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';

interface ZyncRideLogoProps {
  width?: number | string;
  height?: number | string;
}

export const ZyncRideLogo: React.FC<ZyncRideLogoProps> = ({ width = 300, height = 100 }) => {
  const theme = useTheme();
  const t = useLocale();
  
  // E.g., 'ZyncRide' -> 'Zync' and 'Ride'
  const brandName = t.login.brandName; 
  const part1 = brandName.slice(0, 4); // "Zync"
  const part2 = brandName.slice(4);    // "Ride"

  return (
    <Svg viewBox="0 0 300 100" width={width} height={height}>
      <G transform="translate(10, 20) scale(0.6)">
        <Path
          d="M25 25H75L25 75H75"
          fill="none"
          stroke={theme.colors.primary}
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="75" cy="25" r="6" fill={theme.colors.on_surface} />
        <Circle cx="25" cy="75" r="6" fill={theme.colors.on_surface} />
      </G>
      <SvgText
        x="80"
        y="65"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="40"
        fill={theme.colors.on_surface}
      >
        {part1}<TSpan fill={theme.colors.primary}>{part2}</TSpan>
      </SvgText>
    </Svg>
  );
};
