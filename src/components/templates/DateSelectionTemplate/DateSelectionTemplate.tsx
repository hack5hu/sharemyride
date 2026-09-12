import React, { useMemo } from 'react';
import { Button } from '@/components/atoms/Button';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MonthCalendar } from '@/components/organisms/MonthCalendar';
import { useLocale } from '@/constants/localization';
import * as S from './DateSelectionTemplate.styles';

export interface MonthData {
  year: number;
  month: number;
  isCurrentMonth: boolean;
}

export interface DateSelectionTemplateProps {
  onBackPress: () => void;
  months: MonthData[];
  selectedDate?: Date | null;
  selectedDates?: Date[];
  onSelectDate: (date: Date) => void;
  onContinue?: () => void;
}

export const DateSelectionTemplate: React.FC<DateSelectionTemplateProps> = ({
  onBackPress,
  months,
  selectedDate,
  selectedDates,
  onSelectDate,
  onContinue,
}) => {
  const { dateSelection: t } = useLocale();

  const datesArray = useMemo(() => {
    if (selectedDates !== undefined) {
      return selectedDates;
    }
    return selectedDate ? [selectedDate] : [];
  }, [selectedDates, selectedDate]);

  const subtitleText = useMemo(() => {
    if (datesArray.length === 0) {
      return t.subtitle;
    }
    if (datesArray.length === 1) {
      return `1 ${t.selectedDate}`;
    }
    return `${datesArray.length} ${t.datesSelected}`;
  }, [datesArray.length, t]);

  const buttonLabel = useMemo(() => {
    if (datesArray.length > 1) {
      return `${t.next} (${datesArray.length})`;
    }
    return t.next;
  }, [datesArray.length, t.next]);

  return (
    <ScreenShell title={t.headerTitle} onBack={onBackPress}>
      <S.ProgressSection>
        <S.TitleText>{t.title}</S.TitleText>
        <S.SubtitleText>{subtitleText}</S.SubtitleText>
      </S.ProgressSection>

      {/* Scrollable calendar */}
      <S.ScrollContent showsVerticalScrollIndicator={false}>
        {months.map(m => (
          <MonthCalendar
            key={`${m.year}-${m.month}`}
            year={m.year}
            month={m.month}
            isCurrentMonth={m.isCurrentMonth}
            selectedDates={datesArray}
            onSelectDate={onSelectDate}
            daysOfWeek={t.daysOfWeek}
            currentLabel={t.currentLabel}
          />
        ))}
      </S.ScrollContent>

      {onContinue && (
        <S.FloatingFooter>
          <Button
            variant="primary"
            disabled={datesArray.length === 0}
            onPress={onContinue}
          >
            {buttonLabel}
          </Button>
        </S.FloatingFooter>
      )}
    </ScreenShell>
  );
};
