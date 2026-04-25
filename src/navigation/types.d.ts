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
  VehicleList: undefined;
  VehicleDetails: { vehicleId?: string } | undefined;
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
    type: 'start' | 'destination' | 'middleStop';
    returnTo?: keyof RootStackParamList;
    module?: 'publish' | 'search';
  };
  RouteSelection: undefined;
  MiddleStops: {
    updatedLocation?: { id: string; name: string; address: string };
    type?: string;
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
  RideRouteMap: {
    routePath: string;
    stops: Array<{
      lat: number;
      lon: number;
      name: string;
      sequence: number;
    }>;
    initialStopIndex?: number;
  };
  BookSeatSelection: { rideId: string };
  BookingConfirmed: { rideId: string; bookedSeats?: string[] };
  Settings: undefined;
};