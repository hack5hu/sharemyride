import React from 'react';
import { useLocale } from '@/constants/localization';
import { ReasonSelectorItem } from '@/components/molecules/ReasonSelectorItem';
import { Button } from '@/components/atoms/Button';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './CancelRideTemplate.styles';
import { CancelRideTemplateProps } from './types.d';

export const CancelRideTemplate: React.FC<CancelRideTemplateProps> = ({
  reasons,
  selectedReasonId,
  onSelectReason,
  otherReasonText,
  onOtherReasonTextChange,
  onConfirm,
  onDismiss,
}) => {
  const { cancelRide } = useLocale();

  return (
    <ScreenShell transparent>
      <S.OverlayContext>
        <S.Backdrop onPress={onDismiss} activeOpacity={1} />
        <S.BottomSheetContainer>
          <S.BottomSheetSurface>
            <S.DragHandle />
            
            <S.HeaderContent>
              <S.Title>{cancelRide.title}</S.Title>
              <S.Subtitle>{cancelRide.subtitle}</S.Subtitle>
            </S.HeaderContent>

            <S.ChoicesScroll>
              {reasons.map((reason) => (
                <ReasonSelectorItem
                  key={reason.id}
                  label={reason.label}
                  isSelected={selectedReasonId === reason.id}
                  onPress={() => onSelectReason(reason.id)}
                />
              ))}
              
              {selectedReasonId === 'other' && (
                <S.OtherInput
                  placeholder={cancelRide.otherReasonPlaceholder}
                  value={otherReasonText}
                  onChangeText={onOtherReasonTextChange}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              )}
            </S.ChoicesScroll>

            <S.ActionsContainer>
              <Button
                onPress={onConfirm}
                disabled={!selectedReasonId || (selectedReasonId === 'other' && !otherReasonText.trim())}
              >
                {cancelRide.confirmCancel}
              </Button>
              <S.GhostButton onPress={onDismiss} activeOpacity={0.8}>
                <S.GhostButtonText>{cancelRide.keepRide}</S.GhostButtonText>
              </S.GhostButton>
            </S.ActionsContainer>
          </S.BottomSheetSurface>
        </S.BottomSheetContainer>
      </S.OverlayContext>
    </ScreenShell>
  );
};
