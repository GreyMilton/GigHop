import React from 'react';
import { Button, Text, View} from 'react-native';
export default function EventSummaryCallout({ venue }) {
  return (
    <View>
      { venue ? <>
      <Text>Venue name: {venue.venue}</Text>
      <Text>Venue description: {venue.description}</Text>
      </>
      : <Text>No venue information found</Text> }
    </View>
  );
}