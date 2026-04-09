import React from 'react';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { MonthCalendar } from '@/components/organisms/MonthCalendar';
import { SelectionPreviewCard } from '@/components/molecules/SelectionPreviewCard';
import { formatSelectedDate } from '@/utils/dateUtils';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './DateSelectionTemplate.styles';

export interface MonthData {
  year: number;
  month: number;
  isCurrentMonth: boolean;
}

export interface DateSelectionTemplateProps {
  onBackPress: () => void;
  onNextPress: () => void;
  months: MonthData[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export const DateSelectionTemplate: React.FC<DateSelectionTemplateProps> = ({
  onBackPress,
  onNextPress,
  months,
  selectedDate,
  onSelectDate,
}) => {
  const theme = useTheme();
  const { dateSelection: t } = useLocale();

  const formattedDate = selectedDate
    ? formatSelectedDate(selectedDate)
    : t.noneSelected;

  return (
    <ScreenShell
      title={t.headerTitle}
      onBack={onBackPress}
      rightElement={
        <S.StepBadge>
          <S.StepBadgeText>{t.stepIndicator}</S.StepBadgeText>
        </S.StepBadge>
      }
    >
      {/* Progress title and bar */}
      <S.ProgressSection>
        <S.ProgressTitleRow>
          <S.TitleText>{t.title}</S.TitleText>
          <S.SubtitleText>{t.subtitle}</S.SubtitleText>
        </S.ProgressTitleRow>
        <S.ProgressBarContainer>
          <S.ProgressBar />
        </S.ProgressBarContainer>
      </S.ProgressSection>

      {/* Scrollable calendar */}
      <S.ScrollContent showsVerticalScrollIndicator={false}>
        {months.map((m) => (
          <MonthCalendar
            key={`${m.year}-${m.month}`}
            year={m.year}
            month={m.month}
            isCurrentMonth={m.isCurrentMonth}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            daysOfWeek={t.daysOfWeek}
            currentLabel={t.currentLabel}
          />
        ))}
      </S.ScrollContent>

      {/* Floating action footer */}
      <S.FloatingFooter>
        <S.FooterGradient
          colors={['transparent', theme.colors.surface, theme.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
        />
        {selectedDate && (
          <SelectionPreviewCard
            label={t.selectedDate}
            value={formattedDate}
          />
        )}
        <S.NextButton
          onPress={onNextPress}
          activeOpacity={0.9}
          disabled={!selectedDate}
        >
          <S.NextGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <S.NextButtonText>{t.next}</S.NextButtonText>
          </S.NextGradient>
        </S.NextButton>
      </S.FloatingFooter>
    </ScreenShell>
  );
};
