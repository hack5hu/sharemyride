export type MyRidesTab = 'requests' | 'upcoming' | 'drafts' | 'archive';

export interface MyRidesHeaderProps {
  activeTab: MyRidesTab;
  onTabChange: (tab: MyRidesTab) => void;
  onMenuPress: () => void;
  onProfilePress: () => void;
  userAvatarUri: string;
  hasRequests?: boolean;
}
