import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewEventScreen from '../components/NewEventScreen';
import LogInScreen from '../components/LogInScreen';
import FindGigsStackNavigator from './FindGigsStackNavigator';
import UserStackNavigator from './UserStackNavigator';
import FavesScreen from '../components/FavesScreen';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import NewUserScreen from '../components/NewUserScreen';
import tabNavigatorStyles from '../style-documents/navigators-styling';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import LoggedOutStackNavigator from './LoggedOutStackNavigator';

export default function MainTabNavigator() {
  const Tab = createBottomTabNavigator();

  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <Tab.Navigator
    screenOptions={{
      headerStyle: {
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontSize: 18,
      },
      headerTitleAlign: 'left',
      tabBarStyle: tabNavigatorStyles.tabBar,
      tabBarLabelStyle: tabNavigatorStyles.tabBarLabel,
      tabBarIconStyle: tabNavigatorStyles.tabBarIcon,
      tabBarItemStyle: tabNavigatorStyles.tabBarItem
    }}>
      <Tab.Screen
        name="Find gigs"
        component={FindGigsStackNavigator}
        options={{headerShown: false, tabBarIcon: ({ focused, color, size }) => {
          return <MaterialCommunityIcons name="map-search" size={28} color="black" />;
        } }}
      />
      { currentUser ? 
      <Tab.Screen name="Add gig" component={NewEventScreen} options={{tabBarIcon: ({ focused, color, size }) => {
          return <MaterialCommunityIcons name="plus" size={30} color="black" />;
        } }}
      /> : null
      }
      {currentUser ? <Tab.Screen name={currentUser._id} component={UserStackNavigator} options={{headerShown: false, tabBarIcon: ({ focused, color, size }) => {
          return (
            currentUser.picture ? 
            <Image style={tabNavigatorStyles.userAvatar} source={{ uri: currentUser.picture}} /> :
            <FontAwesome5 name="smile" size={24} color="black" />
          );
        } }}/> : <Tab.Screen name="Log In" component={LoggedOutStackNavigator} options={{headerShown: false, tabBarIcon: ({ focused, color, size }) => {
          return <MaterialCommunityIcons name="login" size={30} color="black" />
        } }}/>
      }
    </Tab.Navigator>
  );
}