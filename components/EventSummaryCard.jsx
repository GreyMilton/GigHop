import React from 'react';
import { Button, Text, View} from 'react-native';

export default function EventSummaryCard({ count }) {
  return (
    <View>
      <Text>EventSummaryCard {count}</Text>
    </View>
  );
}