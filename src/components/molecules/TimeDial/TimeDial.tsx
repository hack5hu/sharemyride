import React, { useRef, useCallback, useEffect } from 'react';
import {
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { moderateScale, verticalScale, responsiveFont } from '@/styles';
import styled from 'styled-components/native';

/* ---- Styles kept inline here since they are tightly scoped ---- */

const ITEM_HEIGHT = moderateScale(64);

const DialWrapper = styled.View`
  width: ${moderateScale(72)}px;
  height: ${ITEM_HEIGHT * 3}px; /* show 3 items: prev, selected, next */
  overflow: hidden;
  position: relative;
`;

const SelectorHighlight = styled.View`
  position: absolute;
  top: ${ITEM_HEIGHT}px;
  left: 0;
  right: 0;
  height: ${ITEM_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 4px;
  elevation: 2;
  z-index: 0;
  pointer-events: none;
`;

const FadeTop = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${ITEM_HEIGHT}px;
  background-color: transparent;
  z-index: 10;
  pointer-events: none;
`;

const FadeBottom = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${ITEM_HEIGHT}px;
  background-color: transparent;
  z-index: 10;
  pointer-events: none;
`;

const ItemContainer = styled.View`
  height: ${ITEM_HEIGHT}px;
  align-items: center;
  justify-content: center;
`;

export interface TimeDialProps {
  values: number[];
  selectedValue: number;
  onValueChange: (val: number) => void;
  formatter?: (val: number) => string;
  disabled?: boolean;
  disabledBefore?: number;
}

const getDistance = (index: number, selectedIndex: number) =>
  Math.abs(index - selectedIndex);

export const TimeDial: React.FC<TimeDialProps> = ({
  values,
  selectedValue,
  onValueChange,
  formatter = (v) => String(v).padStart(2, '0'),
  disabled = false,
  disabledBefore,
}) => {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const selectedIndex = values.indexOf(selectedValue);

  useEffect(() => {
    if (scrollRef.current && selectedIndex >= 0) {
      scrollRef.current.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, []);

  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = e.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ITEM_HEIGHT);
      let clamped = Math.max(0, Math.min(index, values.length - 1));

      // Enforce the disabledBefore boundary: if the user scrolls onto a disabled value,
      // snap them back to the first available valid value.
      if (disabledBefore !== undefined && values[clamped] < disabledBefore) {
        const firstValidIndex = values.findIndex(v => v >= disabledBefore);
        if (firstValidIndex !== -1) {
          clamped = firstValidIndex;
        }
      }

      onValueChange(values[clamped]);
      scrollRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true });
    },
    [values, onValueChange, disabledBefore]
  );

  const getColor = (dist: number, isDisabledItem: boolean) => {
    if (isDisabledItem) return `${theme.colors.outline_variant}4D`;
    if (dist === 0) return theme.colors.primary;
    if (dist === 1) return `${theme.colors.on_surface_variant}99`;
    return `${theme.colors.on_surface_variant}66`;
  };

  const getFontSize = (dist: number) => {
    if (dist === 0) return responsiveFont(36);
    if (dist === 1) return responsiveFont(28);
    return responsiveFont(22);
  };

  return (
    <DialWrapper>
      <SelectorHighlight pointerEvents="none" />
      <FadeTop pointerEvents="none" />
      <FadeBottom pointerEvents="none" />
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!disabled}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
        nestedScrollEnabled
      >
        {values.map((val, i) => {
          const dist = getDistance(i, selectedIndex);
          const isDisabledItem = disabledBefore !== undefined && val < disabledBefore;
          return (
            <ItemContainer key={val}>
              <Text
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  fontWeight: dist === 0 ? '800' : '700',
                  fontSize: getFontSize(dist),
                  color: getColor(dist, isDisabledItem),
                }}
              >
                {formatter(val)}
              </Text>
            </ItemContainer>
          );
        })}
      </ScrollView>
    </DialWrapper>
  );
};
