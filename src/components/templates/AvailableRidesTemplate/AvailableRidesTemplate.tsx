import React from 'react';
import { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, verticalScale } from '@/styles';
import { RideData } from '@/screens/AvailableRides/types.d';
import { RideCard } from '@/components/organisms/RideCard/RideCard';
import { RideFiltersModal } from '@/components/organisms/RideFiltersModal';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './AvailableRidesTemplate.styles';

export interface AvailableRidesTemplateProps {
  rides: RideData[];
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  onOpenFilters: () => void;
  isFilterModalOpen: boolean;
  onCloseFilters: () => void;
  onClearFilters: () => void;
  onRideSelect: (id: string) => void;
  t: any;
  ft: any;
}

export const AvailableRidesTemplate: React.FC<AvailableRidesTemplateProps> = ({
  rides,
  selectedFilters,
  onFilterToggle,
  onOpenFilters,
  isFilterModalOpen,
  onCloseFilters,
  onClearFilters,
  onRideSelect,
  t,
  ft,
}) => {
  const theme = useTheme();

  const filters = [
    { id: 'time', label: t.timeFilterLabel, icon: 'schedule' },
    { id: 'noSmoking', label: t.noSmokingFilterLabel, icon: 'smoke-free' },
    { id: 'ladiesOnly', label: t.ladiesOnlyFilterLabel, icon: 'pregnant-woman' },
    { id: 'topRated', label: t.topRatedFilterLabel, icon: 'star' },
  ];

  return (
    <ScreenShell title={t.heroTitle}>
      <S.ScrollContent showsVerticalScrollIndicator={false}>
        <S.SearchSummaryCard>
          <S.SummaryRow>
            <S.RouteInfo>
              <S.LocationVertical>
                <Icon name="circle" size={moderateScale(14)} color={theme.colors.primary} style={{ fontVariationSettings: "'FILL' 1" }} />
                <S.Line />
                <Icon name="location-on" size={moderateScale(14)} color={theme.colors.tertiary} style={{ fontVariationSettings: "'FILL' 1" }} />
              </S.LocationVertical>
              <View>
                <Typography variant="title" size="md" weight="bold">Downtown Hub</Typography>
                <Typography variant="title" size="md" weight="bold">North Green Valley</Typography>
              </View>
            </S.RouteInfo>
            <S.FilterButton onPress={onOpenFilters}>
              <Icon name="tune" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
            </S.FilterButton>
          </S.SummaryRow>

          <S.SummaryFooter>
            <S.FooterItem>
              <Icon name="calendar-today" size={moderateScale(20)} color={theme.colors.on_surface_variant} />
              <Typography variant="label" size="md" weight="bold" color={theme.colors.on_surface_variant}>
                {t.searchSummaryDate}
              </Typography>
            </S.FooterItem>
            <S.FooterItem>
              <Icon name="group" size={moderateScale(20)} color={theme.colors.on_surface_variant} />
              <Typography variant="label" size="md" weight="bold" color={theme.colors.on_surface_variant}>
                {t.searchSummarySeats.replace('{count}', '2')}
              </Typography>
            </S.FooterItem>
          </S.SummaryFooter>
        </S.SearchSummaryCard>

        <S.FilterScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <S.FilterChip 
              key={filter.id} 
              active={selectedFilters.includes(filter.id)}
              onPress={() => onFilterToggle(filter.id)}
            >
              <Icon 
                name={filter.icon} 
                size={moderateScale(18)} 
                color={selectedFilters.includes(filter.id) ? theme.colors.on_primary : theme.colors.on_surface_variant} 
              />
              <Typography 
                variant="label" 
                size="md" 
                weight="bold" 
                color={selectedFilters.includes(filter.id) ? theme.colors.on_primary : theme.colors.on_surface_variant}
              >
                {filter.label}
              </Typography>
            </S.FilterChip>
          ))}
        </S.FilterScrollView>

        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} onPress={onRideSelect} />
        ))}
        
        <View style={{ height: verticalScale(32) }} />
      </S.ScrollContent>

      <RideFiltersModal 
        isOpen={isFilterModalOpen} 
        onClose={onCloseFilters} 
        onClear={onClearFilters}
        t={ft}
      />
    </ScreenShell>
  );
};
