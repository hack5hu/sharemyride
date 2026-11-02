export interface ReferAndEarnTemplateProps {
  coins: number;
  referralCode: string;
  isRulesModalVisible: boolean;
  onBackPress: () => void;
  onCopyCode: () => void;
  onShareWhatsApp: () => void;
  onShareOther: () => void;
  onOpenRulesModal: () => void;
  onCloseRulesModal: () => void;
  onNavigateToLeaderboard?: () => void;
}
