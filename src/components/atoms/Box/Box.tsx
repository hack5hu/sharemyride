import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

export interface BoxProps extends ViewProps {
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  gap?: number;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
}

export const Box = styled.View<BoxProps>`
  ${({ flex }) => flex !== undefined && `flex: ${flex};`}
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
  ${({ padding }) => padding !== undefined && `padding: ${padding}px;`}
  ${({ paddingVertical }) => paddingVertical !== undefined && `padding-vertical: ${paddingVertical}px;`}
  ${({ paddingHorizontal }) => paddingHorizontal !== undefined && `padding-horizontal: ${paddingHorizontal}px;`}
  ${({ margin }) => margin !== undefined && `margin: ${margin}px;`}
  ${({ marginVertical }) => marginVertical !== undefined && `margin-vertical: ${marginVertical}px;`}
  ${({ marginHorizontal }) => marginHorizontal !== undefined && `margin-horizontal: ${marginHorizontal}px;`}
  ${({ gap }) => gap !== undefined && `gap: ${gap}px;`}
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({ width }) => width !== undefined && `width: ${typeof width === 'number' ? `${width}px` : width};`}
  ${({ height }) => height !== undefined && `height: ${typeof height === 'number' ? `${height}px` : height};`}
`;
