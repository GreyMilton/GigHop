import React from 'react';
import { Text, View} from 'react-native';
import EventSummaryCard from './EventSummaryCard';

export default function EventListDisplay({ navigation }) {
  return (
    <View>
      <Text>EventListDisplay</Text>
      <EventSummaryCard />
    </View>
  );
}