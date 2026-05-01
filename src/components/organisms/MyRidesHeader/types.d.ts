export type MyRidesTab = 'upcoming' | 'drafts' | 'completed';

export interface MyRidesHeaderProps {
  activeTab: MyRidesTab;
  onTabChange: (tab: MyRidesTab) => void;
  onMenuPress: () => void;
  onProfilePress: () => void;
  userAvatarUri: string;
}
