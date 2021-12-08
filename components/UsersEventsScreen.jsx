import React from 'react';
import { Text, View, Button } from 'react-native';

export default function UsersEventsScreen({ navigation }) {
  return (
    <View>
      <Text>UsersEventsScreen</Text>
      <Button
        title="Edit an event"
        onPress={() =>
          navigation.navigate('EditEventScreen')
        }
      />
    </View>
  );
}