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
import { RootStackParamList } from './types.d';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
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
    </Stack.Navigator>
  );
};
