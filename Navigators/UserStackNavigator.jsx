import React, { useEffect, useState } from 'react';
import { Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../components/UserScreen';
import EditEventScreen from '../components/EditEventScreen';
import UsersEventsScreen from '../components/UsersEventsScreen';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import ConfirmationScreen from '../components/ConfirmationScreen';

export default function UserStackNavigator() {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const UserStack = createStackNavigator();
  return (
    <UserStack.Navigator screenOptions={{
      headerStyle: {
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontSize: 18,
      },
      headerTitleAlign: 'left',
    }}>
      <UserStack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: `${currentUser._id}` }}
      />
      <UserStack.Screen name="EditEventScreen" component={EditEventScreen} />
      <UserStack.Screen name="UsersEventsScreen" component={UsersEventsScreen} />
      <UserStack.Screen name="ConfirmationScreen" component={ConfirmationScreen} options={{ title: "Gigs Confirmation" }}/>
    </UserStack.Navigator>
  );
}