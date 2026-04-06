import React from 'react';
import { ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale, scale, verticalScale } from '@/styles';
import { TimePickerCard } from '@/components/organisms/TimePickerCard';
import {
  Container,
  TopHeader,
  HeaderLeft,
  BackButton,
  HeaderTitle,
  TitleSection,
  TitleText,
  TitleHighlight,
  SubtitleText,
  FloatingFooter,
  FooterGradient,
  ContinueButton,
  ContinueGradient,
  ContinueText,
  ArrivalNote,
} from './TimeSelectionTemplate.styles';

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
    <Container edges={['top']}>
      {/* Header */}
      <TopHeader>
        <HeaderLeft>
          <BackButton onPress={onBackPress} activeOpacity={0.7}>
            <MaterialIcons
              name="arrow-back"
              size={moderateScale(24)}
              color={theme.colors.primary}
            />
          </BackButton>
          <HeaderTitle>{t.headerTitle}</HeaderTitle>
        </HeaderLeft>
      </TopHeader>

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          // paddingTop: verticalScale(16),
          paddingBottom: verticalScale(120),
        }}
        keyboardShouldPersistTaps="handled"
      >
        <TitleSection>
          <TitleText>
            {t.title}
            {'\n'}
            <TitleHighlight>{t.titleHighlight}</TitleHighlight>
          </TitleText>
          <SubtitleText>{t.subtitle}</SubtitleText>
        </TitleSection>

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
      <FloatingFooter pointerEvents="box-none">
        <FooterGradient
          colors={['transparent', theme.colors.surface, theme.colors.surface]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
        />
        <ContinueButton onPress={onContinuePress} activeOpacity={0.9}>
          <ContinueGradient
            colors={[theme.colors.primary, theme.colors.primary_container]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <ContinueText>{t.continue}</ContinueText>
          </ContinueGradient>
        </ContinueButton>
      </FloatingFooter>
    </Container>
  );
};
