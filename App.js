import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainPage from './components/MainPage';
import EventPage from './components/EventPage';
import LogInPage from './components/LogInPage';
import NewEventPage from './components/NewEventPage';
import EditEventPage from './components/EditEventPage';
import UsersEventsPage from './components/UsersEventsPage';
import BottomNav from './components/BottomNav'

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'Welcome' }}
        />
        <Tab.Screen name="EventPage" component={EventPage} />
        <Tab.Screen name="LogInPage" component={LogInPage} />
        <Tab.Screen name="NewEventPage" component={NewEventPage} />
        <Tab.Screen name="EditEventPage" component={EditEventPage} />
        <Tab.Screen name="UsersEventsPage" component={UsersEventsPage} />
      </Tab.Navigator>
      {/* // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      //   <StatusBar style="auto" />
      // </View> */}
      <BottomNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
