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

  if (isLoading) return (
    <View style={styles.LoadingContainer}>
      <Text style={styles.LoadingText}>Loading Event...</Text>
    </View>
  )
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
              artists_ids: currentEvent[0].artists_ids, eventName: props.route.params.eventName
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#d8dee5",
  },
  text: {
    backgroundColor: '#7cb48f',
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    width: '100%'
  },
  item: {
    backgroundColor: "#C9F299",
    padding: 20,
    marginVertical: 8,
    width: '90%'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 200
  },
  noImage: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  LoadingContainer: {
		flex: 1,
		backgroundColor: "#d8dee5",
		justifyContent: "center",
		alignItems: "center",
	},
  LoadingText: {
		color: "black",
		fontSize: 30,
	}
});
