import React from 'react';
import { useTheme } from 'styled-components/native';
import {
  BarWrapper,
  SummaryRow,
  SummaryBlock,
  TitleLabel,
  SeatIdLabel,
  MoneyLabelText,
  MoneyValueText,
  SeatCountText,
  SeatCountRow,
  ContinueButton,
  ContinueGradient,
  ContinueText,
  HoldTimerNoteText,
} from './SeatSummaryBar.styles';

export interface SeatSummaryBarProps {
  flow: 'publish' | 'book';
  seatCount: number;
  moneyValue: string;
  summaryTitle: string;
  moneyLabel: string;
  continueLabel: string;
  seatIdLabel?: string;
  holdTimerNote?: string;
  onContinue: () => void;
}

export const SeatSummaryBar: React.FC<SeatSummaryBarProps> = ({
  flow,
  seatCount,
  moneyValue,
  summaryTitle,
  moneyLabel,
  continueLabel,
  seatIdLabel,
  holdTimerNote,
  onContinue,
}) => {
  const theme = useTheme();
  const disabled = seatCount === 0;
  const isBook = flow === 'book';

  return (
    <BarWrapper>
      <SummaryRow>
        <SummaryBlock>
          <TitleLabel
            color={isBook ? theme.colors.primary_container : undefined}
          >
            {summaryTitle}
          </TitleLabel>
          <SeatCountRow>
            <SeatCountText>
              {seatCount} {seatCount === 1 ? 'Seat' : 'Seats'}
            </SeatCountText>
            {isBook && seatIdLabel && (
              <SeatIdLabel>({seatIdLabel})</SeatIdLabel>
            )}
          </SeatCountRow>
        </SummaryBlock>
        {!!moneyValue && (
          <SummaryBlock alignEnd>
            <MoneyLabelText>{moneyLabel}</MoneyLabelText>
            <MoneyValueText isBook={isBook}>{moneyValue}</MoneyValueText>
          </SummaryBlock>
        )}
      </SummaryRow>
      <ContinueButton
        onPress={onContinue}
        activeOpacity={0.9}
        disabled={disabled}
      >
        <ContinueGradient
          colors={[theme.colors.primary_container, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ContinueText>{continueLabel}</ContinueText>
        </ContinueGradient>
      </ContinueButton>
      {isBook && holdTimerNote && (
        <HoldTimerNoteText>{holdTimerNote}</HoldTimerNoteText>
      )}
    </BarWrapper>
  );
};
