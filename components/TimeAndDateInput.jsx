import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Button, Platform} from 'react-native';

export default function TimeAndDateInput({ selectedDate, setSelectedDate }) {

  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [showTimePicker, setShowTimePicker] = useState(false);
  
  const onDatePickerChange = (event, newlySelectedDate = selectedDate) => {
    // const currentDate = newlySelectedDate || selectedDate;
    // setShow(Platform.OS === 'ios');
    setShowDatePicker(false);
    setSelectedDate(newlySelectedDate);
  };

  const showDatepickerPress = () => {
    setShowDatePicker(true);
  };
  // const showTimepickerPress = () => {
  //   setShowTimePicker(true);
  // };

  return (
    <View>
      <View>
        <Button onPress={showDatepickerPress} title="Choose date" />
        <Text>Chosen date is: {selectedDate.toDateString()}</Text>
      </View>
      {/* <View>
        <Button onPress={showTimepickerPress} title="Choose time" />
      </View> */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onDatePickerChange}
        />
      )}
      {/* {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedTime}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onTimePickerChange}
        />
      )} */}
    </View>
  );
};