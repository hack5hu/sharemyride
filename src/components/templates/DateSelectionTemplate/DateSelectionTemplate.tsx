import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale } from '@/styles';
import { MonthCalendar } from '@/components/organisms/MonthCalendar';
import { SelectionPreviewCard } from '@/components/molecules/SelectionPreviewCard';
import { formatSelectedDate } from '@/utils/dateUtils';
import {
  Container,
  TopHeader,
  HeaderLeft,
  BackButton,
  HeaderTitle,
  StepBadge,
  StepBadgeText,
  ProgressSection,
  ProgressTitleRow,
  TitleText,
  SubtitleText,
  ProgressBarContainer,
  ProgressBar,
  ScrollContent,
  FloatingFooter,
  FooterGradient,
  NextButton,
  NextGradient,
  NextButtonText,
} from './DateSelectionTemplate.styles';

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
    <Container edges={['top']}>
      {/* Header */}
      <TopHeader>
        <HeaderLeft>
          <BackButton onPress={onBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
          </BackButton>
          <HeaderTitle>{t.headerTitle}</HeaderTitle>
        </HeaderLeft>
        <StepBadge>
          <StepBadgeText>{t.stepIndicator}</StepBadgeText>
        </StepBadge>
      </TopHeader>

      {/* Progress title and bar */}
      <ProgressSection>
        <ProgressTitleRow>
          <TitleText>{t.title}</TitleText>
          <SubtitleText>{t.subtitle}</SubtitleText>
        </ProgressTitleRow>
        <ProgressBarContainer>
          <ProgressBar />
        </ProgressBarContainer>
      </ProgressSection>

      {/* Scrollable calendar */}
      <ScrollContent showsVerticalScrollIndicator={false}>
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
      </ScrollContent>

      {/* Floating action footer */}
      <FloatingFooter>
        <FooterGradient
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
        <NextButton
          onPress={onNextPress}
          activeOpacity={0.9}
          disabled={!selectedDate}
        >
          <NextGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <NextButtonText>{t.next}</NextButtonText>
          </NextGradient>
        </NextButton>
      </FloatingFooter>
    </Container>
  );
};
