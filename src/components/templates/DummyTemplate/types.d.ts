import { BottomTabType } from '@/components/organisms/BottomNav';

export interface DummyTemplateProps {
  title: string;
  activeTab?: BottomTabType;
  showBottomNav?: boolean;
  contentKey?: string;
  content: { title: string; body: string } | null;
  handleEmailSupport: () => void;
  goBack: () => void;
  t: Record<string, string>;
}
