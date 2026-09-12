import React, { useMemo } from 'react';
import { Button } from '@/components/atoms/Button';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { MonthCalendar } from '@/components/organisms/MonthCalendar';
import { useLocale } from '@/constants/localization';
import { scale, verticalScale } from '@/styles';
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
  isMultiSelect?: boolean;
}

export const DateSelectionTemplate: React.FC<DateSelectionTemplateProps> = ({
  onBackPress,
  months,
  selectedDate,
  selectedDates,
  onSelectDate,
  onContinue,
  isMultiSelect,
}) => {
  const { dateSelection: t } = useLocale();

  const isMulti = isMultiSelect ?? Boolean(selectedDates);

  const datesArray = useMemo(() => {
    if (isMulti && selectedDates !== undefined) {
      return selectedDates;
    }
    return selectedDate ? [selectedDate] : [];
  }, [isMulti, selectedDates, selectedDate]);

  const subtitleText = useMemo(() => {
    if (!isMulti) {
      return t.subtitle;
    }
    if (datesArray.length === 0) {
      return t.subtitle;
    }
    if (datesArray.length === 1) {
      return `1 ${t.selectedDate}`;
    }
    return `${datesArray.length} ${t.datesSelected}`;
  }, [isMulti, datesArray.length, t]);

  const buttonLabel = useMemo(() => {
    if (isMulti && datesArray.length > 1) {
      return `${t.next} (${datesArray.length})`;
    }
    return t.next;
  }, [isMulti, datesArray.length, t.next]);

  return (
    <ScreenShell title={t.headerTitle} onBack={onBackPress}>
      <S.ProgressSection>
        <S.TitleText>{t.title}</S.TitleText>
        <S.SubtitleText>{subtitleText}</S.SubtitleText>
      </S.ProgressSection>

      {/* Scrollable calendar */}
      <S.ScrollContent
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          paddingBottom: onContinue ? verticalScale(160) : verticalScale(32),
        }}
      >
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
