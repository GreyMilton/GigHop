import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './components/MainPage';
import EventPage from './components/EventPage';
import LogInPage from './components/LogInPage';
import NewEventPage from './components/NewEventPage';
import EditEventPage from './components/EditEventPage';
import UsersEventsPage from './components/UsersEventsPage';
import BottomNav from './components/BottomNav'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="EventPage" component={EventPage} />
        <Stack.Screen name="LogInPage" component={LogInPage} />
        <Stack.Screen name="NewEventPage" component={NewEventPage} />
        <Stack.Screen name="EditEventPage" component={EditEventPage} />
        <Stack.Screen name="UsersEventsPage" component={UsersEventsPage} />
      </Stack.Navigator>
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
