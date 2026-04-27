import React from 'react';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './SummaryPublishTemplate.styles';
import { RouteSummary } from './components/RouteSummary';
import { ScheduleCard } from './components/ScheduleCard';
import { GridInfo } from './components/GridInfo';
import { PreferenceList } from './components/PreferenceList';
import { PublishFooter } from './components/PublishFooter';

export interface SummaryPublishTemplateProps {
  route: {
    start: string;
    end: string;
    middleStops?: string[] | null;
  };
  schedule: {
    date: string | null;
    time: string | null;
  };
  vehicle: {
    name: string;
    subText: string;
    icon: string;
    numberplate: string;
  } | null;
  pricing: {
    seatCount: number;
    pricePerSeat: string;
  };
  preferences: {
    id: string;
    label: string;
    icon: string;
  }[] | null;
  isPublishing?: boolean;
  onBack: () => void;
  onSave: () => void;
  onPublish: () => void;
  onEditRoute: () => void;
  onEditSchedule: () => void;
  onEditVehicle: () => void;
  onEditSeats: () => void;
  onEditPreferences: () => void;
  validationError?: string | null;
  canPublish?: boolean;
}

export const SummaryPublishTemplate: React.FC<SummaryPublishTemplateProps> = ({
  route,
  schedule,
  vehicle,
  pricing,
  preferences,
  onBack,
  onSave,
  onPublish,
  onEditRoute,
  onEditSchedule,
  onEditVehicle,
  onEditSeats,
  onEditPreferences,
  isPublishing,
  validationError,
  canPublish = true,
}) => {
  const { summaryPublish: t } = useLocale();

  return (
    <ScreenShell
      title={t.headerTitle}
      onBack={onBack}
      rightElement={
        <S.SaveButton onPress={onSave} activeOpacity={0.7}>
          <S.SaveText>Save</S.SaveText>
        </S.SaveButton>
      }
    >
      <S.BackgroundBubble top="8%" left="-5%" />

      <S.Content>
        <S.TitleSection>
          <S.PageTitle>{t.title}</S.PageTitle>
          <S.PageSubtitle>{t.subtitle}</S.PageSubtitle>
        </S.TitleSection>

        <RouteSummary route={route} onEdit={onEditRoute} t={t} />

        <ScheduleCard 
          schedule={schedule} 
          validationError={validationError} 
          onEdit={onEditSchedule} 
          t={t} 
        />

        <GridInfo 
          vehicle={vehicle} 
          pricing={pricing} 
          onEditVehicle={onEditVehicle} 
          onEditSeats={onEditSeats} 
          t={t} 
        />

        <PreferenceList 
          preferences={preferences} 
          onEdit={onEditPreferences} 
          t={t} 
        />
      </S.Content>

      <PublishFooter 
        isPublishing={isPublishing} 
        validationError={validationError} 
        canPublish={canPublish} 
        onPublish={onPublish} 
        t={t} 
      />
    </ScreenShell>
  );
};
