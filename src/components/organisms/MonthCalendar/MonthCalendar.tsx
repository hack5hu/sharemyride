import React from 'react';
import { useTheme } from 'styled-components/native';
import { getMonthDays, getMonthName, isSameDate, isDatePast } from '@/utils/dateUtils';
import {
  MonthContainer,
  MonthHeader,
  MonthTitle,
  CurrentBadge,
  DaysGrid,
  DayHeaderCell,
  DayHeaderText,
  DayCell,
  DayButton,
  DaySelectedGradient,
  DayText,
} from './MonthCalendar.styles';

export interface MonthCalendarProps {
  year: number;
  month: number;
  isCurrentMonth: boolean;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  daysOfWeek: string[];
  currentLabel: string;
}

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  year,
  month,
  isCurrentMonth,
  selectedDate,
  onSelectDate,
  daysOfWeek,
  currentLabel,
}) => {
  const theme = useTheme();
  const days = getMonthDays(year, month);
  const monthName = getMonthName(year, month);

  return (
    <MonthContainer>
      <MonthHeader>
        <MonthTitle>{monthName}</MonthTitle>
        {isCurrentMonth && <CurrentBadge>{currentLabel}</CurrentBadge>}
      </MonthHeader>

      <DaysGrid>
        {daysOfWeek.map((day) => (
          <DayHeaderCell key={day}>
            <DayHeaderText>{day}</DayHeaderText>
          </DayHeaderCell>
        ))}

        {days.map((day, index) => {
          if (day === null) {
            return <DayCell key={`empty-${index}`} />;
          }

          const date = new Date(year, month, day);
          const isPast = isDatePast(date);
          const isSelected = isSameDate(date, selectedDate);

          return (
            <DayCell key={`day-${day}`}>
              <DayButton
                isSelected={isSelected}
                isDisabled={isPast}
                onPress={() => !isPast && onSelectDate(date)}
                activeOpacity={0.7}
              >
                {isSelected ? (
                  <DaySelectedGradient
                    colors={[theme.colors.primary, theme.colors.primary_container]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <DayText isSelected isDisabled={false}>{day}</DayText>
                  </DaySelectedGradient>
                ) : (
                  <DayText isSelected={false} isDisabled={isPast}>{day}</DayText>
                )}
              </DayButton>
            </DayCell>
          );
        })}
      </DaysGrid>
    </MonthContainer>
  );
};
