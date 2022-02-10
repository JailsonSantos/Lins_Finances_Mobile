import React from 'react';

// Stack Navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen SignIn
/* import { Splash } from '../screens/Splash'; */
import { SignIn } from '../screens/SignIn';

const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*       <Stack.Screen name="Splash" component={Splash} /> */}
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}