import React from 'react';
import styled from 'styled-components/native';
import { Typography } from '../Typography';
import { moderateScale } from '@/styles';

export interface StatValueProps {
  children: string | number;
  size?: 'md' | 'lg' | 'xl';
}

const StyledTypography = styled(Typography)<{ size?: string }>`
  font-size: ${({ size }) => {
    switch (size) {
      case 'xl': return moderateScale(48);
      case 'lg': return moderateScale(32);
      default: return moderateScale(24);
    }
  }}px;
  line-height: ${({ size }) => {
    switch (size) {
      case 'xl': return moderateScale(56);
      case 'lg': return moderateScale(40);
      default: return moderateScale(32);
    }
  }}px;
`;

export const StatValue: React.FC<StatValueProps> = ({ children, size = 'md' }) => {
  return (
    <StyledTypography variant="title" weight="bold" size="xl" style={{ fontSize: size === 'xl' ? moderateScale(48) : size === 'lg' ? moderateScale(32) : moderateScale(24) }}>
      {children}
    </StyledTypography>
  );
};
