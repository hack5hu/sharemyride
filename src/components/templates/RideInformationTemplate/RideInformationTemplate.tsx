import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { VerifiedBadge } from '@/components/atoms/VerifiedBadge';
import { RideTimeline } from '@/components/molecules/RideTimeline/RideTimeline';
import { RideInformationTemplateProps } from './types.d';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './RideInformationTemplate.styles';
import { moderateScale } from '@/styles';

const MOCK_RIDERS = [
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=22',
];

const PREFERENCE_ICONS: Record<string, string> = {
  noSmoking: 'smoke-free',
  petFriendly: 'pets',
  luggageAllowed: 'luggage',
  ladiesOnly: 'female',
  manualApproval: 'how-to-reg',
};

const PREFERENCE_LABELS: Record<string, string> = {
  noSmoking: 'Smoke-Free Ride',
  petFriendly: 'Pets Welcome',
  luggageAllowed: 'Luggage OK',
  ladiesOnly: 'Ladies Only',
  manualApproval: 'Approval Required',
};

export const RideInformationTemplate: React.FC<RideInformationTemplateProps> = ({
  ride,
  t,
  handleBack,
  handleBook,
  handleViewRoute,
  handleCopyAddress,
  handleDriverProfile,
  handleChat,
}) => {
  const theme = useTheme();

  if (!ride) return null;

  const rideAny = ride as any;

  const departureTime = ride.timeline[0]?.time ?? '--:--';
  const departureDateLabel: string = rideAny.departureDate ?? 'Today';

  const durationHours = Math.floor(ride.totalDuration / 60);
  const durationMins = ride.totalDuration % 60;
  const durationLabel = durationHours > 0
    ? `${durationHours}h ${durationMins}m`
    : `${durationMins}m`;

  const preferenceFeatures = ride.features.filter(f => !f.startsWith('music:'));
  const musicFeature = ride.features.find(f => f.startsWith('music:'));
  const musicGenre = musicFeature?.replace('music:', '');
  const bookedCount = MOCK_RIDERS.length;

  return (
    <S.Root>
      <ScreenShell title={t.title} onBack={handleBack}>
        <S.ScrollContent showsVerticalScrollIndicator={false}>
          <S.ContentPadding>
            {/* ── Driver Card (simple flat row) ── */}
            <S.DriverCard>
              <S.DriverInfoGroup onPress={handleDriverProfile}>
                <S.AvatarWrapper>
                  <Avatar
                    source={{ uri: ride.driver.driverPhotoUrl || ride.driver.avatar }}
                    size="md"
                    border
                  />
                  <S.BadgePin>
                    <VerifiedBadge size={14} />
                  </S.BadgePin>
                </S.AvatarWrapper>

                <S.DriverTextGroup>
                  <Typography variant="title" size="sm" weight="bold">
                    {ride.driver.name}
                  </Typography>
                  <S.VerifiedRow>
                    <Icon name="star" size={moderateScale(13)} color="#EAB308" />
                    <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                      {ride.driver.rating} · {ride.driver.rideCount} rides
                    </Typography>
                  </S.VerifiedRow>
                </S.DriverTextGroup>
              </S.DriverInfoGroup>

              {/* Chat only */}
              <S.ChatButton onPress={handleChat} activeOpacity={0.8}>
                <Icon name="chat-bubble-outline" size={moderateScale(20)} color={theme.colors.primary} />
              </S.ChatButton>
            </S.DriverCard>

            {/* ── Stats Strip: Date · Time · Duration · Seats ── */}
            <S.StatsStrip>
              <S.StatPill>
                <S.StatPillIcon>
                  <Icon name="calendar-today" size={moderateScale(15)} color={theme.colors.primary} />
                </S.StatPillIcon>
                <Typography variant="label" size="sm" weight="bold" numberOfLines={1}>
                  {departureDateLabel}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">
                  Date
                </Typography>
              </S.StatPill>

              <S.StatPill>
                <S.StatPillIcon>
                  <Icon name="schedule" size={moderateScale(15)} color={theme.colors.primary} />
                </S.StatPillIcon>
                <Typography variant="label" size="sm" weight="bold">
                  {departureTime}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">
                  Time
                </Typography>
              </S.StatPill>

              <S.StatPill>
                <S.StatPillIcon>
                  <Icon name="timer" size={moderateScale(15)} color={theme.colors.primary} />
                </S.StatPillIcon>
                <Typography variant="label" size="sm" weight="bold">
                  {durationLabel}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">
                  Duration
                </Typography>
              </S.StatPill>

              <S.StatPill>
                <S.StatPillIcon>
                  <Icon name="event-seat" size={moderateScale(15)} color={theme.colors.primary} />
                </S.StatPillIcon>
                <Typography variant="label" size="sm" weight="bold">
                  {ride.seatsLeft}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">
                  Seats Left
                </Typography>
              </S.StatPill>
            </S.StatsStrip>



            {/* ── Route Timeline ── */}
            <S.SectionCard>
              <S.SectionLabelRow>
                <S.SectionDot />
                <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                  {t.timelineTitle.toUpperCase()}
                </Typography>
              </S.SectionLabelRow>
              <RideTimeline
                points={ride.timeline}
                showActions={true}
                onMapPress={handleViewRoute}
                onCopyAddress={handleCopyAddress}
              />
            </S.SectionCard>



            {/* ── Journey Comfort ── */}
            {(preferenceFeatures.length > 0 || musicGenre) && (
              <S.SectionCard>
                <S.SectionLabelRow>
                  <S.SectionDot color={theme.colors.secondary} />
                  <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                    JOURNEY COMFORT
                  </Typography>
                </S.SectionLabelRow>
                <S.ChipsWrap>
                  {preferenceFeatures.map((feat) => (
                    <S.PreferenceChip key={feat} accent={feat === 'noSmoking'}>
                      <Icon
                        name={PREFERENCE_ICONS[feat] || 'check-circle'}
                        size={moderateScale(15)}
                        color={feat === 'noSmoking' ? theme.colors.error : theme.colors.primary}
                      />
                      <Typography variant="label" size="sm" weight="medium">
                        {PREFERENCE_LABELS[feat] || feat}
                      </Typography>
                    </S.PreferenceChip>
                  ))}
                  {musicGenre && (
                    <S.PreferenceChip>
                      <Icon name="music-note" size={moderateScale(15)} color={theme.colors.secondary} />
                      <Typography variant="label" size="sm" weight="medium">
                        {musicGenre} Vibes
                      </Typography>
                    </S.PreferenceChip>
                  )}
                </S.ChipsWrap>
              </S.SectionCard>
            )}

            {/* ── Fellow Travelers ── */}
            <S.SectionCard>
              <S.SectionLabelRow>
                <S.SectionDot color={theme.colors.tertiary} />
                <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
                  YOUR FELLOW TRAVELERS
                </Typography>
              </S.SectionLabelRow>
              <S.CoRidersRow>
                <S.AvatarStack>
                  {MOCK_RIDERS.map((uri, i) => (
                    <S.CoRiderAvatar key={i} source={{ uri }} offset={i} />
                  ))}
                </S.AvatarStack>
                <Typography variant="body" size="sm" color="on_surface_variant">
                  {bookedCount} {bookedCount === 1 ? 'person has' : 'people have'} joined
                </Typography>
                <S.EmptySeatPill>
                  <Icon name="add-circle-outline" size={moderateScale(13)} color={theme.colors.primary} />
                  <Typography variant="label" size="xs" weight="bold" color="primary">
                    {ride.seatsLeft} open
                  </Typography>
                </S.EmptySeatPill>
              </S.CoRidersRow>
            </S.SectionCard>


            {/* ── Fare Card ── */}
            <S.FareCard
              colors={[theme.colors.primary, theme.colors.primary_container]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <S.FareLabel>
                <Typography variant="label" size="xs" weight="bold" color="on_primary">
                  YOUR FARE
                </Typography>
                <S.FarePriceBig>₹{ride.price.toFixed(0)}</S.FarePriceBig>
                <S.PerSeatNote>per seat · no hidden fees</S.PerSeatNote>
              </S.FareLabel>
              <S.FareIconBox>
                <Icon name="currency-rupee" size={moderateScale(32)} color="#FFFFFF" />
              </S.FareIconBox>
            </S.FareCard>

          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom CTA ── */}
        <S.FixedFooter>
          <S.BookButton onPress={handleBook} activeOpacity={0.85}>
            <Icon name="airline-seat-recline-normal" size={moderateScale(20)} color={theme.colors.on_primary} />
            <Typography variant="title" size="sm" weight="bold" color="on_primary">
              Select a Seat
            </Typography>
          </S.BookButton>
        </S.FixedFooter>
      </ScreenShell>
    </S.Root>
  );
};
