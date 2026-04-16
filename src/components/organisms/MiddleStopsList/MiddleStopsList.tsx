import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import {
  ListContainer,
  PathLine,
  LocationItemArea,
  MiddleStopArea,
  AddStopButtonContainer,
  IconCircle,
  TextContainer,
  LabelText,
  TitleText,
  AddTitleText,
  AddSubtitleText,
  RemoveButton,
} from './MiddleStopsList.styles';

export interface RouteStop {
  id: string;
  name: string;
  distanceText?: string;
}

export interface MiddleStopsListProps {
  startLocation: string;
  destination: string;
  middleStops: RouteStop[];
  onAddStop: () => void;
  onRemoveStop: (id: string) => void;
}

export const MiddleStopsList: React.FC<MiddleStopsListProps> = ({
  startLocation,
  destination,
  middleStops,
  onAddStop,
  onRemoveStop,
}) => {
  const theme = useTheme();
  const { middleStops: t } = useLocale();

  return (
    <ListContainer>
      <PathLine />
      
      {/* Start Point */}
      <LocationItemArea>
        <IconCircle variant="start">
          <MaterialIcons name="location-on" size={moderateScale(20)} color={theme.colors.on_primary_fixed_variant} />
        </IconCircle>
        <TextContainer>
          <LabelText variant="start">{t.startPointLabel}</LabelText>
          <TitleText>{startLocation}</TitleText>
        </TextContainer>
      </LocationItemArea>

      {/* Middle Stops List */}
      {middleStops.map((stop, index) => (
        <MiddleStopArea key={stop.id}>
          <IconCircle variant="stop">
            <MaterialIcons name="trip-origin" size={moderateScale(20)} color={theme.colors.on_secondary_container} />
          </IconCircle>
          <TextContainer>
            <LabelText variant="stop">{`${t.stopLabel} ${index + 1}`}</LabelText>
            <TitleText>{stop.name}</TitleText>
            {stop.distanceText && <AddSubtitleText style={{ marginTop: 2 }}>{stop.distanceText}</AddSubtitleText>}
          </TextContainer>
          <RemoveButton onPress={() => onRemoveStop(stop.id)} activeOpacity={0.7}>
            <MaterialIcons name="close" size={moderateScale(24)} color={theme.colors.tertiary} />
          </RemoveButton>
        </MiddleStopArea>
      ))}

      {/* Add Stop Button */}
      <AddStopButtonContainer onPress={onAddStop} activeOpacity={0.8}>
        <IconCircle variant="add">
          <MaterialIcons name="add" size={moderateScale(20)} color={theme.colors.primary} />
        </IconCircle>
        <TextContainer>
          <AddTitleText>{t.addMiddleStop}</AddTitleText>
          <AddSubtitleText>{t.addMiddleStopSub}</AddSubtitleText>
        </TextContainer>
      </AddStopButtonContainer>

      {/* End Point */}
      <LocationItemArea style={{ marginBottom: 0 }}>
        <IconCircle variant="end">
          <MaterialIcons name="flag" size={moderateScale(20)} color={theme.colors.on_primary} />
        </IconCircle>
        <TextContainer>
          <LabelText variant="end">{t.destinationLabel}</LabelText>
          <TitleText>{destination}</TitleText>
        </TextContainer>
      </LocationItemArea>

    </ListContainer>
  );
};
