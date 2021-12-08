import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewEventScreen from './components/NewEventScreen';
import LogInScreen from './components/LogInScreen';
import BottomNav from './components/BottomNav';
import FindGigsStackNavigator from './Navigators/FindGigsStackNavigator';
import UserDrawerNavigator from './Navigators/UserDrawerNavigator';
import FavesScreen from './components/FavesScreen';

import 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = useState({username: "Billy.B.Bob"});

  const printMessage = () => {
    console.log("hello!");
  }

  const CreatePlaceholder = () => (
    <View style={{ flex: 1, backgroundColor: 'blue' }} />
  );
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser}}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true
          }}>
          <Tab.Screen
            name="Find gigs"
            component={FindGigsStackNavigator}
          />
          <Tab.Screen name="TestPlaceHolder" component={CreatePlaceholder}/>
          <Tab.Screen name="Add gig" component={NewEventScreen} />
          <Tab.Screen name="Faves" component={FavesScreen} />
          {currentUser ? <Tab.Screen name={currentUser.username} component={UserDrawerNavigator} onPress={printMessage} /> : <Tab.Screen name="Log in" component={LogInScreen} />}
        </Tab.Navigator>
        {/* // <View style={styles.container}>
        //   <Text>Open up App.js to start working on your app!</Text>
        //   <StatusBar style="auto" />
        // </View> */}
        {/* <BottomNav /> */}
      </NavigationContainer>
    </UserContext.Provider>
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
