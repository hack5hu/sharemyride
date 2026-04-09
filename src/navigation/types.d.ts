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
  LocationSelection: {
    updatedLocation?: { id: string; name: string; address: string };
    type?: 'start' | 'destination';
    flow?: 'publish' | 'book';
  } | undefined;
  SelectLocation: undefined;
  MapPicker: {
    type: 'start' | 'destination';
    returnTo?: keyof RootStackParamList;
  };
  RouteSelection: undefined;
  MiddleStops: {
    newStop?: { id: string; name: string };
  } | undefined;
  MiddleStopMap: undefined;
  DateSelection: undefined;
  TimeSelection: undefined;
  SeatSelection: {
    flow: 'publish' | 'book';
  };
  PriceSelection: undefined;
  MyRides: undefined;
  RideDetails: {
    rideId: string;
  };
  CancelRide: {
    rideId?: string;
  };
  RequestType: undefined;
  SummaryPublish: undefined;
  PublishSuccess: undefined;
  BookRideInfo: undefined;
  AvailableRides: undefined;
  RideInformation: { rideId: string };
  BookingConfirmed: { rideId: string };
};