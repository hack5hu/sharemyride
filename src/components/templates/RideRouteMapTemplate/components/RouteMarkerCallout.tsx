import React from 'react';
import { formatDisplayAddress } from '@/utils/address';
import * as S from './RouteMarkerCallout.styles';

export interface RouteMarkerData {
  id: string;
  coordinates: [number, number];
  role: 'start' | 'end' | 'stop' | 'user-pickup' | 'user-dropoff';
  name: string;
}

interface RouteMarkerCalloutProps {
  marker: RouteMarkerData;
}

const getRoleLabel = (role: RouteMarkerData['role']): string => {
  switch (role) {
    case 'start':
      return 'Pickup Point';
    case 'end':
      return 'Dropoff Point';
    case 'user-pickup':
      return 'Your Pickup';
    case 'user-dropoff':
      return 'Your Dropoff';
    case 'stop':
    default:
      return 'Stop';
  }
};

export const RouteMarkerCallout: React.FC<RouteMarkerCalloutProps> = React.memo(
  ({ marker }) => {
    const formattedAddress =
      formatDisplayAddress(marker.name) || marker.name;

    return (
      <S.MarkerContainer>
        <S.CalloutBubble $role={marker.role}>
          <S.CalloutRoleBadge $role={marker.role}>
            <S.CalloutRoleText $role={marker.role}>
              {getRoleLabel(marker.role)}
            </S.CalloutRoleText>
          </S.CalloutRoleBadge>
          <S.CalloutAddressText numberOfLines={3} ellipsizeMode="tail">
            {formattedAddress}
          </S.CalloutAddressText>
        </S.CalloutBubble>
        <S.CalloutPointer $role={marker.role} />
        <S.MarkerDot $role={marker.role} />
      </S.MarkerContainer>
    );
  },
);

RouteMarkerCallout.displayName = 'RouteMarkerCallout';
