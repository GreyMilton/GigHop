import React from 'react';
import { Text, View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserScreen from '../components/UserScreen';
import EditEventScreen from '../components/EditEventScreen';
import UsersEventsScreen from '../components/UsersEventsScreen';
import LogInScreen from '../components/LogInScreen';

export default function UserDrawerNavigator({ navigation }) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="UserScreen"
        component={UserScreen}
      />
      <Drawer.Screen name="EditEventScreen" component={EditEventScreen} />
      <Drawer.Screen name="UsersEventsScreen" component={UsersEventsScreen} />
      <Drawer.Screen name="Log In" component={LogInScreen} />
    </Drawer.Navigator>
  );
}