import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Pressable, Platform} from 'react-native';
import mainScreenStyles from '../style-documents/main-screen-styling';
import androidPressableButtonStyles from '../style-documents/android-pressable-button-styles';

export default function TimeAndDateInput({ selectedTimestamp, setSelectedTimestamp }) {

  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
  const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios');
  
  const onDatePickerChange = (event, newlySelectedDate = selectedTimestamp) => {
    setShowDatePicker(Platform.OS === 'ios');
    setSelectedTimestamp(newlySelectedDate);
  };
  const onTimePickerChange = (event, newlySelectedTime = selectedTimestamp) => {
    setShowTimePicker(Platform.OS === 'ios');
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
      {Platform.OS === 'ios' ? null :
        <>
          <Pressable style={androidPressableButtonStyles.button} onPress={showDatepickerPress} >
            <Text style={androidPressableButtonStyles.text} >{selectedTimestamp.toDateString()}</Text>
          </Pressable>
          <Pressable style={androidPressableButtonStyles.button} onPress={showTimepickerPress} >
            <Text style={androidPressableButtonStyles.text} >{selectedTimestamp.toTimeString().substring(0,5)}</Text>
          </Pressable>
        </>
      }
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