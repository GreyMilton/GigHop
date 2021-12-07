import React from 'react';
import { Text, View, Button } from 'react-native';

export default function MainPage({ navigation }) {
  return (
    <View>
      <Text>Hello!!!!!!!!!</Text>
      <Button
        title="Go to event page"
        onPress={() =>
          navigation.navigate('EventPage')
        }
      />
    </View>
  );
}