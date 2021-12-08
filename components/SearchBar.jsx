import React from 'react';
import { Text, View} from 'react-native';
import LocationInput from './LocationInput';
import TimeAndDateInput from './TimeAndDateInput';
import FilterSelect from './FilterSelect';
import SortSelect from './SortSelect';

export default function SearchBar({ navigation }) {
  return (
    <View>
      <Text>SearchBar</Text>
      <LocationInput />
      <TimeAndDateInput />
      {/* <FilterSelect /> */}
      <SortSelect />
    </View>
  );
}