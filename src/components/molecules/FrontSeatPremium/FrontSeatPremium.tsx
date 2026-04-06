import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { CounterButton } from '@/components/atoms/CounterButton';

const Wrapper = styled.View`
  gap: ${verticalScale(0)}px;
`;

const CheckRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(14)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(18)}px;
  border-radius: ${moderateScale(12)}px;
`;

const CheckboxOuter = styled.View<{ checked: boolean }>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(6)}px;
  border-width: 2px;
  border-color: ${({ theme, checked }) => checked ? theme.colors.primary : theme.colors.outline_variant};
  background-color: ${({ theme, checked }) => checked ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-top: ${moderateScale(1)}px;
`;

const CheckRowRight = styled.View`
  flex: 1;
`;

const CheckTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(4)}px;
`;

const CheckTitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const CheckDesc = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(18)}px;
`;

/* Mini counter section — shown when checked */
const MiniSection = styled.View`
  padding-left: ${scale(38)}px;
  padding-right: ${scale(4)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => `${theme.colors.primary}1A`};
  gap: ${verticalScale(6)}px;
  margin-top: ${verticalScale(4)}px;
`;

const MiniRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MiniLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const MiniCounterPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 9999px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 4px;
  elevation: 1;
`;

const MiniSmallButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const MiniAmountText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  min-width: ${scale(36)}px;
  text-align: center;
`;

const MaxNote = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.tertiary};
`;

const PREMIUM_STEP = 5;

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
}

export const FrontSeatPremium: React.FC<FrontSeatPremiumProps> = ({
  checked,
  onToggle,
  premium,
  onPremiumChange,
  basePrice,
  title,
  description,
  amountLabel,
  maxNote,
}) => {
  const theme = useTheme();
  const maxPremium = Math.floor(basePrice * 0.1);
  const isMax = premium >= maxPremium;

  const handleDecrement = () => onPremiumChange(Math.max(PREMIUM_STEP, premium - PREMIUM_STEP));
  const handleIncrement = () => onPremiumChange(Math.min(maxPremium, premium + PREMIUM_STEP));

  return (
    <Wrapper>
      <CheckRow onPress={onToggle} activeOpacity={0.8}>
        <CheckboxOuter checked={checked}>
          {checked && <MaterialIcons name="check" size={moderateScale(14)} color={theme.colors.on_primary} />}
        </CheckboxOuter>
        <CheckRowRight>
          <CheckTitle>
            <CheckTitleText>{title}</CheckTitleText>
            <MaterialIcons name="airline-seat-recline-extra" size={moderateScale(22)} color={theme.colors.primary} />
          </CheckTitle>
          <CheckDesc>{description}</CheckDesc>
        </CheckRowRight>
      </CheckRow>

      {checked && (
        <MiniSection>
          <MiniRow>
            <MiniLabel>{amountLabel}</MiniLabel>
            <MiniCounterPill>
              <MiniSmallButton onPress={handleDecrement} activeOpacity={0.7} disabled={premium <= PREMIUM_STEP}>
                <MaterialIcons name="remove" size={moderateScale(16)} color={theme.colors.outline} />
              </MiniSmallButton>
              <MiniAmountText>₹{premium}</MiniAmountText>
              <MiniSmallButton onPress={handleIncrement} activeOpacity={0.7} disabled={isMax}>
                <MaterialIcons name="add" size={moderateScale(16)} color={theme.colors.outline} />
              </MiniSmallButton>
            </MiniCounterPill>
          </MiniRow>
          {isMax && <MaxNote>{maxNote}</MaxNote>}
        </MiniSection>
      )}
    </Wrapper>
  );
};
