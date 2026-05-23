import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { 
  GlassCard, 
  SectionHeader, 
  SectionLabel, 
  RouteLayout, 
  RouteRow,
  IndicatorColumn,
  TimelineDotOutline, 
  TimelineTrack, 
  TimelineDotMiddle, 
  TimelineDotEnd, 
  RouteStop, 
  StopLabel, 
  StopLocation,
  EditButton
} from './RouteSummary.styles';
import { moderateScale } from '@/styles';
import { useTranslation } from '@/hooks/useTranslation';

interface RouteSummaryProps {
  route: {
    start: string;
    end: string;
    middleStops?: string[] | null;
  };
  onEdit: () => void;
  t: any;
}

export const RouteSummary: React.FC<RouteSummaryProps> = ({ route, onEdit, t: st }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <GlassCard>
      <SectionHeader>
        <SectionLabel>{st.routeSummaryLabel}</SectionLabel>
        <EditButton onPress={onEdit} activeOpacity={0.7}>
          <Icon name="edit" size={moderateScale(16)} color={theme.colors.primary} />
        </EditButton>
      </SectionHeader>
      
      <RouteLayout>
        {/* Departure Stop */}
        <RouteRow>
          <IndicatorColumn>
            <TimelineTrack 
              isFirst 
              colors={[theme.colors.primary, theme.colors.outline]} 
            />
            <TimelineDotOutline />
          </IndicatorColumn>
          <RouteStop>
            <StopLabel>{st.departureLabel}</StopLabel>
            <StopLocation numberOfLines={1}>{route.start}</StopLocation>
          </RouteStop>
        </RouteRow>

        {/* Middle Stops */}
        {(route.middleStops || []).map((stop, i) => {
          const isLastStop = i === (route.middleStops?.length || 0) - 1;
          return (
            <RouteRow key={`stop-${i}`}>
              <IndicatorColumn>
                <TimelineTrack 
                  colors={[
                    theme.colors.outline,
                    isLastStop ? theme.colors.primary : theme.colors.outline
                  ]} 
                />
                <TimelineDotMiddle />
              </IndicatorColumn>
              <RouteStop>
                <StopLabel>{t('common.stop', { number: i + 1 })}</StopLabel>
                <StopLocation numberOfLines={1}>{stop}</StopLocation>
              </RouteStop>
            </RouteRow>
          );
        })}

        {/* Arrival Stop */}
        <RouteRow $isLast>
          <IndicatorColumn>
            <TimelineTrack 
              isLast 
              colors={[theme.colors.primary, theme.colors.primary]} 
            />
            <TimelineDotEnd />
          </IndicatorColumn>
          <RouteStop>
            <StopLabel>{st.arrivalLabel}</StopLabel>
            <StopLocation numberOfLines={1}>{route.end}</StopLocation>
          </RouteStop>
        </RouteRow>
      </RouteLayout>
    </GlassCard>
  );
};
