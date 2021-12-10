import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './Navigators/MainTabNavigator';

import 'react-native-gesture-handler';

export default function App() {
  const initialUser = {
    "_id": "61ae22728d70b95db023dbdc",
    "username": "JamesRod7",
    "picture": "https://static.standard.co.uk/2021/05/28/17/newFile.jpg?width=968&auto=webp&quality=75&crop=968%3A645%2Csmart",
    "artist": true,
    "venue": false,
    "events": []
  }

  const [currentUser, setCurrentUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser}}>
      <NavigationContainer>
        <MainTabNavigator />
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
