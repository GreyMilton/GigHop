import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import EventListDisplay from './EventListDisplay';


export default function MainScreen({ navigation }) {
  const venueArr = [
    {
      venue: "The Ship",
      coordinate: { latitude: 50.3678, longitude: -4.13566 },
      description: "pub with live music",
      pinColor: "yellow",
      _id: '61ae26cb8d70b95db023dbe6'
    },
    {
      venue: "The Three Crowns",
      coordinate: { latitude: 50.36835, longitude: -4.13577 },
      description: "pub with live music",
      pinColor: "cyan",
      _id: '61ae29d18d70b95db023dbe8'
    },
    {
      venue: "Cap'n Jaspers",
      coordinate: { latitude: 50.36766, longitude: -4.13418 },
      description: "pub with live music",
      pinColor: "pink",
      _id: '61ae2a868d70b95db023dbe9'
    },
    {
      venue: "Bar Rakuda",
      coordinate: { latitude: 50.36763, longitude: -4.13511 },
      description: "pub with live music",
      pinColor: "green",
      _id: '61ae2b128d70b95db023dbea'
    }
  ];
  const [mapIsDisplaying, setMapIsDisplaying] = useState(true);
  const [venuesInCurrentViewWithGigs, setVenuesInCurrentViewWithGigs] = useState(venueArr);

  const switchDisplay = () => {
    setMapIsDisplaying((prevState) => {
      if (prevState) return false;
      else return true;
    })
  }

  return (
    <View>
      <SearchBar />
      <Text>Current view: { mapIsDisplaying ? "Map" : "List" }</Text>
      <Button title={ `switch to ${mapIsDisplaying ? "List" : "Map"} view` } onPress={switchDisplay}/>
      {mapIsDisplaying ? <MapDisplay navigation={navigation} venuesInCurrentViewWithGigs={venuesInCurrentViewWithGigs} /> : <EventListDisplay navigation={navigation} venuesInCurrentViewWithGigs={venuesInCurrentViewWithGigs} /> }
    </View>
  );
}