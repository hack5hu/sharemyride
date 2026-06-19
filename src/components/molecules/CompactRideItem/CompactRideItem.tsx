import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import {
  Container,
  IconBox,
  TextContent,
  Title,
  SubAddress,
  PriceText,
  StatusBadge,
  StatusText,
  ReportButton,
  StatusRow,
  ActionIconButton,
} from './CompactRideItem.styles';
import { CompactRideItemProps } from './types.d';
import { moderateScale } from '@/styles';

export const CompactRideItem: React.FC<CompactRideItemProps> = ({
  title,
  subtitle,
  price,
  icon,
  iconBg,
  type,
  statusTag,
  onPress,
  actionIcon,
  onActionPress,
}) => {
  const theme = useTheme();
  const isDraft = type === 'draft';
  const isArchive = type === 'archive';
  const isCompleted =
    type === 'completed' || (isArchive && statusTag !== 'Cancelled');
  const isCancelled = isArchive && statusTag === 'Cancelled';

  const displayIcon = isDraft
    ? 'edit-note'
    : isCancelled
    ? 'close'
    : isCompleted
    ? 'check'
    : icon || 'history';

  const displayIconColor = isDraft
    ? theme.colors.on_surface_variant
    : isCancelled
    ? theme.colors.error
    : isCompleted
    ? theme.colors.primary
    : theme.colors.on_secondary_fixed_variant;

  const displayIconBg = isDraft
    ? theme.colors.surface_container_high
    : isCancelled
    ? theme.colors.error + '15'
    : isCompleted
    ? theme.colors.primary + '15'
    : theme.colors.secondary_fixed;

  return (
    <Container isDraft={isDraft} onPress={onPress} activeOpacity={0.7}>
      <IconBox bgColor={iconBg || displayIconBg}>
        <Icon
          name={displayIcon}
          size={moderateScale(20)}
          color={displayIconColor}
        />
      </IconBox>
      <TextContent>
        <Title numberOfLines={1}>{title}</Title>
        <SubAddress numberOfLines={1}>{subtitle}</SubAddress>
        <StatusRow>
          {statusTag && (
            <StatusBadge isCancelled={isCancelled}>
              <StatusText isCancelled={isCancelled}>{statusTag}</StatusText>
            </StatusBadge>
          )}
          {!isDraft && (
            <ReportButton
              onPress={e => {
                e.stopPropagation();
              }}
              activeOpacity={0.7}
            >
              <Icon
                name="flag"
                size={moderateScale(16)}
                color={theme.colors.error}
              />
            </ReportButton>
          )}
        </StatusRow>
      </TextContent>
      {price && <PriceText>{price}</PriceText>}

      {actionIcon && onActionPress ? (
        <ActionIconButton
          onPress={e => {
            e.stopPropagation();
            onActionPress();
          }}
          activeOpacity={0.6}
        >
          <Icon
            name={actionIcon}
            size={moderateScale(20)}
            color={theme.colors.error}
          />
        </ActionIconButton>
      ) : (
        isDraft && (
          <Icon
            name="arrow-forward"
            size={moderateScale(18)}
            color={theme.colors.primary}
          />
        )
      )}
    </Container>
  );
};
