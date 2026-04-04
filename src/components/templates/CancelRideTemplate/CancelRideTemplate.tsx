import React from 'react';
import { useLocale } from '@/constants/localization';
import { ReasonSelectorItem } from '@/components/molecules/ReasonSelectorItem';
import { Button } from '@/components/atoms/Button';
import {
  OverlayContext,
  Backdrop,
  BottomSheetContainer,
  BottomSheetSurface,
  DragHandle,
  HeaderContent,
  Title,
  Subtitle,
  ChoicesScroll,
  OtherInput,
  ActionsContainer,
  GhostButton,
  GhostButtonText,
} from './CancelRideTemplate.styles';
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
    <OverlayContext>
      <Backdrop onPress={onDismiss} activeOpacity={1} />
      <BottomSheetContainer>
        <BottomSheetSurface>
          <DragHandle />
          
          <HeaderContent>
            <Title>{cancelRide.title}</Title>
            <Subtitle>{cancelRide.subtitle}</Subtitle>
          </HeaderContent>

          <ChoicesScroll>
            {reasons.map((reason) => (
              <ReasonSelectorItem
                key={reason.id}
                label={reason.label}
                isSelected={selectedReasonId === reason.id}
                onPress={() => onSelectReason(reason.id)}
              />
            ))}
            
            {selectedReasonId === 'other' && (
              <OtherInput
                placeholder={cancelRide.otherReasonPlaceholder}
                value={otherReasonText}
                onChangeText={onOtherReasonTextChange}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            )}
          </ChoicesScroll>

          <ActionsContainer>
            <Button
              onPress={onConfirm}
              disabled={!selectedReasonId || (selectedReasonId === 'other' && !otherReasonText.trim())}
            >
              {cancelRide.confirmCancel}
            </Button>
            <GhostButton onPress={onDismiss} activeOpacity={0.8}>
              <GhostButtonText>{cancelRide.keepRide}</GhostButtonText>
            </GhostButton>
          </ActionsContainer>
        </BottomSheetSurface>
      </BottomSheetContainer>
    </OverlayContext>
  );
};
