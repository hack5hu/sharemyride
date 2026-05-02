export type MyRidesTab = 'requests' | 'upcoming' | 'drafts' | 'completed';

export interface MyRidesHeaderProps {
  activeTab: MyRidesTab;
  onTabChange: (tab: MyRidesTab) => void;
  onMenuPress: () => void;
  onProfilePress: () => void;
  userAvatarUri: string;
  hasRequests?: boolean;
}
