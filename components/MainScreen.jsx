import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import EventListDisplay from './EventListDisplay';


export default function MainScreen({ navigation }) {

  const [mapIsDisplaying, setMapIsDisplaying] = useState(true);

  const switchDisplay = () => {
    setCount(prevCount => prevCount + 1);
    setMapIsDisplaying((prevState) => {
      if (prevState) return false;
      else return true;
    })
  }

  const [count, setCount] = useState(0);

  return (
    <View>
      <SearchBar />
      <Text>Current view: { mapIsDisplaying ? "Map" : "List" }</Text>
      <Button title={ `switch to ${mapIsDisplaying ? "List" : "Map"} view` } onPress={switchDisplay}/>
      {mapIsDisplaying ? <MapDisplay count={count} setCount={setCount} /> : <EventListDisplay count={count} /> }
      <Button
        title="Go to event screen"
        onPress={() =>
          navigation.navigate('EventScreen')
        }
      />
    </View>
  );
}