import React from 'react';
import { Handlebar } from '@/components/atoms/Handlebar';
import { DurationChip } from '@/components/atoms/DurationChip';
import { LocationListItem } from '@/components/molecules/LocationListItem';
import { LiveLocationToggle } from '@/components/molecules/LiveLocationToggle';
import { 
  Container, 
  ScrollArea, 
  Divider, 
  Section, 
  DurationChipsList, 
  SectionHeader, 
  SuggestionsList 
} from './LocationBottomSheet.styles';
import { LocationBottomSheetProps } from './types.d';

const DURATIONS = ['15 min', '30 min', '1 hr', '2 hrs', 'Until I arrive'];

const SUGGESTIONS = [
  { id: '1', title: 'Home', address: '123 Green Valley, Springfield', icon: 'home' },
  { id: '2', title: 'Work', address: 'Design Hub, 45 Creative Lane', icon: 'work' },
  { id: '3', title: 'Starbucks Coffee', address: 'Recent • 2 miles away', icon: 'history' },
];

export const LocationBottomSheet: React.FC<LocationBottomSheetProps> = ({
  isSharingLive,
  onToggleSharing,
  selectedDuration,
  onSelectDuration,
  onLocationSelect,
}) => {
  return (
    <Container>
      <Handlebar />
      
      <ScrollArea showsVerticalScrollIndicator={false}>
        <LocationListItem 
          title="Current Location"
          address="221B Baker St, London, NW1 6XE"
          icon="gps-fixed"
          isCurrentLocation={true}
          onPress={() => onLocationSelect({ title: 'Current Location' })}
        />

        <Divider />

        <Section>
          <LiveLocationToggle 
            isEnabled={isSharingLive} 
            onToggle={onToggleSharing} 
          />
          
          {isSharingLive && (
            <DurationChipsList horizontal showsHorizontalScrollIndicator={false}>
              {DURATIONS.map((dur) => (
                <DurationChip 
                  key={dur}
                  label={dur}
                  isSelected={selectedDuration === dur}
                  onPress={() => onSelectDuration(dur)}
                />
              ))}
            </DurationChipsList>
          )}
        </Section>

        <Section>
          <SectionHeader>Suggested Places</SectionHeader>
          <SuggestionsList>
            {SUGGESTIONS.map((item) => (
              <LocationListItem 
                key={item.id}
                title={item.title}
                address={item.address}
                icon={item.icon}
                onPress={() => onLocationSelect(item)}
              />
            ))}
          </SuggestionsList>
        </Section>
      </ScrollArea>
    </Container>
  );
};
