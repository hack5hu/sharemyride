import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  Container, 
  TopSection, 
  LeftActions, 
  MenuButton, 
  TitleText, 
  ProfileWrapper, 
  AvatarImage, 
  TabNavigation, 
  TabButton, 
  TabLabel 
} from './MyRidesHeader.styles';
import { MyRidesHeaderProps, MyRidesTab } from './types.d';
import { moderateScale } from '@/styles';

const TABS: { label: string; value: MyRidesTab }[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Drafts', value: 'drafts' },
  { label: 'Completed', value: 'completed' },
];

export const MyRidesHeader: React.FC<MyRidesHeaderProps> = ({
  activeTab,
  onTabChange,
  onMenuPress,
  onProfilePress,
  userAvatarUri,
}) => {
  const theme = useTheme();

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
