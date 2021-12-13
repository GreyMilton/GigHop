import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Pressable, Platform} from 'react-native';
import mainScreenStyles from '../style-documents/main-screen-styling';

export default function TimeAndDateInputiOS({ selectedTimestamp, setSelectedTimestamp }) {
  
  const onDatePickerChange = (event, newlySelectedDate = selectedTimestamp) => {
    setSelectedTimestamp(newlySelectedDate);
  };
  const onTimePickerChange = (event, newlySelectedTime = selectedTimestamp) => {
    setSelectedTimestamp(newlySelectedTime);
  };

  return (
    <View style={mainScreenStyles.timeAndDateInputContainer} >
      <DateTimePicker
        testID="dateTimePicker"
        value={selectedTimestamp}
        mode={'date'}
        is24Hour={true}
        display="default"
        onChange={onDatePickerChange}
      />
      <DateTimePicker
        testID="dateTimePicker"
        value={selectedTimestamp}
        mode={'time'}
        is24Hour={true}
        display="default"
        onChange={onTimePickerChange}
      />
    </View>
  );
};