import React, {useEffect, useState} from 'react';
import { Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


import {Button, Platform} from 'react-native';

export default function TimeAndDateInput({ navigation }) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  // const showTimepicker = () => {
  //   showMode('time');
  // };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Choose date" />
        <Text>Chosen date is: {date.toDateString()}</Text>
      </View>
      {/* <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View> */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};