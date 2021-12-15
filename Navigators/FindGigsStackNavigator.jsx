import React from 'react';
import { Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../components/MainScreen';
import EventScreen from '../components/EventScreen';
import MultipleEventsScreen from '../components/MultipleEventsScreen';
import ArtistScreen from '../components/ArtistScreen';

export default function FindGigsStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontSize: 18,
      },
      headerTitleAlign: 'left',
    }}>
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: "Find gigs" }}
      />
      <Stack.Screen name="EventScreen" component={EventScreen} options={({ route }) => ({ title: route.params.eventName })}/>
      <Stack.Screen name="MultipleEventsScreen" component={MultipleEventsScreen} />
      <Stack.Screen name="ArtistScreen" component={ArtistScreen} options={({ route }) => ({ title: route.params.eventName})}/>
    </Stack.Navigator>
  );
}