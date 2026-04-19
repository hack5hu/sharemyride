import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { BackgroundBubble } from '@/screens/Login/Login.styles';
import * as S from './SummaryPublishTemplate.styles';

export interface SummaryPublishTemplateProps {
  // Data
  route: {
    start: string;
    end: string;
    middleStops?: string[] | null;
  };
  schedule: {
    date: string | null;
    time: string | null;
  };
  vehicle: {
    name: string;
    subText: string;
    icon: string;
    numberplate: string;
  } | null;
  pricing: {
    seatCount: number;
    pricePerSeat: string;
  };
  preferences: {
    id: string;
    label: string;
    icon: string;
  }[] | null;
  isPublishing?: boolean;

  // Actions
  onBack: () => void;
  onSave: () => void;
  onPublish: () => void;
  onEditRoute: () => void;
  onEditSchedule: () => void;
  onEditVehicle: () => void;
  onEditSeats: () => void;
  onEditPreferences: () => void;
  validationError?: string | null;
  canPublish?: boolean;
}

export const SummaryPublishTemplate: React.FC<SummaryPublishTemplateProps> = ({
  route,
  schedule,
  vehicle,
  pricing,
  preferences,
  onBack,
  onSave,
  onPublish,
  onEditSchedule,
  onEditVehicle,
  onEditSeats,
  onEditPreferences,
  isPublishing,
  validationError,
  canPublish = true,
}) => {
  const theme = useTheme();
  const { summaryPublish: t } = useLocale();
  console.log(route)
  return (
    <ScreenShell
      title={t.headerTitle}
      onBack={onBack}
      rightElement={
        <S.SaveButton onPress={onSave} activeOpacity={0.7}>
          <S.SaveText>Save</S.SaveText>
        </S.SaveButton>
      }
    >
      <BackgroundBubble top="8%" left="-5%" />

      <S.Content>
        <S.TitleSection>
          <S.PageTitle>{t.title}</S.PageTitle>
          <S.PageSubtitle>{t.subtitle}</S.PageSubtitle>
        </S.TitleSection>

        {/* Route Summary Card */}
        <S.GlassCard>
          <S.SectionHeader>
            <S.SectionLabel>{t.routeSummaryLabel}</S.SectionLabel>
          </S.SectionHeader>
          
          <S.RouteLayout>
            <S.TimelineLine>
              <S.TimelineDotOutline />
              <S.TimelineTrack colors={[theme.colors.primary, theme.colors.outline]} />
              
              {(route.middleStops || []).map((_, i) => (
                <React.Fragment key={`dot-${i}`}>
                  <S.TimelineDotMiddle />
                  <S.TimelineTrack colors={[theme.colors.outline, i === (route.middleStops?.length || 0) - 1 ? theme.colors.primary : theme.colors.outline]} />
                </React.Fragment>
              ))}
              
              <S.TimelineDotEnd />
            </S.TimelineLine>

            <S.RouteDetailsStack>
              <S.RouteStop>
                <S.StopLabel>{t.departureLabel}</S.StopLabel>
                <S.StopLocation numberOfLines={1}>{route.start}</S.StopLocation>
              </S.RouteStop>

              {(route.middleStops || []).map((stop, i) => (
                <S.RouteStop key={`stop-${i}`}>
                  <S.StopLabel>Stop {i + 1}</S.StopLabel>
                  <S.StopLocation numberOfLines={1}>{stop}</S.StopLocation>
                </S.RouteStop>
              ))}

              <S.RouteStop>
                <S.StopLabel>{t.arrivalLabel}</S.StopLabel>
                <S.StopLocation numberOfLines={1}>{route.end}</S.StopLocation>
              </S.RouteStop>
            </S.RouteDetailsStack>
          </S.RouteLayout>
        </S.GlassCard>

        {/* Date & Time Box */}
        <S.GlassCard hasError={!!validationError}>
          <S.SectionHeader>
            <S.SectionLabel>{t.departureScheduleLabel}</S.SectionLabel>
            <S.EditButton onPress={onEditSchedule} activeOpacity={0.7}>
              <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.primary} />
            </S.EditButton>
          </S.SectionHeader>
          <S.DateTimeValue>
            {schedule.date && schedule.time 
              ? `${schedule.time}, ${schedule.date}`
              : 'Select date and time'}
          </S.DateTimeValue>
        </S.GlassCard>

        {/* Vehicle & Availability Grid */}
        <S.GridRow>
          <S.GridCard>
            <S.SectionHeader>
              <MaterialIcons name="directions-car" size={moderateScale(20)} color={theme.colors.primary} />
              <S.EditButton onPress={onEditVehicle} activeOpacity={0.7}>
                <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.primary} />
              </S.EditButton>
            </S.SectionHeader>
            <S.SectionLabel>{t.vehicleLabel}</S.SectionLabel>
            {vehicle ? (
              <>
                <S.GridCardValue numberOfLines={1}>{vehicle.name}</S.GridCardValue>
                <S.GridCardSub numberOfLines={1}>{vehicle.subText}</S.GridCardSub>
                <S.GridCardSub numberOfLines={1}>{vehicle.numberplate}</S.GridCardSub>
              </>
            ) : (
              <S.EmptyStateWrapper onPress={onEditVehicle}>
                <S.EmptyStateText>{t.addVehicleLabel}</S.EmptyStateText>
              </S.EmptyStateWrapper>
            )}
          </S.GridCard>

          <S.GridCard>
            <S.SectionHeader>
              <MaterialIcons name="group" size={moderateScale(20)} color={theme.colors.primary} />
              <S.EditButton onPress={onEditSeats} activeOpacity={0.7}>
                <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.primary} />
              </S.EditButton>
            </S.SectionHeader>
            <S.SectionLabel>{t.availabilityLabel}</S.SectionLabel>
            <S.GridCardValue>{pricing.seatCount} Seats</S.GridCardValue>
            <S.GridCardSub>{pricing.pricePerSeat} per seat</S.GridCardSub>
          </S.GridCard>
        </S.GridRow>

        {/* Preferences */}
        <S.GlassCard>
          <S.SectionHeader>
            <S.SectionLabel>{t.ridePreferencesLabel}</S.SectionLabel>
            <S.EditButton onPress={onEditPreferences} activeOpacity={0.7}>
              <MaterialIcons name="edit" size={moderateScale(16)} color={theme.colors.primary} />
            </S.EditButton>
          </S.SectionHeader>
          
          {preferences && preferences.length > 0 ? (
            <S.BadgeRow>
              {preferences.map((pref) => (
                <S.PrefBadge key={pref.id}>
                  <MaterialIcons name={pref.icon} size={moderateScale(16)} color={theme.colors.primary} />
                  <S.PrefBadgeText>{pref.label}</S.PrefBadgeText>
                </S.PrefBadge>
              ))}
            </S.BadgeRow>
          ) : (
            <S.EmptyStateWrapper onPress={onEditPreferences}>
              <S.EmptyStateText>{t.addPreferencesLabel}</S.EmptyStateText>
            </S.EmptyStateWrapper>
          )}
        </S.GlassCard>
      </S.Content>

      <S.FloatingFooter pointerEvents="box-none">
        <S.FooterGradient
          colors={['transparent', theme.colors.surface, theme.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
        />
        {validationError && <S.ErrorText>{validationError}</S.ErrorText>}

        <S.PublishButton 
          onPress={onPublish} 
          activeOpacity={0.9} 
          disabled={!canPublish || isPublishing}
        >
          <S.PublishGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ opacity: (!canPublish || isPublishing) ? 0.6 : 1 }}
          >
            {isPublishing ? (
              <S.LoadingIndicator color={theme.colors.on_primary} />
            ) : (
              <S.PublishText>{t.publishRideButton}</S.PublishText>
            )}
          </S.PublishGradient>
        </S.PublishButton>
        <S.TermsText>
          {t.termsText1}
          <S.TermsLink>{t.termsLink}</S.TermsLink>
          {t.termsText2}
        </S.TermsText>
      </S.FloatingFooter>
    </ScreenShell>
  );
};
