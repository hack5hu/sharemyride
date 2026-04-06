import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  Container,
  TitleText,
  Subtext,
  SearchInputContainer,
  SearchInput,
  SectionHeader,
  GridContainer,
  GridCard,
  BadgeRow,
  CardBadge,
  CardBadgeText,
  CardTitle,
  CardSubtext,
  HistoryItem,
  HistoryLeft,
  HistoryText,
} from './MiddleStopSearchOverlay.styles';

export interface LocationOption {
  id: string;
  name: string;
  subtitle?: string;
  isPopular?: boolean;
}

export interface MiddleStopSearchOverlayProps {
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  suggestedLocations: LocationOption[];
  recentHistory: LocationOption[];
  onSelectLocation: (loc: LocationOption) => void;
}

export const MiddleStopSearchOverlay: React.FC<MiddleStopSearchOverlayProps> = ({
  searchQuery,
  onChangeSearch,
  suggestedLocations,
  recentHistory,
  onSelectLocation,
}) => {
  const theme = useTheme();
  const { middleStopMap: t } = useLocale();

  return (
    <Container>
      <TitleText>{t.whereWillYouStop}</TitleText>
      <Subtext>
        {t.addingStopsIncreasesInfo} <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>40%</Text>.
      </Subtext>

      <SearchInputContainer>
        <MaterialIcons name="search" size={moderateScale(24)} color={theme.colors.primary} />
        <SearchInput
          placeholder={t.searchPlaceholder}
          placeholderTextColor={`${theme.colors.outline_variant}99`}
          value={searchQuery}
          onChangeText={onChangeSearch}
          autoFocus={true}
        />
      </SearchInputContainer>

      {!searchQuery && (
        <>
          <SectionHeader>{t.suggestedStoppages}</SectionHeader>
          <GridContainer>
            {suggestedLocations.map((item) => (
              <GridCard key={item.id} isPopular={item.isPopular} onPress={() => onSelectLocation(item)}>
                <View>
                  <BadgeRow>
                    <CardBadge isPopular={item.isPopular}>
                      <CardBadgeText isPopular={item.isPopular}>
                        {item.isPopular ? t.popular : t.quickExit}
                      </CardBadgeText>
                    </CardBadge>
                    <MaterialIcons name="add-circle" size={moderateScale(20)} color={theme.colors.primary} />
                  </BadgeRow>
                  <CardTitle>{item.name}</CardTitle>
                </View>
                <CardSubtext>{item.subtitle}</CardSubtext>
              </GridCard>
            ))}
          </GridContainer>

          <SectionHeader>{t.recentHistory}</SectionHeader>
          <View>
            {recentHistory.map((item) => (
              <HistoryItem key={item.id} onPress={() => onSelectLocation(item)}>
                <HistoryLeft>
                  <MaterialIcons name="history" size={moderateScale(20)} color={theme.colors.outline_variant} />
                  <HistoryText>{item.name}</HistoryText>
                </HistoryLeft>
                <MaterialIcons name="chevron-right" size={moderateScale(24)} color={`${theme.colors.outline_variant}80`} />
              </HistoryItem>
            ))}
          </View>
        </>
      )}

      {/* If searching, you'd optionally filter recent history or show real API results here */}
      {!!searchQuery && (
         <View>
           {/* Mock search results */}
           {recentHistory.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
             <HistoryItem key={item.id} onPress={() => onSelectLocation(item)}>
                <HistoryLeft>
                  <MaterialIcons name="location-on" size={moderateScale(20)} color={theme.colors.primary} />
                  <HistoryText>{item.name}</HistoryText>
                </HistoryLeft>
              </HistoryItem>
           ))}
         </View>
      )}

    </Container>
  );
};
