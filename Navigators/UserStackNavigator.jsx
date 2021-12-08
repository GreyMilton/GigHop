import React from 'react';
import { Text, View} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../components/UserScreen';
import EditEventScreen from '../components/EditEventScreen';
import UsersEventsScreen from '../components/UsersEventsScreen';
import LogInScreen from '../components/LogInScreen';

export default function UserStackNavigator({ navigation }) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
      />
      <Stack.Screen name="EditEventScreen" component={EditEventScreen} />
      <Stack.Screen name="UsersEventsScreen" component={UsersEventsScreen} />
      <Stack.Screen name="Log In" component={LogInScreen} />
    </Stack.Navigator>
  );
}