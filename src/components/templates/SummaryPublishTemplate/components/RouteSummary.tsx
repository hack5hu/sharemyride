import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
  GlassCard, 
  SectionHeader, 
  SectionLabel, 
  RouteLayout, 
  TimelineLine, 
  TimelineDotOutline, 
  TimelineTrack, 
  TimelineDotMiddle, 
  TimelineDotEnd, 
  RouteDetailsStack, 
  RouteStop, 
  StopLabel, 
  StopLocation,
  EditButton
} from './RouteSummary.styles';
import { moderateScale } from '@/styles';

interface RouteSummaryProps {
  route: {
    start: string;
    end: string;
    middleStops?: string[] | null;
  };
  onEdit: () => void;
  t: any;
}

export const RouteSummary: React.FC<RouteSummaryProps> = ({ route, onEdit, t }) => {
  const theme = useTheme();

  return (
    <GlassCard>
      <SectionHeader>
        <SectionLabel>{t.routeSummaryLabel}</SectionLabel>
        <EditButton onPress={onEdit} activeOpacity={0.7}>
          <Icon name="edit" size={moderateScale(16)} color={theme.colors.primary} />
        </EditButton>
      </SectionHeader>
      
      <RouteLayout>
        <TimelineLine>
          <TimelineDotOutline />
          <TimelineTrack colors={[theme.colors.primary, theme.colors.outline]} />
          
          {(route.middleStops || []).map((_, i) => (
            <React.Fragment key={`dot-${i}`}>
              <TimelineDotMiddle />
              <TimelineTrack colors={[theme.colors.outline, i === (route.middleStops?.length || 0) - 1 ? theme.colors.primary : theme.colors.outline]} />
            </React.Fragment>
          ))}
          
          <TimelineDotEnd />
        </TimelineLine>

        <RouteDetailsStack>
          <RouteStop>
            <StopLabel>{t.departureLabel}</StopLabel>
            <StopLocation numberOfLines={1}>{route.start}</StopLocation>
          </RouteStop>

          {(route.middleStops || []).map((stop, i) => (
            <RouteStop key={`stop-${i}`}>
              <StopLabel>Stop {i + 1}</StopLabel>
              <StopLocation numberOfLines={1}>{stop}</StopLocation>
            </RouteStop>
          ))}

          <RouteStop>
            <StopLabel>{t.arrivalLabel}</StopLabel>
            <StopLocation numberOfLines={1}>{route.end}</StopLocation>
          </RouteStop>
        </RouteDetailsStack>
      </RouteLayout>
    </GlassCard>
  );
};
