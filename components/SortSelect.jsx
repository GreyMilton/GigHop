import React, { useState } from 'react';
import { Button, Text, View} from 'react-native';

export default function SortSelect({ navigation }) {

  const [sortButtonTitles, setSortButtonTitles] = useState(['start time', 'distance from location']);

  const [sortButtonIsPressed, setSortButtonIsPressed] = useState(false);

  const onPressOfSortButton = () => {
    if (sortButtonIsPressed) {
      setSortButtonIsPressed(false);
    } else {
      setSortButtonIsPressed(true);
    }
  }

  return (
    <View>
      <Text>Currently sorted by {sortButtonIsPressed ? sortButtonTitles[0] : sortButtonTitles[1]}</Text>
      <Button title={`Sort by ${sortButtonIsPressed ? sortButtonTitles[1] : sortButtonTitles[0]}`} onPress={onPressOfSortButton}/>
    </View>
  );
}