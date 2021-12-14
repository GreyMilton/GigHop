import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, ScrollView, Pressable} from 'react-native';
import { getEventById } from '../utils/api-requests';
import eventScreenStyles from '../style-documents/event-screen-styling.js';

export default function EventScreen(props) {
  const eventId = props.route.params.eventId;

  const [currentEvent, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEventById(eventId).then((response) => {
      setEvent(response);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Text>LOADING</Text>;
  return (
    <ScrollView style={eventScreenStyles.eventScreenScrollViewContainer}>
      <View style={eventScreenStyles.eventScreenContainer}>
        <Text style={eventScreenStyles.eventScreenTitle}>{currentEvent[0].event_name}</Text>
        <View style={eventScreenStyles.eventDetailsContainer}>
          <View style={eventScreenStyles.eventScreenTextContainer}>
            <Text style={eventScreenStyles.eventScreenTextLabel}>Entry: </Text>
            <Text style={eventScreenStyles.eventScreenText}>£{currentEvent[0].entry_price}</Text>
          </View>
          <View style={eventScreenStyles.eventScreenTextContainer}>
            <Text style={eventScreenStyles.eventScreenTextLabel}>About: </Text>
            <Text style={eventScreenStyles.eventScreenText}>{currentEvent[0].description}</Text>
          </View>
        </View>
        { currentEvent[0].picture ?
        <Image style={eventScreenStyles.eventScreenImage} source={{ uri: currentEvent[0].picture}}/>
        : null}
        <Pressable style={eventScreenStyles.eventScreenButtonAndroid}
          title="Artist Details"
          onPress={() =>
            props.navigation.navigate('ArtistScreen', {
              artist_id: currentEvent[0].artists_ids[0].artist_id
            })
          }
        >
          <Text style={eventScreenStyles.eventScreenButtonTextAndroid}>More on the artist</Text>
        </Pressable>
        <View style={eventScreenStyles.venueContainer}>
          <Text style={eventScreenStyles.eventScreenVenueTitle}>Venue:</Text>
          <View style={eventScreenStyles.venueDetailsContainer}>
            <View style={eventScreenStyles.eventScreenTextContainer}>
              <Text style={eventScreenStyles.eventScreenTextLabel}>Name:</Text>
              <Text style={eventScreenStyles.eventScreenText}> {currentEvent[0].venue_info[0].venue_name}</Text>
            </View>
            <View style={eventScreenStyles.eventScreenTextContainer}>
              <Text style={eventScreenStyles.eventScreenTextLabel}>Address:</Text>
              <Text style={eventScreenStyles.eventScreenText}> {currentEvent[0].venue_info[0].address}</Text>
            </View>
        </View>
 
          </View>
          { currentEvent[0].venue_info[0].picture ?
          <Image style={eventScreenStyles.eventScreenImage} source={{ uri: currentEvent[0].venue_info[0].picture }}/>
          : null}
        </View>
    </ScrollView>
  )
};