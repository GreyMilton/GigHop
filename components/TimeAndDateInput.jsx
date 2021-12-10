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
      <View>
        <Button onPress={showDatepickerPress} title="Choose date" />
        <Text>Chosen date is: {selectedTimestamp.toDateString()}</Text>
      </View>
      <View>
        <Button onPress={showTimepickerPress} title="Choose time" />
        <Text>Chosen time is: {selectedTimestamp.toTimeString().substring(0,5)}</Text>
      </View>
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