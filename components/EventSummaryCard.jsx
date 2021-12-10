import React from 'react';
import { Button, Text, View} from 'react-native';

export default function EventSummaryCard({ event }) {
  return (
    <View>
      { event ? <>
      <Text>{event['event_name']}</Text>
      <Text>{event['time_start'].substring(11,16)} - {event['time_end'].substring(11,16)}</Text>
      <Text>{event['entry_price'] === 0 ? 'Free' : "£" + event['entry_price'] }</Text>
      <Text>{event.description}</Text>
      </>
      : <Text>No venue information found</Text> }
    </View>
  );
}