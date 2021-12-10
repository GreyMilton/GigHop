import React from 'react';
import { Button, Text, View} from 'react-native';
import EventSummaryCard from './EventSummaryCard';

export default function EventListDisplay({ mapMarkers, navigation }) {
  return (
    <View>
      {mapMarkers.map((event) => {
        return (
          <View key={event['_id']} >
            <EventSummaryCard event={event}/>
            <Button
            title="Go to event screen"
            onPress={() => navigation.navigate('EventScreen', { eventId: event['_id']})}/>
          </View>
        );
      })}
    </View>
  );
}