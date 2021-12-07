import React from 'react';
import { Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './MainPage';
import EventPage from './EventPage';

export default function StackNavigator({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="EventPage" component={EventPage} />
    </Stack.Navigator>
  );
}