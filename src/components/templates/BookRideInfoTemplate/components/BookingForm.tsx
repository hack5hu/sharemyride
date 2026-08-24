import React from 'react';
import { Animated, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { format } from 'date-fns';
import { moderateScale } from '@/styles';
import { formatDisplayAddress } from '@/utils/address';
import { BookingFormProps } from '../types.d';
import * as S from './BookingForm.styles';

export const BookingForm: React.FC<BookingFormProps> = ({
  pickup,
  destination,
  travelDate,
  peopleCount,
  radiusKm,
  isSearching,
  isSwapped,
  onPressPickup,
  onPressDestination,
  onSwapLocations,
  onOpenDatePicker,
  onIncrementPeople,
  onDecrementPeople,
  onIncrementRadius,
  onDecrementRadius,
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

  const formattedPickup = pickup
    ? formatDisplayAddress(pickup)
    : t.pickupPlaceholder;
  const formattedDestination = destination
    ? formatDisplayAddress(destination)
    : t.destinationPlaceholder;
  const formattedDate = travelDate
    ? format(travelDate, 'EEE, dd MMM yyyy')
    : t.datePlaceholder;
  const formattedPassengers = `${peopleCount} ${
    peopleCount === 1 ? 'passenger' : 'passengers'
  }`;

  return (
    <S.BookingCard>
      <S.FormBody>
        {/* From (Pickup) */}
        <S.FormRow
          activeOpacity={isSearching ? 1 : 0.7}
          onPress={isSearching ? undefined : onPressPickup}
        >
          <S.RowHeader>{t.pickupLabel}</S.RowHeader>
          <S.RowMain>
            <S.RowText $hasValue={!!pickup} numberOfLines={2}>
              {formattedPickup}
            </S.RowText>
            <S.SwapButton
              activeOpacity={isSearching ? 1 : 0.7}
              onPress={isSearching ? undefined : onSwapLocations}
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialIcons
                  name="swap-vert"
                  size={moderateScale(20)}
                  color={theme.colors.primary}
                />
              </Animated.View>
            </S.SwapButton>
          </S.RowMain>
        </S.FormRow>

        <S.Divider />

        {/* To (Destination) */}
        <S.FormRow
          activeOpacity={isSearching ? 1 : 0.7}
          onPress={isSearching ? undefined : onPressDestination}
        >
          <S.RowHeader>{t.destinationLabel}</S.RowHeader>
          <S.RowMain>
            <S.RowText $hasValue={!!destination} numberOfLines={2}>
              {formattedDestination}
            </S.RowText>
          </S.RowMain>
        </S.FormRow>

        <S.Divider />

        {/* Departure Date */}
        <S.FormRow
          activeOpacity={isSearching ? 1 : 0.7}
          onPress={isSearching ? undefined : onOpenDatePicker}
        >
          <S.RowHeader>{t.travelDateLabel}</S.RowHeader>
          <S.RowMain>
            <S.RowText $hasValue={!!travelDate} numberOfLines={1}>
              {formattedDate}
            </S.RowText>
          </S.RowMain>
        </S.FormRow>

        <S.Divider />

        {/* Passengers */}
        <S.FormRow>
          <S.RowHeader>{t.peopleCountLabel}</S.RowHeader>
          <S.RowMain>
            <S.RowText $hasValue numberOfLines={1}>
              {formattedPassengers}
            </S.RowText>
            <S.StepperRow>
              <S.StepperBtn
                $disabled={isSearching || peopleCount <= 1}
                onPress={isSearching ? undefined : onDecrementPeople}
              >
                <MaterialIcons
                  name="remove"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
              </S.StepperBtn>
              <S.StepperBtn
                $disabled={isSearching || peopleCount >= 6}
                onPress={isSearching ? undefined : onIncrementPeople}
              >
                <MaterialIcons
                  name="add"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
              </S.StepperBtn>
            </S.StepperRow>
          </S.RowMain>
        </S.FormRow>

        <S.Divider />

        {/* Search Radius */}
        <S.FormRow>
          <S.RowHeader>{t.searchRadiusLabel}</S.RowHeader>
          <S.RowMain>
            <S.RowText $hasValue numberOfLines={1}>
              {radiusKm} {t.searchRadiusUnit}
            </S.RowText>
            <S.StepperRow>
              <S.StepperBtn
                $disabled={isSearching || radiusKm <= 1}
                onPress={isSearching ? undefined : onDecrementRadius}
              >
                <MaterialIcons
                  name="remove"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
              </S.StepperBtn>
              <S.StepperBtn
                $disabled={isSearching || radiusKm >= 50}
                onPress={isSearching ? undefined : onIncrementRadius}
              >
                <MaterialIcons
                  name="add"
                  size={moderateScale(16)}
                  color={theme.colors.primary}
                />
              </S.StepperBtn>
            </S.StepperRow>
          </S.RowMain>
        </S.FormRow>
      </S.FormBody>

      {/* Search CTA */}
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
            <S.SearchText>{t.searchButton}</S.SearchText>
          )}
        </S.SearchGradient>
      </S.SearchButton>
    </S.BookingCard>
  );
};
