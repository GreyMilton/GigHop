import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function UserScreen({ route, navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <View>
      <Text>UserScreen for {currentUser.username}</Text>
      <Button
        title="Go to list of events I have created"
        onPress={() =>
          navigation.navigate('UsersEventsScreen')
        }
      />
      <Button
        title="Log Out"
        onPress={() => {
            setCurrentUser();
            navigation.navigate('Find gigs');
            }}
      />
    </View>
  );
}