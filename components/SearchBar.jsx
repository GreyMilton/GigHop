import React from 'react';
import { Text, View} from 'react-native';
import LocationInput from './LocationInput';
import TimeAndDateInput from './TimeAndDateInput';
import FilterSelect from './FilterSelect';
import SortSelect from './SortSelect';

export default function SearchBar({ selectedDate, setSelectedDate }) {
  return (
    <View>
      <Text>SearchBar</Text>
      <LocationInput />
      <TimeAndDateInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {/* <FilterSelect /> */}
      <SortSelect />
    </View>
  );
}