import React from 'react';
import { ActivityIndicator } from 'react-native';
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
  recentSearches,
  onPressPickup,
  onPressDestination,
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

  return (
    <ScreenShell>
      <FlashList
        data={recentSearches}
        keyExtractor={(item: RecentSearch) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: verticalScale(120),
        }}
        estimatedItemSize={80}
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

            <S.ToggleWrapper>
              <RideTypeToggle
                selected={rideType}
                onSelect={onSetRideType}
                localLabel={t.local}
                intercityLabel={t.intercity}
              />
            </S.ToggleWrapper>

            <S.BookingCard>
              <S.DecorativeAccent />

              <S.RouteContainer>
                <S.RouteIndicator>
                  <MaterialIcons name="my-location" size={moderateScale(20)} color={theme.colors.primary} />
                  <S.IndicatorLine />
                  <MaterialIcons name="location-on" size={moderateScale(20)} color={theme.colors.tertiary} />
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
                  <S.StepperButton activeOpacity={0.7} onPress={onDecrementPeople}>
                    <MaterialIcons name="remove" size={moderateScale(18)} color={theme.colors.primary} />
                  </S.StepperButton>
                  <S.StepperValue>{peopleCount}</S.StepperValue>
                  <S.StepperButton primary activeOpacity={0.7} onPress={onIncrementPeople}>
                    <MaterialIcons name="add" size={moderateScale(18)} color={theme.colors.on_primary} />
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
