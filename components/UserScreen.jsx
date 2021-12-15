import React, { useEffect } from 'react';
import { Text, View, Pressable, Image } from 'react-native';
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getAllUsers } from "../utils/api-requests";
import userScreenStyles from '../style-documents/user-screen-styling';
import { ScrollView } from 'react-native-gesture-handler';

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
    <ScrollView style={userScreenStyles.userScreenOuterContainer} >
      <View style={userScreenStyles.userScreenContainer}>
        <Image
          style={userScreenStyles.userPicture}
          source={{ uri: currentUser.picture}}
        />
        <View style={userScreenStyles.recycledTabNavButtonsContainer} >
          <Pressable style={userScreenStyles.UserScreenButtonAndroid}
            onPress={() =>
              navigation.navigate('Find gigs')
            }
          >
            <Text style={userScreenStyles.UserScreenButtonTextAndroid}>Find Gigs</Text>
          </Pressable>
          <Pressable style={userScreenStyles.UserScreenButtonAndroid}
            onPress={() =>
              navigation.navigate('Add gig')
            }
          >
            <Text style={userScreenStyles.UserScreenButtonTextAndroid}>Add a New Gig</Text>
          </Pressable>
        </View>
        <View style={userScreenStyles.userScreenButtonsContainer}>
          <Pressable style={userScreenStyles.UserScreenButtonAndroid}
            onPress={() =>
              navigation.navigate('UsersEventsScreen')
            }
          >
            <Text style={userScreenStyles.UserScreenButtonTextAndroid}>My Submitted Gigs</Text>
          </Pressable>
          {artistOrVenue ? <>
            <Text style={userScreenStyles.userScreenPrompt} >View the gigs I have submitted to Gig Hop</Text>
          <Pressable style={userScreenStyles.UserScreenButtonAndroid}
            onPress={() => {
              navigation.navigate("ConfirmationScreen")
            }}
          >
            <Text style={userScreenStyles.UserScreenButtonTextAndroid}>Gigs To Confirm</Text>
          </Pressable>
          <Text style={userScreenStyles.userScreenPrompt}>Gigs requiring further confirmation to appear on Gig Hop</Text>
          </>
          : null}
        </View>
        <View style={userScreenStyles.userScreenLogOutButtonContainer} >
          <Pressable style={userScreenStyles.UserScreenLogOutButtonAndroid}
            onPress={() => {
                setCurrentUser();
                navigation.navigate('Find gigs');
                }}
          >
            <Text style={userScreenStyles.UserScreenButtonTextAndroid}>Log Out</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}