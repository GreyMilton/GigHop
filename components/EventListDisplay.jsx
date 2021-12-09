import React from 'react';
import { Button, Text, View} from 'react-native';
import EventSummaryCard from './EventSummaryCard';

export default function EventListDisplay({ venuesInCurrentViewWithGigs, navigation }) {
  return (
    <View>
      <Text>EventListDisplay</Text>
      {venuesInCurrentViewWithGigs.map((venue) => {
        return (
          <View key={venue.venue} >
            <EventSummaryCard venue={venue}/>
            <Button
            title="Go to event screen"
            onPress={() =>
              navigation.navigate('EventScreen')
            }/>
          </View>
        );
      })}

    </View>
  );
}