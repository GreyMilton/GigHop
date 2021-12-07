import React from 'react';
import { Text, View} from 'react-native';
import DisplaySwitch from './DisplaySwitch';
import EventSummaryCard from './EventSummaryCard';

export default function EventListDisplay({ navigation }) {
  return (
    <View>
      <Text>EventListDisplay</Text>
      <DisplaySwitch />
      <EventSummaryCard />
    </View>
  );
}