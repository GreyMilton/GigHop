import React, { useEffect, useState } from 'react';
import { Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../components/UserScreen';
import EditEventScreen from '../components/EditEventScreen';
import UsersEventsScreen from '../components/UsersEventsScreen';
import { CommonActions } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function UserStackNavigator({ navigation }) {
  const Stack = createStackNavigator();

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [blurCount, setBlurCount] = useState(0);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     console.log('blur has happened!');
  //     console.log('navigation state:', navigation.getState());
  //     setBlurCount((prevBlurCount) => {
  //       console.log(prevBlurCount);
  //       return prevBlurCount + 1
  //     })
  //     console.log(blurCount);
  //     navigation.dispatch((currentState) => {
  //       const newState = { ...currentState };
  //       if (newState.routes[3].state) {
  //         newState.routes[3].state.index = 0;
  //       };
  //       console.log("this is newState:", newState);
  //       return CommonActions.reset(newState);
  //     })
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    console.log(blurCount);
  }, [blurCount]);


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        initialParams={{ blurCount: blurCount }}
      />
      <Stack.Screen name="EditEventScreen" component={EditEventScreen} />
      <Stack.Screen name="UsersEventsScreen" component={UsersEventsScreen} />
      {/* <Stack.Screen name="Log In" component={LogInScreen} /> */}
      {/* <Stack.Screen name="Tabs" component={MainTabNavigator} /> */}
    </Stack.Navigator>
  );
}