import React from 'react';
import { Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../components/UserScreen';
import EditEventScreen from '../components/EditEventScreen';
import UsersEventsScreen from '../components/UsersEventsScreen';
import LogInScreen from '../components/LogInScreen';
import MainTabNavigator from './MainTabNavigator';

export default function UserStackNavigator({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
      />
      <Stack.Screen name="EditEventScreen" component={EditEventScreen} />
      <Stack.Screen name="UsersEventsScreen" component={UsersEventsScreen} />
      {/* <Stack.Screen name="Log In" component={LogInScreen} /> */}
      {/* <Stack.Screen name="Tabs" component={MainTabNavigator} /> */}
    </Stack.Navigator>
  );
}