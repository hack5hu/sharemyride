import React, { useCallback, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { SegmentPricingCard, SegmentPrice } from '@/components/molecules/SegmentPricingCard';
import { StopSegment } from './utils';

/* ──── Styles ──── */
import { PricingTier } from '@/constants/pricing';

/* ──── Styles ──── */
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(23, 29, 25, 0.4);
  justify-content: flex-end;
`;

const Sheet = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-left-radius: ${moderateScale(40)}px;
  border-top-right-radius: ${moderateScale(40)}px;
  max-height: 88%;
  padding-bottom: ${verticalScale(40)}px;
`;

const DragHandle = styled.View`
  width: ${scale(48)}px;
  height: ${moderateScale(5)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  border-radius: 9999px;
  align-self: center;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

const SheetHeader = styled.View`
  padding-horizontal: ${scale(28)}px;
  padding-top: ${verticalScale(12)}px;
  padding-bottom: ${verticalScale(16)}px;
`;

const SheetTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

const SheetSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.outline};
  margin-top: ${verticalScale(2)}px;
`;

const CardList = styled.ScrollView`
  flex-grow: 1;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: ${scale(10)}px;
  padding-horizontal: ${scale(28)}px;
  padding-vertical: ${verticalScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const CancelButton = styled.TouchableOpacity`
  flex: 1;
  padding-vertical: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
`;

const CancelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const SaveButton = styled.TouchableOpacity`
  flex: 2;
  border-radius: ${moderateScale(12)}px;
  overflow: hidden;
`;

const SaveGradient = styled(LinearGradient)`
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 16px;
  elevation: 4;
`;

const SaveText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

/* ──── Component ──── */
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
  const theme = useTheme();
  
  // localPrices tracks basePrice for each segment
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
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 999, elevation: 999 }}>
      <Overlay>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        </TouchableWithoutFeedback>

        <Sheet>
          <DragHandle />
          <SheetHeader>
            <SheetTitle>{t.title}</SheetTitle>
            <SheetSubtitle>{t.subtitle}</SheetSubtitle>
          </SheetHeader>

          <View style={{ maxHeight: verticalScale(500) }}>
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
                    basePrice: localPrices[seg.id] ?? segmentPrices[seg.id]?.basePrice ?? 0
                  }}
                  onPriceChange={(price) => handlePriceChange(seg.id, price)}
                  segmentLabel={t.segmentLabel}
                  premiumEnabled={premiumEnabled}
                  frontSeatLabel={t.frontSeatProjectedLabel}
                  premiumPercentage={premiumPercentage}
                />
              ))}
            </CardList>
          </View>

          <ButtonRow>
            <CancelButton onPress={onClose} activeOpacity={0.8}>
              <CancelText>{t.cancelButton}</CancelText>
            </CancelButton>
            <SaveButton onPress={handleSave} activeOpacity={0.9}>
              <SaveGradient
                colors={[theme.colors.primary, theme.colors.primary_container]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <SaveText>{t.saveButton}</SaveText>
              </SaveGradient>
            </SaveButton>
          </ButtonRow>
        </Sheet>
      </Overlay>
    </View>
  );
};
