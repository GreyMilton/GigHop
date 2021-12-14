import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./Navigators/MainTabNavigator";

import "react-native-gesture-handler";

export default function App({ navigation }) {

  const [currentUser, setCurrentUser] = useState();

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
