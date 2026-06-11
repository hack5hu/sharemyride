export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTPVerification: {
    phoneNumber: string;
    /** 'truecaller' = finalize a non-Truecaller-user verification via the native
     *  SDK instead of the SMS OTP backend call. Defaults to SMS. */
    mode?: 'sms' | 'truecaller';
    ttl?: string;
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

  TermsAndConditions: undefined;
  AboutUs: undefined;
  HelpAndSupport: undefined;
  EditProfile: undefined;
  TravelPreferences: undefined;
  VehicleList: undefined;
  VehicleDetails: { vehicleId?: string } | undefined;
  ChatList: undefined;
  ChatDetails: {
    userId: string;
    rideId?: string;
    name: string;
    avatarUri?: string;
    rating?: number;
    rideInfo?: {
      pickup: string;
      dropoff: string;
      date: string;
      time: string;
    };
    selectedLocation?: any;
  };
  LocationSelection:
    | {
        updatedLocation?: { id: string; name: string; address: string };
        type?: 'start' | 'destination';
        flow?: 'publish' | 'book';
      }
    | undefined;
  SelectLocation: undefined;
  MapPicker: {
    type: 'start' | 'destination' | 'middleStop';
    returnTo?: keyof RootStackParamList;
    module?: 'publish' | 'search';
  };
  RouteSelection: undefined;
  MiddleStops:
    | {
        updatedLocation?: { id: string; name: string; address: string };
        type?: string;
        returnTo?: keyof RootStackParamList;
      }
    | undefined;
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
    sourceStopId?: number;
    destinationStopId?: number;
    status?: string;
    cancellationReason?: string;
  };
  CancelRide: {
    rideId?: string;
  };
  RequestType: undefined;
  SummaryPublish: undefined;
  PublishSuccess: undefined;
  BookDateSelection: undefined;
  BookRideInfo: undefined;
  LocalRideResults: undefined;
  AvailableRides: undefined;
  RideInformation: {
    rideId: string;
    sourceStopId?: number;
    destinationStopId?: number;
  };
  RideRouteMap: {
    routePath?: string;
    stops?: Array<{
      id?: number | string;
      lat: number;
      lon: number;
      name: string;
      sequence: number;
    }>;
    initialStopIndex?: number;
    sourceStopId?: number | string;
    destinationStopId?: number | string;
    destination?: {
      latitude: number;
      longitude: number;
      name: string;
      address?: string;
    };
    userSearchedPickup?: {
      latitude: number;
      longitude: number;
      name: string;
    };
    userSearchedDropoff?: {
      latitude: number;
      longitude: number;
      name: string;
    };
  };
  BookSeatSelection: {
    rideId: string;
    sourceStopId?: number;
    destinationStopId?: number;
    seats?: any[];
    passengers?: any[];
    vehicleType?: string;
    departureDate?: string;
    departureTime?: string;
  };
  BookingConfirmed: {
    rideId: string;
    bookedSeats?: string[];
    pickupTime?: string;
    vehicleType?: string;
    departureDate?: string;
  };
  Settings: undefined;
  UserProfileDetail: {
    userId: string;
  };
  Rating: {
    rideId: string;
    targetUserId: string;
    targetUserName: string;
    targetUserRole: 'DRIVER' | 'PASSENGER';
  };
};
