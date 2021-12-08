import React from 'react';
import { Text, View, Button } from 'react-native';
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import EventListDisplay from './EventListDisplay';


export default function MainScreen({ navigation }) {
  return (
    <View>
      <SearchBar />
      <MapDisplay />
      <EventListDisplay />
      <Button
        title="Go to event screen"
        onPress={() =>
          navigation.navigate('EventScreen')
        }
      />
    </View>
  );
}