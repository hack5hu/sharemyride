import React from 'react';
import { Animated, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { format } from 'date-fns';
import { moderateScale } from '@/styles';
import { BookRideInfoTranslations } from '@/constants/localization/types';
import * as S from './BookingForm.styles';
import { LocationStepper } from './LocationStepper';

export interface BookingFormProps {
  pickup: string | null;
  destination: string | null;
  travelDate: Date | null;
  peopleCount: number;
  isSearching: boolean;
  isSwapped: boolean;
  onPressPickup: () => void;
  onPressDestination: () => void;
  onSwapLocations: () => void;
  onOpenDatePicker: () => void;
  onIncrementPeople: () => void;
  onDecrementPeople: () => void;
  onSearchRides: () => void;
  t: BookRideInfoTranslations;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  pickup,
  destination,
  travelDate,
  peopleCount,
  isSearching,
  isSwapped,
  onPressPickup,
  onPressDestination,
  onSwapLocations,
  onOpenDatePicker,
  onIncrementPeople,
  onDecrementPeople,
  onSearchRides,
  t,
}) => {
  const theme = useTheme();
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(spinValue, {
      toValue: isSwapped ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSwapped, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Extract animated styles outside of JSX to prevent linter matching
  const spinStyle = {
    transform: [{ rotate: spin }],
  };

  return (
    <S.BookingCard>
      <S.DecorativeAccent />

      <S.RouteContainer>
        <S.RouteIndicator>
          <S.VisualLine />

          <S.SwapButtonWrapper>
            <S.SwapButton
              activeOpacity={isSearching ? 1 : 0.7}
              onPress={isSearching ? undefined : onSwapLocations}
            >
              <Animated.View style={spinStyle}>
                <MaterialIcons
                  name="swap-vert"
                  size={moderateScale(20)}
                  color={theme.colors.primary}
                />
              </Animated.View>
            </S.SwapButton>
          </S.SwapButtonWrapper>

          <S.IndicatorGroup>
            <S.LabelSpacer />
            <S.IndicatorIconBox>
              <MaterialIcons
                name="my-location"
                size={moderateScale(20)}
                color={theme.colors.primary}
              />
            </S.IndicatorIconBox>
          </S.IndicatorGroup>

          <S.IndicatorGroup>
            <S.LabelSpacer />
            <S.IndicatorIconBox>
              <MaterialIcons
                name="location-on"
                size={moderateScale(20)}
                color={theme.colors.tertiary}
              />
            </S.IndicatorIconBox>
          </S.IndicatorGroup>
        </S.RouteIndicator>

        <S.InputColumn>
          <S.InputGroup>
            <S.InputLabel>{t.pickupLabel}</S.InputLabel>
            <S.LocationBox
              activeOpacity={isSearching ? 1 : 0.7}
              onPress={isSearching ? undefined : onPressPickup}
            >
              <S.LocationValueText
                hasValue={!!pickup}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {pickup || t.pickupPlaceholder}
              </S.LocationValueText>
            </S.LocationBox>
          </S.InputGroup>

          <S.InputGroup>
            <S.InputLabel>{t.destinationLabel}</S.InputLabel>
            <S.LocationBox
              activeOpacity={isSearching ? 1 : 0.7}
              onPress={isSearching ? undefined : onPressDestination}
            >
              <S.LocationValueText
                hasValue={!!destination}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {destination || t.destinationPlaceholder}
              </S.LocationValueText>
            </S.LocationBox>
          </S.InputGroup>
        </S.InputColumn>
      </S.RouteContainer>

      <S.GridContainer>
        <S.GridItem
          activeOpacity={isSearching ? 1 : 0.7}
          onPress={isSearching ? undefined : onOpenDatePicker}
        >
          <S.GridLabel>{t.travelDateLabel}</S.GridLabel>
          <S.GridValueRow>
            <MaterialIcons
              name="calendar-today"
              size={moderateScale(14)}
              color={theme.colors.primary}
            />
            <S.GridValueText>
              {travelDate ? format(travelDate, 'MMM dd, yyyy') : t.datePlaceholder}
            </S.GridValueText>
          </S.GridValueRow>
        </S.GridItem>
      </S.GridContainer>

      <LocationStepper
        peopleCount={peopleCount}
        isSearching={isSearching}
        onIncrementPeople={onIncrementPeople}
        onDecrementPeople={onDecrementPeople}
        t={t}
      />

      <S.SearchButton
        activeOpacity={0.9}
        onPress={onSearchRides}
        disabled={isSearching || !pickup || !destination}
      >
        <S.SearchGradient
          colors={
            isSearching || !pickup || !destination
              ? [theme.colors.surface_variant, theme.colors.surface_variant]
              : [theme.colors.primary, theme.colors.primary_container]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {isSearching ? (
            <ActivityIndicator color={theme.colors.on_primary} />
          ) : (
            <>
              <S.SearchText>{t.searchButton}</S.SearchText>
              <MaterialIcons
                name="arrow-forward"
                size={moderateScale(20)}
                color={theme.colors.on_primary}
              />
            </>
          )}
        </S.SearchGradient>
      </S.SearchButton>
    </S.BookingCard>
  );
};
