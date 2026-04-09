import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { scale, verticalScale } from '@/styles';
import { TimePickerCard } from '@/components/organisms/TimePickerCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './TimeSelectionTemplate.styles';

export interface TimeSelectionTemplateProps {
  selectedHour: number;
  selectedMinute: number;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onBackPress: () => void;
  onContinuePress: () => void;
  minHour?: number;
  minMinute?: number;
}

export const TimeSelectionTemplate: React.FC<TimeSelectionTemplateProps> = ({
  selectedHour,
  selectedMinute,
  onHourChange,
  onMinuteChange,
  onBackPress,
  onContinuePress,
  minHour,
  minMinute,
}) => {
  const theme = useTheme();
  const { timeSelection: t } = useLocale();

  return (
    <ScreenShell
      title={t.headerTitle}
      onBack={onBackPress}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          paddingBottom: verticalScale(120),
        }}
        keyboardShouldPersistTaps="handled"
      >
        <S.TitleSection>
          <S.TitleText>
            {t.title}
            {'\n'}
            <S.TitleHighlight>{t.titleHighlight}</S.TitleHighlight>
          </S.TitleText>
          <S.SubtitleText>{t.subtitle}</S.SubtitleText>
        </S.TitleSection>

        <TimePickerCard
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onHourChange={onHourChange}
          onMinuteChange={onMinuteChange}
          minHour={minHour}
          minMinute={minMinute}
        />
      </ScrollView>

      {/* Floating footer */}
      <S.FloatingFooter pointerEvents="box-none">
        <S.FooterGradient
          colors={['transparent', theme.colors.surface, theme.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
        />
        <S.ContinueButton onPress={onContinuePress} activeOpacity={0.9}>
          <S.ContinueGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <S.ContinueText>{t.continue}</S.ContinueText>
          </S.ContinueGradient>
        </S.ContinueButton>
      </S.FloatingFooter>
    </ScreenShell>
  );
};
