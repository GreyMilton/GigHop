import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image} from 'react-native';

export default function EventScreen(props) {
  const eventId = props.route.params.eventId;

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

  const dataArray = [data]
  console.log(dataArray)

  if (isLoading) return <Text>LOADING</Text>
  return (
    <View>
      {dataArray.map((item) => {
        return (
          <View key={item._id}>
          <Text>{item.event_name}</Text>
          <Text>Entry Price: £{item.entry_price}</Text>
          <Text>description={item.description}</Text>
          <Image 
          style={{    
            flex: 1,
            aspectRatio: 1.5, 
            resizeMode: 'contain',
          }}
          source={{
            uri: item.picture
          }}
          />
          </View>
        )
        }
      )}
    </View>
  )
};


//   const Item = ({ title, entryPrice, description, picture}) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//       <View style={{
//         height: 5,
//         width: "100%",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         margin: 10
//         }} 
//       />
//       <Text>Entry Price: £{entryPrice.$numberDouble}</Text>
//       <View style={{
//         height: 5,
//         width: "100%",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         margin: 10
//         }} 
//       />
//       <Text>About Event: {description}</Text>
//       <View style={{
//         height: 5,
//         width: "100%",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         margin: 10
//         }} 
//       />
//       <Image 
//         style={{    
//           flex: 1,
//           aspectRatio: 1.5, 
//           resizeMode: 'contain',
//           }}
//         source={{
//             uri: picture
//         }}
//       />
//     </View>
//   )

//   if (isLoading) return <Text>LOADING</Text>
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text>CHOSEN EVENT SCREEN</Text>
//       <FlatList
//         data={dataArray}
//         keyExtractor={(item) => item._id}
//         renderItem={({item}) => {
//           return <Item 
//             title={item.event_name}
//             entryPrice={item.entry_price}
//             description={item.description}
//             picture={item.picture}
//           />
//         }}
//       />
//     </SafeAreaView>
//   );
// }

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

