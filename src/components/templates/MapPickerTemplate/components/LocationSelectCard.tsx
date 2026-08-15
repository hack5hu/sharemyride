import React from 'react';
import { useTheme } from 'styled-components/native';
import { moderateScale, verticalScale } from '@/styles';
import { useBottomSafeArea } from '@/hooks/useBottomSafeArea';
import { Button } from '@/components/atoms/Button';
import { MapPickerTranslations } from '@/constants/localization/types';
import * as S from '../MapPickerTemplate.styles';

export interface LocationSelectCardProps {
  locationName?: string;
  locationAddress?: string;
  onSelect: () => void;
  disabled?: boolean;
  t: MapPickerTranslations;
}

export const LocationSelectCard: React.FC<LocationSelectCardProps> = ({
  locationName,
  locationAddress,
  onSelect,
  disabled,
  t,
}) => {
  const theme = useTheme();
  const bottomPadding = useBottomSafeArea(verticalScale(16), verticalScale(12));

  return (
    <S.SelectButtonContainer
      $paddingBottom={bottomPadding}
    >
      <S.LocationPreviewContainer>
        <S.PreviewIcon
          name="locate-sharp"
          size={moderateScale(18)}
          color={theme.colors.primary}
        />
        <S.TextWrapper>
          <S.LocationPreviewTitle numberOfLines={1}>
            {locationName || 'Select a spot on the map'}
          </S.LocationPreviewTitle>
          {!!locationAddress && (
            <S.LocationPreviewText numberOfLines={1}>
              {locationAddress}
            </S.LocationPreviewText>
          )}
        </S.TextWrapper>
      </S.LocationPreviewContainer>

      <Button
        onPress={onSelect}
        disabled={disabled || !locationName}
      >
        {t.selectLocation}
      </Button>
    </S.SelectButtonContainer>
  );
};
