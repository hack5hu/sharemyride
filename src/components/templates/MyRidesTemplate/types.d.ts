import { ReactNode } from 'react';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader';

export interface MyRidesTemplateProps {
  header: ReactNode;
  activeTab: MyRidesTab;
  upcomingSection: ReactNode;
  draftsSection: ReactNode;
  completedSection: ReactNode;
  highlightsSection: ReactNode;
  bottomNav: ReactNode;
  onAddPress: () => void;
}
