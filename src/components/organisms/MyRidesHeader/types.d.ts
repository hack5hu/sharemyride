export type MyRidesTab = 'upcoming' | 'ongoing' | 'drafts' | 'completed';

export interface MyRidesHeaderProps {
  activeTab: MyRidesTab;
  onTabChange: (tab: MyRidesTab) => void;
  onMenuPress: () => void;
  onProfilePress: () => void;
  userAvatarUri: string;
}
