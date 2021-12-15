import React, { useEffect, useState } from 'react';
import { Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import ConfirmationScreen from '../components/ConfirmationScreen';
import LogInScreen from '../components/LogInScreen';
import NewUserScreen from '../components/NewUserScreen';

export default function LoggedOutStackNavigator() {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  const LoggedOutStack = createStackNavigator();
  return (
    <LoggedOutStack.Navigator screenOptions={{
      headerStyle: {
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontSize: 18,
      },
      headerTitleAlign: 'left',
    }}>
      <LoggedOutStack.Screen
        name="LogInWithinStack"
        component={LogInScreen}
        options={{ title: "Log In" }}
      />
      <LoggedOutStack.Screen name="Sign Up" component={NewUserScreen} />
    </LoggedOutStack.Navigator>
  );
}