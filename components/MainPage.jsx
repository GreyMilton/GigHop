import React from 'react';
import { Text, View, Button } from 'react-native';
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import EventListDisplay from './EventListDisplay';


export default function MainPage({ navigation }) {
  return (
    <View>
      <SearchBar />
      <MapDisplay />
      <EventListDisplay />
      <Button
        title="Go to event page"
        onPress={() =>
          navigation.navigate('EventPage')
        }
      />
    </View>
  );
}