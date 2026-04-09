import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale } from '@/styles';
import { RideData } from '@/screens/AvailableRides/types.d';
import { RideCard } from '@/components/organisms/RideCard/RideCard';
import { RideFiltersModal } from '@/components/organisms/RideFiltersModal';
import { useLocale } from '@/constants/localization';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ScrollContent = styled.ScrollView`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
`;

const SearchSummaryCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
  box-shadow: 0px 4px 24px rgba(23, 29, 25, 0.04);
  elevation: 2;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

const RouteInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

const LocationVertical = styled.View`
  align-items: center;
`;

const Line = styled.View`
  width: ${moderateScale(1)}px;
  height: ${verticalScale(24)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant}4D;
  margin-vertical: ${verticalScale(4)}px;
`;

const FilterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(16)}px;
`;

const SummaryFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${verticalScale(16)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant}1A;
`;

const FooterItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

const FilterScrollView = styled.ScrollView`
  margin-bottom: ${verticalScale(24)}px;
`;

const FilterChip = styled.TouchableOpacity<{ active?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(999)}px;
  background-color: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.surface_container_high};
  margin-right: ${scale(12)}px;
`;

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
    <Container>
      <ScrollContent showsVerticalScrollIndicator={false}>
        <SearchSummaryCard>
          <SummaryRow>
            <RouteInfo>
              <LocationVertical>
                <Icon name="circle" size={moderateScale(14)} color={theme.colors.primary} style={{ fontVariationSettings: "'FILL' 1" }} />
                <Line />
                <Icon name="location-on" size={moderateScale(14)} color={theme.colors.tertiary} style={{ fontVariationSettings: "'FILL' 1" }} />
              </LocationVertical>
              <View>
                <Typography variant="title" size="md" weight="bold">Downtown Hub</Typography>
                <Typography variant="title" size="md" weight="bold">North Green Valley</Typography>
              </View>
            </RouteInfo>
            <FilterButton onPress={onOpenFilters}>
              <Icon name="tune" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
            </FilterButton>
          </SummaryRow>

          <SummaryFooter>
            <FooterItem>
              <Icon name="calendar-today" size={moderateScale(20)} color={theme.colors.on_surface_variant} />
              <Typography variant="label" size="md" weight="bold" color={theme.colors.on_surface_variant}>
                {t.searchSummaryDate}
              </Typography>
            </FooterItem>
            <FooterItem>
              <Icon name="group" size={moderateScale(20)} color={theme.colors.on_surface_variant} />
              <Typography variant="label" size="md" weight="bold" color={theme.colors.on_surface_variant}>
                {t.searchSummarySeats.replace('{count}', '2')}
              </Typography>
            </FooterItem>
          </SummaryFooter>
        </SearchSummaryCard>

        <FilterScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <FilterChip 
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
            </FilterChip>
          ))}
        </FilterScrollView>

        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} onPress={onRideSelect} />
        ))}
        
        <View style={{ height: verticalScale(32) }} />
      </ScrollContent>

      <RideFiltersModal 
        isOpen={isFilterModalOpen} 
        onClose={onCloseFilters} 
        onClear={onClearFilters}
        t={ft}
      />
    </Container>
  );
};
