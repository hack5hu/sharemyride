export interface TravelPreferencesTemplateProps {
  preferences: any;
  musicOptions: string[];
  togglePreference: any;
  toggleMusicPreference: (option: string) => void;
  updateWaitingTime: (time: number) => void;
  handleSave: () => void;
  isLoading: boolean;
  goBack: () => void;
  t: any;
  theme: any;
}
