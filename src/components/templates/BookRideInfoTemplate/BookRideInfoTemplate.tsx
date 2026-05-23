import React from 'react';
import { ActivityIndicator, Animated } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { format } from 'date-fns';
import { moderateScale, verticalScale } from '@/styles';
import { BottomNav } from '@/components/organisms/BottomNav';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { RideTypeToggle } from '@/components/molecules/RideTypeToggle';
import { BookRideInfoTemplateProps } from './types.d';
import * as S from './BookRideInfoTemplate.styles';
import { RecentSearch } from '@/store/useBookRideStore';

export const BookRideInfoTemplate: React.FC<BookRideInfoTemplateProps> = React.memo(({
  pickup,
  destination,
  travelDate,
  peopleCount,
  isSearching,
  isSwapped,
  recentSearches,
  onPressPickup,
  onPressDestination,
  onSwapLocations,
  onOpenDatePicker,
  onIncrementPeople,
  onDecrementPeople,
  onSearchRides,
  onSelectRecentSearch,
  onClearRecentSearches,
  t,
  rideType,
  onSetRideType,
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

  return (
    <ScreenShell>
      <FlashList
        data={recentSearches}
        keyExtractor={(item: RecentSearch) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: verticalScale(120),
        }}
        renderItem={({ item }: { item: RecentSearch }) => (
          <S.RecentItemContainer>
            <S.RecentItem 
              activeOpacity={0.7} 
              onPress={() => onSelectRecentSearch(item)}
            >
              <S.RecentLeft>
                <S.RecentIconBox>
                  <MaterialIcons name="history" size={moderateScale(24)} color={theme.colors.primary} />
                </S.RecentIconBox>
                <S.RecentContent>
                  <S.RecentTitle numberOfLines={1}>
                    {item.startLocation.address.split(',')[0]} to {item.destinationLocation.address.split(',')[0]}
                  </S.RecentTitle>
                  <S.RecentSub>
                    {format(new Date(item.travelDate), 'MMM dd, yyyy')} • {item.seatCount} {item.seatCount === 1 ? 'Person' : 'People'}
                  </S.RecentSub>
                </S.RecentContent>
              </S.RecentLeft>
              <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.outline_variant} />
            </S.RecentItem>
          </S.RecentItemContainer>
        )}
        ListHeaderComponent={
          <>
            <S.Header>
              <S.HeaderTitle>{t.brandName}</S.HeaderTitle>
            </S.Header>

            <S.HeroSection>
              <S.HeroTitle>{t.heroTitle}</S.HeroTitle>
              <S.HeroSubtitle>{t.heroSubtitle}</S.HeroSubtitle>
            </S.HeroSection>

            {/* <S.ToggleWrapper>
              <RideTypeToggle
                selected={rideType}
                onSelect={onSetRideType}
                localLabel={t.local}
                intercityLabel={t.intercity}
              />
            </S.ToggleWrapper> */}

            <S.BookingCard>
              <S.DecorativeAccent />

              <S.RouteContainer>
                <S.RouteIndicator>
                  <S.VisualLine />
                  
                  <S.SwapButtonWrapper>
                    <S.SwapButton activeOpacity={0.7} onPress={onSwapLocations}>
                      <Animated.View style={{ transform: [{ rotate: spin }] }}>
                        <MaterialIcons name="swap-vert" size={moderateScale(20)} color={theme.colors.primary} />
                      </Animated.View>
                    </S.SwapButton>
                  </S.SwapButtonWrapper>

                  <S.IndicatorGroup>
                    <S.LabelSpacer />
                    <S.IndicatorIconBox>
                      <MaterialIcons name="my-location" size={moderateScale(20)} color={theme.colors.primary} />
                    </S.IndicatorIconBox>
                  </S.IndicatorGroup>

                  <S.IndicatorGroup>
                    <S.LabelSpacer />
                    <S.IndicatorIconBox>
                      <MaterialIcons name="location-on" size={moderateScale(20)} color={theme.colors.tertiary} />
                    </S.IndicatorIconBox>
                  </S.IndicatorGroup>
                </S.RouteIndicator>

                <S.InputColumn>
                  <S.InputGroup>
                    <S.InputLabel>{t.pickupLabel}</S.InputLabel>
                    <S.LocationBox activeOpacity={0.7} onPress={onPressPickup}>
                      <S.LocationValueText hasValue={!!pickup} numberOfLines={1} ellipsizeMode='tail'>
                        {pickup || t.pickupPlaceholder}
                      </S.LocationValueText>
                    </S.LocationBox>
                  </S.InputGroup>

                  <S.InputGroup>
                    <S.InputLabel>{t.destinationLabel}</S.InputLabel>
                    <S.LocationBox activeOpacity={0.7} onPress={onPressDestination}>
                      <S.LocationValueText hasValue={!!destination} numberOfLines={1} ellipsizeMode='tail'>
                        {destination || t.destinationPlaceholder}
                      </S.LocationValueText>
                    </S.LocationBox>
                  </S.InputGroup>
                </S.InputColumn>
              </S.RouteContainer>

              <S.GridContainer>
                <S.GridItem activeOpacity={0.7} onPress={onOpenDatePicker}>
                  <S.GridLabel>{t.travelDateLabel}</S.GridLabel>
                  <S.GridValueRow>
                    <MaterialIcons name="calendar-today" size={moderateScale(14)} color={theme.colors.primary} />
                    <S.GridValueText>
                      {travelDate ? format(travelDate, 'MMM dd, yyyy') : t.datePlaceholder}
                    </S.GridValueText>
                  </S.GridValueRow>
                </S.GridItem>
              </S.GridContainer>

              <S.StepperContainer>
                <S.StepperLabelGroup>
                  <S.StepperLabel>{t.peopleCountLabel}</S.StepperLabel>
                  <S.StepperSub numberOfLines={2}>{t.peopleCountSub}</S.StepperSub>
                </S.StepperLabelGroup>

                <S.StepperControls>
                  <S.StepperButton activeOpacity={0.7} onPress={onDecrementPeople} disabled={peopleCount <= 1}>
                    <MaterialIcons name="remove" size={moderateScale(18)} color={peopleCount <= 1 ? theme.colors.outline : theme.colors.primary} />
                  </S.StepperButton>
                  <S.StepperValue>{peopleCount}</S.StepperValue>
                  <S.StepperButton primary activeOpacity={0.7} onPress={onIncrementPeople} disabled={peopleCount >= 6}>
                    <MaterialIcons name="add" size={moderateScale(18)} color={peopleCount >= 6 ? theme.colors.outline : theme.colors.on_primary} />
                  </S.StepperButton>
                </S.StepperControls>
              </S.StepperContainer>

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
                      <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
                    </>
                  )}
                </S.SearchGradient>
              </S.SearchButton>
            </S.BookingCard>

            {recentSearches.length > 0 && (
              <S.SectionContainer>
                <S.RecentSearchesHeader>
                  <S.SectionTitle>{t.recentSearchesTitle}</S.SectionTitle>
                  <S.ClearButtonText onPress={onClearRecentSearches}>{t.clearAll}</S.ClearButtonText>
                </S.RecentSearchesHeader>
              </S.SectionContainer>
            )}
          </>
        }
      />

      <BottomNav activeTab="BOOK" />
    </ScreenShell>
  );
});
