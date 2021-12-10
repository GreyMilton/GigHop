import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, ScrollView} from 'react-native';

export default function EventScreen(props) {
  const eventId = props.route.params.venue_id;

  const baseUrl = 'https://gig-hop.herokuapp.com/api/'

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios({
      method: 'get',
      url: `${baseUrl}/events/${eventId}`
    }).then((response) => {
      setData(response.data)
      setIsLoading(false)
    });
  }, []);

  if (isLoading) return <Text>LOADING</Text>
  return (
    <ScrollView style={styles.container}>
      {data.map((item) => {
        return (
          <View style={styles.item} key={item._id}>
            <View key='Event'>
              
              <Text style={styles.text}>{item.event_name}</Text>
              <Text style={styles.text}>Entry Price: £{item.entry_price}</Text>
              <Text style={styles.text}>Event info: {item.description}</Text>
              <Image style={styles.image} source={{ uri: item.picture}}/>
            </View>
            <View key='Venue'>
              <Text style={styles.text}>Held at: {item.venue_info[0].venue_name}</Text>
              <Text style={styles.text}>Address: {item.venue_info[0].address}</Text>
              <Image style={styles.image} source={{ uri: item.venue_info[0].picture }}/>
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
    marginHorizontal: 16,
    backgroundColor: "#AFD2E9",
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
      resizeMode: 'cover',
      width: '100%',
      height: 200
  }
});

