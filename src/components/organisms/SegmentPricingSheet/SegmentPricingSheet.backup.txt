import React, { useCallback, useState } from 'react';
import {
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { SegmentPricingCard, SegmentPrice } from '@/components/molecules/SegmentPricingCard';

/* ──── Types ──── */
export interface StopSegment {
  id: string;
  from: string;
  to: string;
}

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
  overflow: hidden;
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

const CardList = styled.ScrollView``;

const ButtonRow = styled.View`
  flex-direction: row;
  gap: ${scale(10)}px;
  padding-horizontal: ${scale(28)}px;
  padding-vertical: ${verticalScale(20)}px;
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

/* ──── Helper: build segments from stops list ──── */
export const buildSegments = (
  start: string,
  stops: Array<{ id: string; name: string }>,
  destination: string
): StopSegment[] => {
  const points = [start, ...stops.map((s) => s.name), destination];
  return points.slice(0, -1).map((from, i) => ({
    id: `seg-${i}`,
    from,
    to: points[i + 1],
  }));
};

/* ──── Component ──── */
export interface SegmentPricingSheetProps {
  visible: boolean;
  segments: StopSegment[];
  basePrice: number;
  premiumEnabled: boolean;
  onClose: () => void;
  onSave: (prices: Record<string, SegmentPrice>) => void;
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

const buildDefaults = (
  segments: StopSegment[],
  base: number
): Record<string, SegmentPrice> => {
  const result: Record<string, SegmentPrice> = {};
  segments.forEach((seg) => {
    result[seg.id] = {
      segmentId: seg.id,
      min: Math.round(base * 0.4),
      max: Math.round(base * 0.7),
    };
  });
  return result;
};

export const SegmentPricingSheet: React.FC<SegmentPricingSheetProps> = ({
  visible,
  segments,
  basePrice,
  premiumEnabled,
  onClose,
  onSave,
  t,
}) => {
  const theme = useTheme();
  const [prices, setPrices] = useState<Record<string, SegmentPrice>>({});

  // Sync internal state when opened or segments change
  React.useEffect(() => {
    if (visible) {
      setPrices(buildDefaults(segments, basePrice));
    }
  }, [visible, segments, basePrice]);

  const handleChange = useCallback((updated: SegmentPrice) => {
    setPrices((prev) => ({ ...prev, [updated.segmentId]: updated }));
  }, []);

  const handleSave = useCallback(() => {
    onSave(prices);
    onClose();
  }, [prices, onSave, onClose]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Overlay>
          {/* Main backdrop button to close */}
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
          </TouchableWithoutFeedback>

          <Sheet>
            <DragHandle />
            <SheetHeader>
              <SheetTitle>{t.title}</SheetTitle>
              <SheetSubtitle>{t.subtitle}</SheetSubtitle>
            </SheetHeader>

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
                  segmentPrice={prices[seg.id] ?? { segmentId: seg.id, min: 0, max: 0 }}
                  onChange={handleChange}
                  segmentLabel={t.segmentLabel}
                  minLabel={t.minPriceLabel}
                  maxLabel={t.maxPriceLabel}
                  premiumEnabled={premiumEnabled}
                  basePrice={basePrice}
                  frontSeatLabel={t.frontSeatProjectedLabel}
                />
              ))}
            </CardList>

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
      </KeyboardAvoidingView>
    </Modal>
  );
};
