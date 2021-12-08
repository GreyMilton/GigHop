import React from 'react';
import { Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../components/MainScreen';
import EventScreen from '../components/EventScreen';

export default function FindGigsStackNavigator({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen name="EventScreen" component={EventScreen} />
    </Stack.Navigator>
  );
}