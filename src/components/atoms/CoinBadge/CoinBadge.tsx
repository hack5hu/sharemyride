import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import {
  BadgeContainer,
  CoinIconWrapper,
  CoinText,
  HelpIconPressable,
} from './CoinBadge.styles';
import { type CoinBadgeProps } from './types.d';

export const CoinBadge: React.FC<CoinBadgeProps> = memo(
  ({
    coins,
    onPress,
    onHelpPress,
    variant = 'header',
    showHelpIcon = false,
    testID = 'coin-badge',
  }) => {
    const theme = useTheme();
    const iconColor = theme.name === 'dark' ? '#FBBF24' : '#B45309';

    return (
      <BadgeContainer
        $variant={variant}
        onPress={onPress}
        disabled={!onPress}
        testID={testID}
      >
        <CoinIconWrapper>
          <Icon name="toll" size={moderateScale(14)} color="#FFFFFF" />
        </CoinIconWrapper>
        <CoinText $variant={variant}>{coins}</CoinText>
        {showHelpIcon && (
          <HelpIconPressable
            onPress={onHelpPress || onPress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel="Coin rules and help"
          >
            <Icon
              name="help-outline"
              size={moderateScale(14)}
              color={iconColor}
            />
          </HelpIconPressable>
        )}
      </BadgeContainer>
    );
  },
);

CoinBadge.displayName = 'CoinBadge';
