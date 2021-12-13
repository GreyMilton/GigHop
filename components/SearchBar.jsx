import React from 'react';
import { Text, View, Platform } from 'react-native';
import LocationInput from './LocationInput';
import TimeAndDateInputiOS from './TimeAndDateInputiOS';
import TimeAndDateInputAndroid from './TimeAndDateInputAndroid';
import FilterSelect from './FilterSelect';
import SortSelect from './SortSelect';
import mainScreenStyles from '../style-documents/main-screen-styling';

export default function SearchBar({ selectedTimestamp, setSelectedTimestamp }) {
  return (
    <View style={mainScreenStyles.searchBarContainer} >
      <LocationInput />
      { Platform.OS === 'ios' ?
        <TimeAndDateInputiOS selectedTimestamp={selectedTimestamp} setSelectedTimestamp={setSelectedTimestamp} />
        :
        <TimeAndDateInputAndroid selectedTimestamp={selectedTimestamp} setSelectedTimestamp={setSelectedTimestamp} />
      }
      {/* <FilterSelect /> */}
      {/* <SortSelect /> */}
    </View>
  );
}