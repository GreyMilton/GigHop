import React from 'react';
import { Text, View} from 'react-native';
import DisplaySwitch from './DisplaySwitch';
import EventSummaryCard from './EventSummaryCard';

export default function MapDisplay({ navigation }) {
  return (
    <View>
      <Text>MapDisplay</Text>
      <DisplaySwitch />
      <EventSummaryCard />
    </View>
  );
}