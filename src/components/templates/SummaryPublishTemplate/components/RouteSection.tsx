import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  GlassCard, 
  RouteHeaderRow, 
  RouteLayout, 
  TimelineLine, 
  TimelineDotOutline, 
  TimelineTrack, 
  TimelineDotEnd, 
  RouteDetailsStack, 
  RouteStop, 
  StopLabel, 
  StopLocation, 
  StopTime, 
  EditButton 
} from './RouteSection.styles';
import { moderateScale } from '@/styles';

interface RouteSectionProps {
  route: {
    start: string;
    end: string;
    middleStops: string[];
  };
  schedule: {
    date: string | null;
    time: string;
  };
  onEdit: () => void;
}

export const RouteSection: React.FC<RouteSectionProps> = ({ route, schedule, onEdit }) => {
  const theme = useTheme();
  
  return (
    <GlassCard>
      <RouteHeaderRow>
        <RouteLayout>
          <TimelineLine>
            <TimelineDotOutline />
            <TimelineTrack colors={[theme.colors.primary, theme.colors.primary + '40']} />
            <TimelineDotEnd />
          </TimelineLine>
          
          <RouteDetailsStack>
            <RouteStop>
              <StopLabel>Pickup</StopLabel>
              <StopLocation numberOfLines={1}>{route.start}</StopLocation>
              <StopTime>{schedule.date} • {schedule.time}</StopTime>
            </RouteStop>
            
            <RouteStop>
              <StopLabel>Drop-off</StopLabel>
              <StopLocation numberOfLines={1}>{route.end}</StopLocation>
            </RouteStop>
          </RouteDetailsStack>
        </RouteLayout>
        
        <EditButton onPress={onEdit}>
          <Icon name="edit" size={moderateScale(16)} color={theme.colors.primary} />
        </EditButton>
      </RouteHeaderRow>
    </GlassCard>
  );
};
