import React, { useEffect } from 'react';
import { Text, View, Button } from 'react-native';

export default function UsersEventsScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.getParent().addListener('focus', () => {
      navigation.popToTop();
     });
     return unsubscribe;
  }, [navigation]);
 
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