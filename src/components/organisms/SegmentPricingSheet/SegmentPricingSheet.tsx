import React, { useCallback, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import {
  SegmentPricingCard,
  type SegmentPrice,
} from '@/components/molecules/SegmentPricingCard';
import { scale, verticalScale } from '@/styles';
import {
  Wrapper,
  Overlay,
  BackdropTouchable,
  Sheet,
  DragHandle,
  SheetHeader,
  SheetTitle,
  SheetSubtitle,
  ListWrapper,
  CardList,
  ButtonRow,
  CancelWrapper,
  SaveWrapper,
} from './SegmentPricingSheet.styles';
import { type StopSegment } from './utils';

export interface SegmentPricingSheetProps {
  visible: boolean;
  segments: (StopSegment & { distanceKm: number })[];
  segmentPrices: Record<string, SegmentPrice>;
  premiumEnabled: boolean;
  premiumPercentage: number;
  onClose: () => void;
  onSave: (prices: Record<string, { basePrice: number }>) => void;
  t: {
    title: string;
    subtitle: string;
    segmentLabel: string;
    minPriceLabel: string;
    maxPriceLabel: string;
    cancelButton: string;
    saveButton: string;
    frontSeatProjectedLabel: string;
  };
}

export const SegmentPricingSheet: React.FC<SegmentPricingSheetProps> = ({
  visible,
  segments,
  segmentPrices,
  premiumEnabled,
  premiumPercentage,
  onClose,
  onSave,
  t,
}) => {
  const [localPrices, setLocalPrices] = useState<Record<string, number>>({});

  React.useEffect(() => {
    if (visible) {
      const initial: Record<string, number> = {};
      Object.keys(segmentPrices).forEach(id => {
        initial[id] = segmentPrices[id].basePrice;
      });
      setLocalPrices(initial);
    }
  }, [visible, segmentPrices]);

  const handlePriceChange = useCallback((id: string, price: number) => {
    setLocalPrices(prev => ({ ...prev, [id]: price }));
  }, []);

  const handleSave = useCallback(() => {
    const final: Record<string, { basePrice: number }> = {};
    Object.keys(localPrices).forEach(id => {
      final[id] = { basePrice: localPrices[id] };
    });
    onSave(final);
    onClose();
  }, [localPrices, onSave, onClose]);

  if (!visible) return null;

  return (
    <Wrapper>
      <Overlay>
        <BackdropTouchable onPress={onClose} />

        <Sheet>
          <DragHandle />
          <SheetHeader>
            <SheetTitle>{t.title}</SheetTitle>
            <SheetSubtitle>{t.subtitle}</SheetSubtitle>
          </SheetHeader>

          <ListWrapper>
            <CardList
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingHorizontal: scale(28),
                paddingBottom: verticalScale(20),
                gap: verticalScale(14),
              }}
            >
              {segments.map((seg, i) => (
                <SegmentPricingCard
                  key={seg.id}
                  index={i}
                  from={seg.from}
                  to={seg.to}
                  segmentPrice={{
                    ...segmentPrices[seg.id],
                    basePrice:
                      localPrices[seg.id] ??
                      segmentPrices[seg.id]?.basePrice ??
                      0,
                  }}
                  onPriceChange={price => handlePriceChange(seg.id, price)}
                  segmentLabel={t.segmentLabel}
                  premiumEnabled={premiumEnabled}
                  frontSeatLabel={t.frontSeatProjectedLabel}
                  premiumPercentage={premiumPercentage}
                />
              ))}
            </CardList>
          </ListWrapper>

          <ButtonRow>
            <CancelWrapper>
              <Button variant="outline" onPress={onClose}>
                {t.cancelButton}
              </Button>
            </CancelWrapper>
            <SaveWrapper>
              <Button variant="primary" onPress={handleSave}>
                {t.saveButton}
              </Button>
            </SaveWrapper>
          </ButtonRow>
        </Sheet>
      </Overlay>
    </Wrapper>
  );
};
