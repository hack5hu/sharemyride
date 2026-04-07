import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  Container,
  BackgroundContainer,
  BlobTopLeft,
  BlobBottomRight,
  Header,
  HeaderLeft,
  BackButton,
  HeaderTitle,
  SaveButton,
  SaveText,
  Content,
  TitleSection,
  PageTitle,
  PageSubtitle,
  GlassCard,
  RouteHeaderRow,
  RouteLayout,
  TimelineLine,
  TimelineDotOutline,
  TimelineTrack,
  TimelineDotEnd,
  RouteDetailsStack,
  RouteStop,
  StopLabel,
  StopLocation,
  StopTime,
  EditButton,
  GridRow,
  GridCard,
  GridCardHeader,
  GridCardLabel,
  GridCardValue,
  GridCardSub,
  PrefHeader,
  PrefLabel,
  BadgeRow,
  PrefBadge,
  PrefBadgeText,
  FloatingFooter,
  FooterGradient,
  PublishButton,
  PublishGradient,
  PublishText,
  TermsText,
  TermsLink,
} from './SummaryPublish.styles';

export const SummaryPublishScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { summaryPublish: t } = useLocale();

  const handleBackPress = () => navigation.goBack();
  const handleSave = () => {
    // Save draft logic
  };
  const handlePublish = () => {
    navigation.navigate('PublishSuccess' as any);
  };

  return (
    <Container edges={['top']}>
      {/* Aesthetic Background */}
      <BackgroundContainer pointerEvents="none">
        <BlobTopLeft />
        <BlobBottomRight />
      </BackgroundContainer>

      {/* Header */}
      <Header>
        <HeaderLeft>
          <BackButton onPress={handleBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.on_surface} />
          </BackButton>
          <HeaderTitle>{t.headerTitle}</HeaderTitle>
        </HeaderLeft>
        <SaveButton onPress={handleSave} activeOpacity={0.7}>
          <SaveText>Save</SaveText>
        </SaveButton>
      </Header>

      <Content>
        <TitleSection>
          <PageTitle>{t.title}</PageTitle>
          <PageSubtitle>{t.subtitle}</PageSubtitle>
        </TitleSection>

        {/* Route Summary Card */}
        <GlassCard>
          <RouteHeaderRow>
            <RouteLayout>
              <TimelineLine>
                <TimelineDotOutline />
                <TimelineTrack colors={[theme.colors.primary, theme.colors.secondary_container]} />
                <TimelineDotEnd />
              </TimelineLine>

              <RouteDetailsStack>
                <RouteStop>
                  <StopLabel>{t.departureLabel}</StopLabel>
                  <StopLocation>San Francisco, CA</StopLocation>
                  <StopTime>08:30 AM, Tomorrow</StopTime>
                </RouteStop>
                <RouteStop>
                  <StopLabel>{t.arrivalLabel}</StopLabel>
                  <StopLocation>Los Angeles, CA</StopLocation>
                  <StopTime>02:15 PM, Tomorrow</StopTime>
                </RouteStop>
              </RouteDetailsStack>
            </RouteLayout>
            <EditButton activeOpacity={0.7}>
              <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.primary} />
            </EditButton>
          </RouteHeaderRow>
        </GlassCard>

        {/* Grid Layout properties */}
        <GridRow>
          {/* Vehicle */}
          <GridCard>
            <GridCardHeader>
              <MaterialIcons name="directions-car" size={moderateScale(20)} color={theme.colors.primary} />
              <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.on_surface_variant} />
            </GridCardHeader>
            <GridCardLabel>{t.vehicleLabel}</GridCardLabel>
            <GridCardValue>Tesla Model 3</GridCardValue>
            <GridCardSub>White • KMP-291</GridCardSub>
          </GridCard>

          {/* Availability */}
          <GridCard>
            <GridCardHeader>
              <MaterialIcons name="group" size={moderateScale(20)} color={theme.colors.primary} />
              <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.on_surface_variant} />
            </GridCardHeader>
            <GridCardLabel>{t.availabilityLabel}</GridCardLabel>
            <GridCardValue>3 Seats</GridCardValue>
            <GridCardSub>$42.00 per seat</GridCardSub>
          </GridCard>
        </GridRow>

        {/* Preferences */}
        <GlassCard>
          <PrefHeader>
            <PrefLabel>{t.ridePreferencesLabel}</PrefLabel>
            <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.on_surface_variant} />
          </PrefHeader>
          <BadgeRow>
            <PrefBadge>
              <MaterialIcons name="smoke-free" size={moderateScale(16)} color={theme.colors.primary} />
              <PrefBadgeText>{t.noSmoking}</PrefBadgeText>
            </PrefBadge>
            <PrefBadge>
              <MaterialIcons name="pets" size={moderateScale(16)} color={theme.colors.primary} />
              <PrefBadgeText>{t.petsAllowed}</PrefBadgeText>
            </PrefBadge>
            <PrefBadge>
              <MaterialIcons name="music-note" size={moderateScale(16)} color={theme.colors.primary} />
              <PrefBadgeText>{t.chillMusic}</PrefBadgeText>
            </PrefBadge>
          </BadgeRow>
        </GlassCard>
      </Content>

      <FloatingFooter pointerEvents="box-none">
        <FooterGradient
          colors={['transparent', theme.colors.surface, theme.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
        />
        <PublishButton onPress={handlePublish} activeOpacity={0.9}>
          <PublishGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <PublishText>{t.publishRideButton}</PublishText>
          </PublishGradient>
        </PublishButton>
        <TermsText>
          {t.termsText1}
          <TermsLink>{t.termsLink}</TermsLink>
          {t.termsText2}
        </TermsText>
      </FloatingFooter>
    </Container>
  );
};
