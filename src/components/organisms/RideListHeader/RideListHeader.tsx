import React from 'react';
import { SectionHeader } from '@/components/atoms/SectionHeader';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useTranslation } from '@/hooks/useTranslation';
import { RideListItem } from '@/screens/MyRideFlow/1_MyRides/types.d';
import { Container } from './RideListHeader.styles';

interface RideListHeaderProps {
  activeTab: MyRidesTab;
  draftsCount: number;
  onClearDrafts: () => void;
  requests?: RideListItem[];
}

export const RideListHeader: React.FC<RideListHeaderProps> = React.memo(
  ({ activeTab, draftsCount, onClearDrafts, requests = [] }) => {
    const { t } = useTranslation();

    return (
      <Container>
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
