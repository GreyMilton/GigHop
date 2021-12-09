import React from 'react';
import { Button, Text, View} from 'react-native';

export default function EventSummaryCard({ venue }) {
  return (
    <View>
      { venue ? <>
      <Text>{venue.venue}</Text>
      <Text>{venue.description}</Text>
      </>
      : <Text>No venue information found</Text> }
    </View>
  );
}