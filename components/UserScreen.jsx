import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getAllUsers } from "../utils/api-requests";

export default function UserScreen({ route, navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [ artistOrVenue, setArtistOrVenue ] = useState(false);

  useEffect(() => {
    setArtistOrVenue(false);
    getAllUsers()
      .then((listOfUsers) => {
        const isArtist = listOfUsers.filter(user => user.artist !== '').map(user => user._id);
        const isVenue = listOfUsers.filter(user => user.venue !== '').map(user => user._id);
        if(isArtist.includes(currentUser._id) || isVenue.includes(currentUser._id)) {
          setArtistOrVenue(true);
        }
      })
  }, []);



  return (
    <View>
      <Text>UserScreen for {currentUser._id}</Text>
      <Button
        title="Go to list of events I have created"
        onPress={() =>
          navigation.navigate('UsersEventsScreen')
        }
      />
      {artistOrVenue ? <Button
        title="My events"
        onPress={() => {
          navigation.navigate("ConfirmationScreen")
        }}
      /> : null}
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