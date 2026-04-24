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
  months: MonthData[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export const DateSelectionTemplate: React.FC<DateSelectionTemplateProps> = ({
  onBackPress,
  months,
  selectedDate,
  onSelectDate,
}) => {
  const { dateSelection: t } = useLocale();

  return (
    <ScreenShell
      title={"Select a date"}
      onBack={onBackPress}
    >
      <S.ProgressSection>
        <S.TitleText>{t.title}</S.TitleText>
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
    </ScreenShell>
  );
};
