import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { RouteJourney } from '@/components/organisms/RouteJourney';
import { ETAInfo } from '@/components/molecules/ETAInfo';
import { FareCard } from '@/components/molecules/FareCard';
import { DriverSection } from '@/components/organisms/DriverSection';
import { RidersHorizontalList } from '@/components/organisms/RidersHorizontalList';
import { SafetyTrustCard } from '@/components/organisms/SafetyTrustCard';
import { CommonHeader } from '@/components/molecules/CommonHeader';
import { RideDetailsTemplateProps } from './types.d';
import * as S from './RideDetailsTemplate.styles';

export const RideDetailsTemplate: React.FC<RideDetailsTemplateProps> = ({
  onBackPress,
  onCancelPress,
  routeJourney,
  etaInfo,
  fareCard,
  driverSection,
  ridersList,
}) => {
  const theme = useTheme();
  const { rideDetails } = useLocale();

  return (
    <S.Container showsVerticalScrollIndicator={false}>
      <CommonHeader 
        title={rideDetails.headerTitle} 
        onBackPress={onBackPress} 
      />
      
      <S.MainContent>
        {/* Map Visualization */}
        <S.MapPlaceholder>
          <S.MapImage 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPp9uD4jSjM9BxRjifb2BQRVNVCThWkezi3P9WbBaiE4FOxl8u3rYxk3tfHNHI6Rnp1qrHaE3jk334UYey0Gf3_GuW7J8ZhBb5eUO_TWrOSia9Q0Ew2gqreRzH0ep0-Z-0hc_tJoT5a1YwGY70KBeyaLJECOury8CxcZ3KPXwhOXghxJ3vlcwFZ8XZgKk4y3a3iynYjU1VE_dm0uEem-5YawGGxk-CTz2f745239HVZEc_ynKsMQ0irx_L21H20jto0k5zKGanotD9' }} 
            resizeMode="cover"
          />
          <S.LiveTrackingBadge>
            <Icon name="route" size={14} color={theme.colors.primary} />
            <S.LiveTrackingText>{rideDetails.liveTracking}</S.LiveTrackingText>
          </S.LiveTrackingBadge>
        </S.MapPlaceholder>

        {/* Route Journey */}
        <S.RouteGrid>
          <RouteJourney {...routeJourney} />
        </S.RouteGrid>

        {/* ETA and Fare */}
        <S.MetaRow>
          <S.ETAWrapper>
            <ETAInfo {...etaInfo} />
          </S.ETAWrapper>
          <View style={{ flex: 1 }}>
            <FareCard {...fareCard} />
          </View>
        </S.MetaRow>

        {/* Driver Section */}
        <DriverSection {...driverSection} />
        
        <S.SectionSpacer />

        {/* Riders List */}
        <RidersHorizontalList {...ridersList} />

        <S.SectionSpacer />

        {/* Safety Trust */}
        <SafetyTrustCard />

        {/* Actions */}
        <S.CancelButton onPress={onCancelPress} activeOpacity={0.7}>
          <Icon name="cancel" size={20} color={theme.colors.error} />
          <S.CancelText>{rideDetails.cancelRide}</S.CancelText>
        </S.CancelButton>
      </S.MainContent>
    </S.Container>
  );
};
