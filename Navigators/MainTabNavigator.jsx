import React from 'react';
import { Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewEventScreen from '../components/NewEventScreen';
import LogInScreen from '../components/LogInScreen';
import FindGigsStackNavigator from './FindGigsStackNavigator';
import UserStackNavigator from './UserStackNavigator';
import FavesScreen from '../components/FavesScreen';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function MainTabNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: true
    }}>
      <Tab.Screen
        name="Find gigs"
        component={FindGigsStackNavigator}
      />
      <Tab.Screen name="Add gig" component={NewEventScreen} />
      <Tab.Screen name="Faves" component={FavesScreen} />
      {currentUser ? <Tab.Screen name={currentUser.username} component={UserStackNavigator} /> : <Tab.Screen name="Log in" component={LogInScreen} />}
    </Tab.Navigator>
  );
}