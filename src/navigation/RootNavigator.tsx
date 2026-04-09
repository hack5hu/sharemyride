import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/Login';
import { OTPVerificationScreen } from '@/screens/Auth/OTPVerification/OTPVerification.screen';
import { ProfileSetupScreen } from '@/screens/Profile/ProfileSetup';
import { ProfileHubScreen } from '@/screens/Profile/ProfileHub';
import { DummyScreen } from '@/screens/Common/Dummy';
import { EditProfileScreen } from '@/screens/Profile/EditProfile';
import { TravelPreferencesScreen } from '@/screens/Profile/TravelPreferences';
import { VehicleDetailsScreen } from '@/screens/Profile/VehicleDetails';
import { ChatListScreen } from '@/screens/Chat/ChatList';
import { ChatDetailsScreen } from '@/screens/Chat/ChatDetails';
import { SelectLocationScreen } from '@/screens/Chat/SelectLocation';
import { MyRidesScreen } from '@/screens/Chat/MyRides';
import { RideDetailsScreen } from '@/screens/RideDetails';
import { CancelRideScreen } from '@/screens/CancelRide';
import { LocationSelectionScreen } from '@/screens/LocationSelection';
import { MapPickerScreen } from '@/screens/MapPicker';
import { RouteSelectionScreen } from '@/screens/RouteSelection';
import { MiddleStopsScreen } from '@/screens/MiddleStops';
import { MiddleStopMapScreen } from '@/screens/MiddleStopMap';
import { DateSelectionScreen } from '@/screens/DateSelection';
import { TimeSelectionScreen } from '@/screens/TimeSelection';
import { SeatSelectionScreen } from '@/screens/SeatSelection';
import { PriceSelectionScreen } from '@/screens/PriceSelection';
import { RequestTypeScreen } from '@/screens/RequestType';
import { SummaryPublishScreen } from '@/screens/SummaryPublish';
import { PublishSuccessScreen } from '@/screens/PublishSuccess';
import { BookRideInfoScreen } from '@/screens/BookRideInfo';
import { AvailableRidesScreen } from '@/screens/AvailableRides';
import { RideInformationScreen } from '@/screens/RideInformation';
import { RootStackParamList } from './types.d';


const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BookRideInfo"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen as any}
      />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="ProfileHub" component={ProfileHubScreen} />
      <Stack.Screen name="Dummy" component={DummyScreen as any} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="TravelPreferences" component={TravelPreferencesScreen} />
      <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
      <Stack.Screen name="ChatDetails" component={ChatDetailsScreen as any} />
      <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
      <Stack.Screen name="LocationSelection" component={LocationSelectionScreen} />
      <Stack.Screen name="MapPicker" component={MapPickerScreen as any} />
      <Stack.Screen name="RouteSelection" component={RouteSelectionScreen as any} />
      <Stack.Screen name="MiddleStops" component={MiddleStopsScreen as any} />
      <Stack.Screen name="MiddleStopMap" component={MiddleStopMapScreen as any} />
      <Stack.Screen name="DateSelection" component={DateSelectionScreen as any} />
      <Stack.Screen name="TimeSelection" component={TimeSelectionScreen as any} />
      <Stack.Screen name="SeatSelection" component={SeatSelectionScreen as any} />
      <Stack.Screen name="PriceSelection" component={PriceSelectionScreen as any} />
      <Stack.Screen name="MyRides" component={MyRidesScreen} />
      <Stack.Screen name="RideDetails" component={RideDetailsScreen as any} />
      <Stack.Screen 
        name="CancelRide" 
        component={CancelRideScreen as any}
        options={{ presentation: 'transparentModal' }}
      />
      <Stack.Screen name="RequestType" component={RequestTypeScreen} />
      <Stack.Screen name="SummaryPublish" component={SummaryPublishScreen} />
      <Stack.Screen name="PublishSuccess" component={PublishSuccessScreen} />
      <Stack.Screen name="BookRideInfo" component={BookRideInfoScreen} />
      <Stack.Screen name="AvailableRides" component={AvailableRidesScreen} />
      <Stack.Screen name="RideInformation" component={RideInformationScreen} />
    </Stack.Navigator>

  );
};
