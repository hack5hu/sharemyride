import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/Auth/Login';
import { OTPVerificationScreen } from '@/screens/Auth/OTPVerification/OTPVerification.screen';
import { ProfileSetupScreen } from '@/screens/Profile/ProfileSetup';
import { ProfileHubScreen } from '@/screens/Profile/ProfileHub';
import { UserProfileDetailScreen } from '@/screens/Common/UserProfileDetail';
import { DummyScreen } from '@/screens/Common/Dummy';
import { EditProfileScreen } from '@/screens/Profile/EditProfile';
import { TravelPreferencesScreen } from '@/screens/Profile/TravelPreferences';
import { VehicleListScreen } from '@/screens/Profile/VehicleList';
import { VehicleDetailsScreen } from '@/screens/Profile/VehicleDetails';
import { ChatListScreen } from '@/screens/Chat/1_ChatList';
import { ChatDetailsScreen } from '@/screens/Chat/2_ChatDetails';
import { SelectLocationScreen } from '@/screens/Chat/3_SelectLocation';
import { MyRidesScreen } from '@/screens/MyRideFlow/1_MyRides';
import { RideDetailsScreen } from '@/screens/MyRideFlow/2_RideDetails';
import { CancelRideScreen } from '@/screens/CancelRide';
import { LocationSelectionScreen } from '@/screens/PublishFlow/1_LocationSelection';
import { MapPickerScreen } from '@/screens/MapPicker';
import { RouteSelectionScreen } from '@/screens/PublishFlow/2_RouteSelection';
import { MiddleStopsScreen } from '@/screens/PublishFlow/3_MiddleStops';
import { MiddleStopMapScreen } from '@/screens/PublishFlow/3.1_MiddleStopMap';
import { DateSelectionScreen } from '@/screens/PublishFlow/4_DateSelection';
import { TimeSelectionScreen } from '@/screens/PublishFlow/5_TimeSelection';
import { SeatSelectionScreen } from '@/screens/PublishFlow/6_SeatSelection';
import { PriceSelectionScreen } from '@/screens/PublishFlow/7_PriceSelection';
import { RequestTypeScreen } from '@/screens/PublishFlow/8_RequestType';
import { SummaryPublishScreen } from '@/screens/PublishFlow/9_SummaryPublish';
import { PublishSuccessScreen } from '@/screens/PublishFlow/10_PublishSuccess';
import { BookRideInfoScreen } from '@/screens/BookFlow/1_BookRideInfo';
import { LocalRideResultsScreen } from '@/screens/BookFlow/4.1_LocalRideResults';
import { RideInformationScreen } from '@/screens/BookFlow/4_RideInformation';
import { BookingConfirmedScreen } from '@/screens/BookFlow/7_BookingConfirmed';
import { SettingsScreen } from '@/screens/Settings';
import { RootStackParamList } from './types.d';
import { useAuthStore } from '@/store/useAuthStore';
import { BookDateSelectionScreen } from '@/screens/BookFlow/2_BookDateSelection/BookDateSelection.screen';
import AvailableRidesScreen from '@/screens/BookFlow/3_AvailableRides';
import RideRouteMapScreen from '@/screens/BookFlow/5_RideRouteMap';
import { BookSeatSelectionScreen } from '@/screens/BookFlow/6_BookSeatSelection';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isProfileCompleted } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      {!isAuthenticated ? (
        // ── Auth Stack ──────────────────────────────────────────────────────────
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="OTPVerification"
            component={OTPVerificationScreen as any}
          />
        </>
      ) : !isProfileCompleted ? (
        // ── Mandatory Profile Setup ─────────────────────────────────────────────
        <Stack.Screen
          name="ProfileSetup"
          component={ProfileSetupScreen}
          options={{
            gestureEnabled: false, // Prevent back swipe on iOS
          }}
        />
      ) : (
        // ── Main App Stack ──────────────────────────────────────────────────────
        <>
          <Stack.Screen name="BookRideInfo" component={BookRideInfoScreen} />
          <Stack.Screen name="LocalRideResults" component={LocalRideResultsScreen} />
          <Stack.Screen name="AvailableRides" component={AvailableRidesScreen} />
          <Stack.Screen name="RideInformation" component={RideInformationScreen} />
          <Stack.Screen name="RideRouteMap" component={RideRouteMapScreen as any} />
          <Stack.Screen name="BookSeatSelection" component={BookSeatSelectionScreen as any} />
          <Stack.Screen name="BookingConfirmed" component={BookingConfirmedScreen} />
          <Stack.Screen name="ProfileHub" component={ProfileHubScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="TravelPreferences" component={TravelPreferencesScreen} />
          <Stack.Screen name="VehicleList" component={VehicleListScreen} />
          <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen as any} />
          <Stack.Screen name="ChatList" component={ChatListScreen} />
          <Stack.Screen name="ChatDetails" component={ChatDetailsScreen as any} />
          <Stack.Screen name="SelectLocation" component={SelectLocationScreen} />
          <Stack.Screen name="LocationSelection" component={LocationSelectionScreen} />
          <Stack.Screen name="BookDateSelection" component={BookDateSelectionScreen as any} />
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
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Dummy" component={DummyScreen as any} />
          <Stack.Screen name="UserProfileDetail" component={UserProfileDetailScreen as any} />
        </>
      )}
    </Stack.Navigator>
  );
};
