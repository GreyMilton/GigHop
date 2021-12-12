import React from 'react';
import { Text, View} from 'react-native';
import LocationInput from './LocationInput';
import TimeAndDateInput from './TimeAndDateInput';
import FilterSelect from './FilterSelect';
import SortSelect from './SortSelect';
import mainScreenStyles from '../style-documents/main-screen-styling';

export default function SearchBar({ selectedTimestamp, setSelectedTimestamp }) {
  return (
    <View style={mainScreenStyles.searchBarContainer} >
      <LocationInput />
      <TimeAndDateInput selectedTimestamp={selectedTimestamp} setSelectedTimestamp={setSelectedTimestamp} />
      {/* <FilterSelect /> */}
      {/* <SortSelect /> */}
    </View>
  );
}