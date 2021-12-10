import React from 'react';
import { Text, View} from 'react-native';
import LocationInput from './LocationInput';
import TimeAndDateInput from './TimeAndDateInput';
import FilterSelect from './FilterSelect';
import SortSelect from './SortSelect';

export default function SearchBar({ selectedTimestamp, setSelectedTimestamp }) {
  return (
    <View>
      <LocationInput />
      <TimeAndDateInput selectedTimestamp={selectedTimestamp} setSelectedTimestamp={setSelectedTimestamp} />
      {/* <FilterSelect /> */}
      {/* <SortSelect /> */}
    </View>
  );
}