import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Pressable, Platform} from 'react-native';
import mainScreenStyles from '../style-documents/main-screen-styling';
import { timeAndDateButtonsAndroid } from '../style-documents/pressable-functions';

export default function TimeAndDateInputAndroid({ selectedTimestamp, setSelectedTimestamp }) {

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
    <View style={mainScreenStyles.timeAndDateInputContainer} >
      <Pressable style={timeAndDateButtonsAndroid} onPress={showDatepickerPress} >
        <Text style={mainScreenStyles.timeAndDatePressableButtonsTextAndroid} >{selectedTimestamp.toDateString()}</Text>
      </Pressable>
      <Pressable style={timeAndDateButtonsAndroid} onPress={showTimepickerPress} >
        <Text style={mainScreenStyles.timeAndDatePressableButtonsTextAndroid} >{selectedTimestamp.toTimeString().substring(0,5)}</Text>
      </Pressable>
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