import React from 'react';
import { Handlebar } from '@/components/atoms/Handlebar';
import { DurationChip } from '@/components/atoms/DurationChip';
import { LocationListItem } from '@/components/molecules/LocationListItem';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Container, 
  ScrollArea, 
  Section, 
  DurationChipsList, 
  SectionHeader, 
  SuggestionsList 
} from './LocationBottomSheet.styles';
import { LocationBottomSheetProps } from './types.d';


export const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({

  onLocationSelect,

  searchResults,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Handlebar />
      
      <ScrollArea showsVerticalScrollIndicator={false}>

        <LocationListItem 
          title={t('chatLocation.sendCurrentLocation')}
          address={t('chatLocation.sendCurrentLocationDesc')}
          icon="gps-fixed"
          onPress={() => onLocationSelect({ title: 'Current Location' })}
        />

        {searchResults && searchResults.length > 0 && (
          <Section>
            <SectionHeader>{t('chatLocation.nearbyPlaces')}</SectionHeader>
            <SuggestionsList>
              {searchResults.map((item) => (
                <LocationListItem 
                  key={item.id}
                  title={item.name || item.title}
                  address={item.address}
                  icon={item.icon || 'place'}
                  onPress={() => onLocationSelect(item)}
                />
              ))}
            </SuggestionsList>
          </Section>
        )}
      </ScrollArea>
    </Container>
  );
};

