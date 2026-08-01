import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { SectionHeader } from '@/components/atoms/SectionHeader';
import { Typography } from '@/components/atoms/Typography';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { RideListItem } from '@/screens/MyRideFlow/1_MyRides/types.d';
import { moderateScale } from '@/styles';
import {
  Container,
  ReviewBanner,
  ReviewTextContainer,
  ReviewButton,
} from './RideListHeader.styles';

export interface PendingReviewInfo {
  rideId: string;
  isDriver: boolean;
  title: string;
  subtitle?: string;
  targetUserId?: string;
  targetUserName?: string;
}

interface RideListHeaderProps {
  activeTab: MyRidesTab;
  draftsCount: number;
  onClearDrafts: () => void;
  requests?: RideListItem[];
  pendingReview?: PendingReviewInfo | null;
  onRatePress?: (review: PendingReviewInfo) => void;
}

export const RideListHeader: React.FC<RideListHeaderProps> = React.memo(
  ({
    activeTab,
    draftsCount,
    onClearDrafts,
    requests = [],
    pendingReview,
    onRatePress,
  }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
      <Container>
        {!!pendingReview && (
          <ReviewBanner>
            <Icon
              name="star-rate"
              size={moderateScale(24)}
              color={theme.colors.primary}
            />
            <ReviewTextContainer>
              <Typography variant="title" size="xs" weight="bold">
                {pendingReview.title}
              </Typography>
              <Typography
                variant="body"
                size="xs"
                color={theme.colors.on_surface_variant}
              >
                {pendingReview.isDriver
                  ? 'Rate your co-riders to keep our community safe & trusted.'
                  : 'Rate your driver to help improve future rides.'}
              </Typography>
            </ReviewTextContainer>
            <ReviewButton
              activeOpacity={0.8}
              onPress={() => onRatePress?.(pendingReview)}
            >
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color={theme.colors.on_primary}
              >
                Rate Now
              </Typography>
            </ReviewButton>
          </ReviewBanner>
        )}

        {activeTab === 'requests' && (
          <>
            {requests.length > 0 && (
              <>
                <SectionHeader
                  title={t('myRides.newRequestsTitle')}
                  badgeLabel={t('myRides.pendingBadge', {
                    count: requests.length,
                  })}
                />
              </>
            )}
          </>
        )}
        {activeTab === 'upcoming' && (
          <>
            <SectionHeader title={t('myRides.publishedRidesTitle')} />
          </>
        )}

        {activeTab === 'drafts' && (
          <SectionHeader
            title={t('myRides.draftsTitle')}
            actionLabel={draftsCount > 0 ? t('myRides.clearAll') : undefined}
            onActionPress={onClearDrafts}
          />
        )}
        {activeTab === 'archive' && (
          <SectionHeader title={t('myRides.completedTitle')} />
        )}
      </Container>
    );
  },
);
