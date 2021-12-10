import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Platform} from 'react-native';

export default function TimeAndDateInput({ selectedTimestamp, setSelectedTimestamp }) {

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const onDatePickerChange = (event, newlySelectedDate = selectedTimestamp) => {
    setShowDatePicker(false);
    setSelectedTimestamp(newlySelectedDate);
  };
  const onTimePickerChange = (event, newlySelectedTime = selectedTimestamp) => {
    setShowTimePicker(false);
    setSelectedTimestamp(newlySelectedTime);
  };

  const showDatepickerPress = () => {
    setShowDatePicker(true);
  };
  const showTimepickerPress = () => {
    setShowTimePicker(true);
  };

  return (
    <View>
        <Button onPress={showDatepickerPress} title={selectedTimestamp.toDateString()} />
        <Button onPress={showTimepickerPress} title={selectedTimestamp.toTimeString().substring(0,5)} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedTimestamp}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onDatePickerChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedTimestamp}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onTimePickerChange}
        />
      )}
    </View>
  );
};