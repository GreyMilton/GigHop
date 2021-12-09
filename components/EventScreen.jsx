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

  if (isLoading) return <Text>LOADING</Text>
  return (
    <View style={styles.container}>
      {data.map((item) => {
        console.log(item)
        return (
          <View style={styles.item} key={item._id}>
          <Text style={styles.text}>{item.event_name}</Text>
          <Text style={styles.text}>Entry Price: £{item.entry_price}</Text>
          <Text style={styles.text}>Event info: {item.description}</Text>
          <Image 
          style={{    
            flex: 1,
            aspectRatio: 1.5, 
            resizeMode: 'contain',
            height: 200
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
    margin: 16,
    backgroundColor: "#AFD2E9",
    alignItems: 'center',
    justifyContent: 'center',

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
  // header: {
  //   fontSize: 32,
  //   backgroundColor: "#D2FF96"
  // },
  // title: {
  //   fontSize: 24,
  //   color: 'black'
  // }
});

