import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/Login';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
