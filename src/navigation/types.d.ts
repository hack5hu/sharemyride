export type RootStackParamList = {
  Login: undefined;
  OTPVerification: {
    phoneNumber: string;
  };
  ProfileSetup: undefined;
  ProfileHub: undefined;
  Dummy: { 
    title: string; 
    activeTab?: string; 
    showBottomNav?: boolean; 
    showBack?: boolean;
    contentKey?: 'about' | 'help' | 'terms';
  };

  EditProfile: undefined;
  TravelPreferences: undefined;
  VehicleDetails: undefined;
  ChatList: undefined;
  ChatDetails: {
    chatId: string;
    name: string;
  };
  SelectLocation: undefined;
};