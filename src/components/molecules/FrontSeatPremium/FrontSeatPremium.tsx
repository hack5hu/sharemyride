import React, { useCallback } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { calculateFrontSeatPrice } from '@/utils/pricing';
import {
  Wrapper,
  CheckRow,
  CheckboxOuter,
  CheckRowRight,
  CheckTitle,
  CheckTitleText,
  CheckDesc,
  MiniSection,
  MiniRow,
  MiniLabel,
  MiniCounterPill,
  MiniSmallButton,
  MiniAmountText,
  MaxNote,
} from './FrontSeatPremium.styles';

export interface FrontSeatPremiumProps {
  checked: boolean;
  onToggle: () => void;
  premium: number;
  onPremiumChange: (val: number) => void;
  basePrice: number;
  title: string;
  description: string;
  amountLabel: string;
  maxNote: string;
  maximumPremium?: number;
  step?: number;
}

export const FrontSeatPremium: React.FC<FrontSeatPremiumProps> = React.memo(
  ({
    checked,
    onToggle,
    premium,
    onPremiumChange,
    basePrice,
    title,
    description,
    amountLabel,
    maxNote,
    maximumPremium,
    step = 10,
  }) => {
    const theme = useTheme();
    const maxPremium =
      maximumPremium ??
      calculateFrontSeatPrice(basePrice, 10, step) - basePrice;

    const handleDecrement = useCallback(
      () => onPremiumChange(Math.max(0, premium - step)),
      [onPremiumChange, premium, step],
    );
    const handleIncrement = useCallback(
      () => onPremiumChange(Math.min(maxPremium, premium + step)),
      [onPremiumChange, maxPremium, premium, step],
    );

    return (
      <Wrapper>
        <CheckRow onPress={onToggle} activeOpacity={0.8}>
          <CheckboxOuter checked={checked}>
            {checked && (
              <MaterialIcons
                name="check"
                size={moderateScale(14)}
                color={theme.colors.on_primary}
              />
            )}
          </CheckboxOuter>
          <CheckRowRight>
            <CheckTitle>
              <CheckTitleText>{title}</CheckTitleText>
              <MaterialIcons
                name="airline-seat-recline-extra"
                size={moderateScale(22)}
                color={theme.colors.primary}
              />
            </CheckTitle>
            <CheckDesc>{description}</CheckDesc>
          </CheckRowRight>
        </CheckRow>

        {checked && (
          <MiniSection>
            <MiniRow>
              <MiniLabel>{amountLabel}</MiniLabel>
              <MiniCounterPill>
                <MiniSmallButton
                  testID="premium-decrease"
                  onPress={handleDecrement}
                  activeOpacity={0.7}
                  disabled={premium <= 0}
                >
                  <MaterialIcons
                    name="remove"
                    size={moderateScale(16)}
                    color={theme.colors.outline}
                  />
                </MiniSmallButton>
                <MiniAmountText>₹{premium}</MiniAmountText>
                <MiniSmallButton
                  testID="premium-increase"
                  onPress={handleIncrement}
                  activeOpacity={0.7}
                  disabled={premium >= maxPremium}
                >
                  <MaterialIcons
                    name="add"
                    size={moderateScale(16)}
                    color={theme.colors.outline}
                  />
                </MiniSmallButton>
              </MiniCounterPill>
            </MiniRow>
            {premium >= maxPremium && <MaxNote>{maxNote}</MaxNote>}
          </MiniSection>
        )}
      </Wrapper>
    );
  },
);
