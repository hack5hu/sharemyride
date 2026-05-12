import { ReactNode } from 'react';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';

export interface MyRidesTemplateProps {
  header: ReactNode;
  activeTab: MyRidesTab;
  bottomNav: ReactNode;
}
