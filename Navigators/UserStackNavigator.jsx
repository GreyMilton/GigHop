import React, { useEffect, useState } from 'react';
import { Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../components/UserScreen';
import EditEventScreen from '../components/EditEventScreen';
import UsersEventsScreen from '../components/UsersEventsScreen';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function UserStackNavigator() {

  const { currentUser, setCurrentUser } = useContext(UserContext);

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
        name="UserScreen"
        component={UserScreen}
        options={{ title: `${currentUser.username}` }}
      />
      <Stack.Screen name="EditEventScreen" component={EditEventScreen} />
      <Stack.Screen name="UsersEventsScreen" component={UsersEventsScreen} />
      {/* <Stack.Screen name="Log In" component={LogInScreen} /> */}
      {/* <Stack.Screen name="Tabs" component={MainTabNavigator} /> */}
    </Stack.Navigator>
  );
}