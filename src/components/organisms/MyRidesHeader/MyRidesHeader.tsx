import React from 'react';
import {
  Container,
  TopSection,
  LeftActions,
  TitleText,
  TabNavigation,
  TabButton,
  TabLabel
} from './MyRidesHeader.styles';
import { MyRidesHeaderProps, MyRidesTab } from './types.d';
import { useTranslation } from '@/hooks/useTranslation';

export const MyRidesHeader: React.FC<MyRidesHeaderProps> = ({
  activeTab,
  onTabChange,
  hasRequests = false,
}) => {
  const { t } = useTranslation();

  const TABS: { label: string; value: MyRidesTab }[] = [
    { label: t('myRides.requestsTab'), value: 'requests' },
    { label: t('myRides.upcomingTab'), value: 'upcoming' },
    { label: t('myRides.draftsTab'), value: 'drafts' },
    { label: t('myRides.completedTab'), value: 'completed' },
  ].filter(tab => tab.value !== 'requests' || hasRequests);

  return (
    <Container>
      <TopSection>
        <LeftActions>
          <TitleText>My Rides</TitleText>
        </LeftActions>
      </TopSection>

      <TabNavigation>
        {TABS.map((tab) => (
          <TabButton
            key={tab.value}
            isActive={activeTab === tab.value}
            onPress={() => onTabChange(tab.value)}
            activeOpacity={0.7}
          >
            <TabLabel isActive={activeTab === tab.value}>
              {tab.label}
            </TabLabel>
          </TabButton>
        ))}
      </TabNavigation>
    </Container>
  );
};
