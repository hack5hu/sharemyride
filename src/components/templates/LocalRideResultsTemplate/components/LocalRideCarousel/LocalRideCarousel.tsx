import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef, useEffect } from 'react';
import { type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from '@/constants/localization';
import { moderateScale, scale } from '@/styles';
import { LocalRideCard } from '../LocalRideCard';
import { type LocalRideItemData } from '../LocalRideCard/types.d';
import * as S from './LocalRideCarousel.styles';
import { type LocalRideCarouselProps } from './types.d';

export const LocalRideCarousel: React.FC<LocalRideCarouselProps> = React.memo(
  ({
    rides,
    selectedRideId,
    onSelectRide,
    onPressDetails,
    onRequestPartner,
    bottomInset,
  }) => {
    const theme = useTheme();
    const { localRideResults: t } = useLocale();
    const listRef = useRef<FlashList<LocalRideItemData>>(null);
    const itemWidth = scale(312);
    const lastReportedId = useRef<string | null>(selectedRideId);

    useEffect(() => {
      if (
        listRef.current &&
        selectedRideId &&
        selectedRideId !== lastReportedId.current
      ) {
        const index = rides.findIndex(r => r.id === selectedRideId);
        if (index >= 0) {
          listRef.current.scrollToIndex({ index, animated: true });
        }
        lastReportedId.current = selectedRideId;
      }
    }, [selectedRideId, rides]);

    const handleScrollEnd = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / itemWidth);
        const clamped = Math.max(0, Math.min(index, rides.length - 1));
        const snappedRide = rides[clamped];
        if (snappedRide && snappedRide.id !== selectedRideId) {
          lastReportedId.current = snappedRide.id;
          onSelectRide(snappedRide.id);
        }
      },
      [itemWidth, rides, selectedRideId, onSelectRide],
    );

    const handleScrollEndDrag = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const velocity = e.nativeEvent.velocity?.x ?? 0;
        if (Math.abs(velocity) < 0.05) {
          handleScrollEnd(e);
        }
      },
      [handleScrollEnd],
    );

    const renderRideItem = useCallback(
      ({ item }: { item: LocalRideItemData }) => (
        <LocalRideCard
          ride={item}
          isSelected={item.id === selectedRideId}
          onSelect={onSelectRide}
          onPressDetails={onPressDetails}
        />
      ),
      [selectedRideId, onSelectRide, onPressDetails],
    );

    const keyExtractor = useCallback(
      (item: LocalRideItemData) => item.id,
      [],
    );

    if (rides.length === 0) {
      return (
        <S.CarouselWrapper bottomInset={bottomInset} pointerEvents="box-none">
          <S.EmptyCard>
            <S.EmptyIconCircle>
              <MaterialIcons
                name="directions-car"
                size={moderateScale(24)}
                color={theme.colors.on_surface_variant}
              />
            </S.EmptyIconCircle>
            <S.EmptyTextContainer>
              <Typography
                variant="title"
                size="md"
                weight="bold"
                color={theme.colors.on_surface}
              >
                {t.noRidesFound}
              </Typography>
              <S.EmptySubtitleContainer>
                <Typography
                  variant="body"
                  size="sm"
                  color={theme.colors.on_surface_variant}
                  align="center"
                >
                  {t.noRidesSub}
                </Typography>
              </S.EmptySubtitleContainer>
            </S.EmptyTextContainer>
            {onRequestPartner && (
              <Button variant="primary" onPress={onRequestPartner}>
                {t.requestLocalPartner}
              </Button>
            )}
          </S.EmptyCard>
        </S.CarouselWrapper>
      );
    }

    return (
      <S.CarouselWrapper bottomInset={bottomInset} pointerEvents="box-none">
        <FlashList
          ref={listRef}
          data={rides}
          renderItem={renderRideItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          decelerationRate="fast"
          snapToAlignment="start"
          onMomentumScrollEnd={handleScrollEnd}
          onScrollEndDrag={handleScrollEndDrag}
          contentContainerStyle={{
            paddingLeft: scale(16),
            paddingRight: scale(16),
          }}
        />
      </S.CarouselWrapper>
    );
  },
);

LocalRideCarousel.displayName = 'LocalRideCarousel';
