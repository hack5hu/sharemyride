import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Container,
  TopSection,
  LeftActions,
  TitleText,
  TabNavigation,
  TabButton,
  TabLabel,
} from './MyRidesHeader.styles';
import { type MyRidesHeaderProps, type MyRidesTab } from './types.d';

export const MyRidesHeader: React.FC<MyRidesHeaderProps> = ({
  activeTab,
  onTabChange,
  hasRequests = false,
}) => {
  const { t } = useTranslation();

  const rawTabs: { label: string; value: MyRidesTab }[] = [
    { label: t('myRides.requestsTab'), value: 'requests' },
    { label: t('myRides.upcomingTab'), value: 'upcoming' },
    { label: t('myRides.draftsTab'), value: 'drafts' },
    { label: t('myRides.archiveTab'), value: 'archive' },
  ];

  const TABS = rawTabs.filter(tab => tab.value !== 'requests' || hasRequests);

  return (
    <Container>
      <TopSection>
        <LeftActions>
          <TitleText>My Rides</TitleText>
        </LeftActions>
      </TopSection>

      <TabNavigation>
        {TABS.map(tab => (
          <TabButton
            key={tab.value}
            isActive={activeTab === tab.value}
            onPress={() => onTabChange(tab.value)}
            activeOpacity={0.7}
          >
            <TabLabel isActive={activeTab === tab.value}>{tab.label}</TabLabel>
          </TabButton>
        ))}
      </TabNavigation>
    </Container>
  );
};
