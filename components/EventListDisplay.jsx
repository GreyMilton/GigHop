import React from 'react';
import { Text, View} from 'react-native';
import EventSummaryCard from './EventSummaryCard';

export default function EventListDisplay({ count }) {
  return (
    <View>
      <Text>{count}</Text>
      <Text>EventListDisplay</Text>
      <EventSummaryCard />
    </View>
  );
}