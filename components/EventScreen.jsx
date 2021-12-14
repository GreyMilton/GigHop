import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, ScrollView, Button} from 'react-native';
import { getEventById } from '../utils/api-requests';

export default function EventScreen(props) {
  const eventId = props.route.params.eventId;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getEventById(eventId).then((response) => {
      setData(response);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return (
    <View style={styles.LoadingContainer}>
      <Text style={styles.LoadingText}>Loading Event...</Text>
    </View>
  )
  return (
    <ScrollView style={styles.container}>
      {data.map((item) => {
        return (
          <View style={styles.item} key={item._id}>
            <View key='Event'>
              <Text style={styles.title}>Event Details</Text>
              <Text style={styles.text}>{item.event_name}</Text>
              <Text style={styles.text}>Entry Price: £{item.entry_price}</Text>
              <Text style={styles.text}>Event info: {item.description}</Text>
              <Image style={[item.picture ? styles.image : styles.noImage]} source={{ uri: item.picture}}/>
              <Button
                title="Artist Details"
                onPress={() =>
                  props.navigation.navigate('ArtistScreen', {
                    artist_id: item.artists_ids[0].artist_id
                  })
                }
              />
            </View>
            <View key='Venue'>
              <Text style={styles.title}>Venue Details:</Text>
              <Text style={styles.text}>Held at: {item.venue_info[0].venue_name}</Text>
              <Text style={styles.text}>Address: {item.venue_info[0].address}</Text>
              <Image style={[item.venue_info[0].picture ? styles.image : styles.noImage]} source={{ uri: item.venue_info[0].picture }}/>
            </View>
          </View>
        )
      })}
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

