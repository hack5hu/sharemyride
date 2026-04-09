import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import { useTheme } from 'styled-components/native';
import { format } from 'date-fns';
import { moderateScale } from '@/styles';
import { BottomNav } from '@/components/organisms/BottomNav';
import { useBookRideInfo } from './useBookRideInfo';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import {
  ScrollContent,
  Header,
  HeaderTitle,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  BookingCard,
  DecorativeAccent,
  RouteContainer,
  RouteIndicator,
  IndicatorLine,
  InputColumn,
  InputGroup,
  InputLabel,
  LocationBox,
  LocationValueText,
  GridContainer,
  GridItem,
  GridLabel,
  GridValueRow,
  GridValueText,
  StepperContainer,
  StepperLabelGroup,
  StepperLabel,
  StepperSub,
  StepperControls,
  StepperButton,
  StepperValue,
  SearchButton,
  SearchGradient,
  SearchText,
  SectionContainer,
  SectionHeader,
  SectionTitle,
  ClearButtonText,
  RecentItem,
  RecentLeft,
  RecentIconBox,
  RecentContent,
  RecentTitle,
  RecentSub,
  TrustBanner,
  TrustIconWrapper,
  TrustContent,
  TrustTitleText,
  TrustDescText,
} from './BookRideInfo.styles';

export const BookRideInfoScreen: React.FC = () => {
  const theme = useTheme();
  const {
    pickup,
    destination,
    travelDate,
    isDatePickerOpen,
    peopleCount,
    handlePressPickup,
    handlePressDestination,
    handleOpenDatePicker,
    handleCloseDatePicker,
    handleDateConfirm,
    incrementPeople,
    decrementPeople,
    handleSearchRides,
    t,
  } = useBookRideInfo();

  return (
    <ScreenShell title={t.heroTitle}>
      <ScrollContent showsVerticalScrollIndicator={false}>
        <Header>
          <HeaderTitle>Ride Pool Company</HeaderTitle>
        </Header>

        <HeroSection>
          <HeroTitle>{t.heroTitle}</HeroTitle>
          <HeroSubtitle>{t.heroSubtitle}</HeroSubtitle>
        </HeroSection>

        <BookingCard>
          <DecorativeAccent />

          <RouteContainer>
            <RouteIndicator>
              <MaterialIcons name="my-location" size={moderateScale(20)} color={theme.colors.primary} />
              <IndicatorLine />
              <MaterialIcons name="location-on" size={moderateScale(20)} color={theme.colors.tertiary} />
            </RouteIndicator>

            <InputColumn>
              <InputGroup>
                <InputLabel>{t.pickupLabel}</InputLabel>
                <LocationBox activeOpacity={0.7} onPress={handlePressPickup}>
                  <LocationValueText hasValue={!!pickup}>
                    {pickup || t.pickupPlaceholder}
                  </LocationValueText>
                </LocationBox>
              </InputGroup>

              <InputGroup>
                <InputLabel>{t.destinationLabel}</InputLabel>
                <LocationBox activeOpacity={0.7} onPress={handlePressDestination}>
                  <LocationValueText hasValue={!!destination}>
                    {destination || t.destinationPlaceholder}
                  </LocationValueText>
                </LocationBox>
              </InputGroup>
            </InputColumn>
          </RouteContainer>

          <GridContainer>
            <GridItem activeOpacity={0.7} onPress={handleOpenDatePicker}>
              <GridLabel>{t.travelDateLabel}</GridLabel>
              <GridValueRow>
                <MaterialIcons name="calendar-today" size={moderateScale(14)} color={theme.colors.primary} />
                <GridValueText>{format(travelDate, 'MMM dd, yyyy')}</GridValueText>
              </GridValueRow>
            </GridItem>
          </GridContainer>

          <StepperContainer>
            <StepperLabelGroup>
              <StepperLabel>{t.peopleCountLabel}</StepperLabel>
              <StepperSub>{t.peopleCountSub}</StepperSub>
            </StepperLabelGroup>

            <StepperControls>
              <StepperButton activeOpacity={0.7} onPress={decrementPeople}>
                <MaterialIcons name="remove" size={moderateScale(18)} color={theme.colors.primary} />
              </StepperButton>
              <StepperValue>{peopleCount}</StepperValue>
              <StepperButton primary activeOpacity={0.7} onPress={incrementPeople}>
                <MaterialIcons name="add" size={moderateScale(18)} color={theme.colors.on_primary} />
              </StepperButton>
            </StepperControls>
          </StepperContainer>

          <SearchButton activeOpacity={0.9} onPress={handleSearchRides}>
            <SearchGradient
              colors={[theme.colors.primary, theme.colors.primary_container]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <SearchText>{t.searchButton}</SearchText>
              <MaterialIcons name="arrow-forward" size={moderateScale(20)} color={theme.colors.on_primary} />
            </SearchGradient>
          </SearchButton>
        </BookingCard>

        {/* Recent Searches */}
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>{t.recentSearchesTitle}</SectionTitle>
            <ClearButtonText>{t.clearAll}</ClearButtonText>
          </SectionHeader>

          <RecentItem activeOpacity={0.7}>
            <RecentLeft>
              <RecentIconBox>
                <MaterialIcons name="work" size={moderateScale(24)} color={theme.colors.primary} />
              </RecentIconBox>
              <RecentContent>
                <RecentTitle>Home to Office</RecentTitle>
                <RecentSub>Nov 22, 2023 • 2 People</RecentSub>
              </RecentContent>
            </RecentLeft>
            <MaterialIcons name="history" size={moderateScale(20)} color={theme.colors.outline_variant} />
          </RecentItem>

          <RecentItem activeOpacity={0.7}>
            <RecentLeft>
              <RecentIconBox>
                <MaterialIcons name="fitness-center" size={moderateScale(24)} color={theme.colors.tertiary} />
              </RecentIconBox>
              <RecentContent>
                <RecentTitle>Gym to Mall</RecentTitle>
                <RecentSub>Nov 20, 2023 • 1 Person</RecentSub>
              </RecentContent>
            </RecentLeft>
            <MaterialIcons name="history" size={moderateScale(20)} color={theme.colors.outline_variant} />
          </RecentItem>
        </SectionContainer>

        {/* Safety Section */}
        <TrustBanner>
          <TrustIconWrapper>
            <MaterialIcons name="verified-user" size={moderateScale(18)} color="#FFFFFF" />
          </TrustIconWrapper>
          <TrustContent>
            <TrustTitleText>{t.trustTitle}</TrustTitleText>
            <TrustDescText>{t.trustDescription}</TrustDescText>
          </TrustContent>
        </TrustBanner>
      </ScrollContent>

      <DatePicker
        modal
        open={isDatePickerOpen}
        date={travelDate}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleCloseDatePicker}
        buttonColor={theme.colors.primary}
        dividerColor={theme.colors.primary}
      />

      <BottomNav activeTab="BOOK" />
    </ScreenShell>
  );
};
