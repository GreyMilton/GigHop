import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image} from 'react-native';

export default function EventScreen() {

  const DATA = [
    {
      "_id": {"$oid":"61ae26cb8d70b95db023dbe6"},
      "entry_price":{"$numberDouble":"4.99"},
      "description":"test",
      "venue_id":"61ae068dcff5425db378629e",
      "user_id":"61ae0411e399a088552170ba",
      "artists_ids":[{"artist_id":"61ae0411e399a088552170ba"}],
      "authorised":{"artist":true,"venue":true},
      "time_end":{"$date":{"$numberLong":"1639177200000"}},
      "time_start":{"$date":{"$numberLong":"1639161000000"}},
      "picture":"https://upload.wikimedia.org/wikipedia/commons/e/ef/The_Wiggles_live_in_Sydney_2018.jpg",
      "event_name":"Grey and the Wiggles","artist_id":["testing","testing"]
    }
  ]

  const Item = ({ title, entryPrice, description, picture}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <View style={{
        height: 5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        margin: 10
        }} 
      />
      <Text>Entry Price: £{entryPrice.$numberDouble}</Text>
      <View style={{
        height: 5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        margin: 10
        }} 
      />
      <Text>About Event: {description}</Text>
      <View style={{
        height: 5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        margin: 10
        }} 
      />
      <Image 
        style={{    
          flex: 1,
          aspectRatio: 1.5, 
          resizeMode: 'contain',
          }}
        source={{
            uri: picture
        }}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <Text>CHOSEN EVENT SCREEN</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          console.log(item)
          return <Item 
            title={item.event_name}
            entryPrice={item.entry_price}
            description={item.description}
            picture={item.picture}
          />
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#AFD2E9",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#D2FF96"
  },
  title: {
    fontSize: 24,
    color: 'black'
  }
});

