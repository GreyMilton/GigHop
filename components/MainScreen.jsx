import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import EventListDisplay from './EventListDisplay';


export default function MainScreen({ navigation }) {

  const [mapIsDisplaying, setMapIsDisplaying] = useState(true);

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
      {mapIsDisplaying ? <MapDisplay /> : <EventListDisplay /> }
      <Button
        title="Go to event screen"
        onPress={() =>
          navigation.navigate('EventScreen')
        }
      />
    </View>
  );
}