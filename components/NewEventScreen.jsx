import React, { useContext, useEffect, useState } from "react";
import {Text, View, Platform, Button, SafeAreaView, StyleSheet, TextInput, ScrollView } from "react-native"; 
import { getVenues, getArtists } from "./utils/get";
import { PostNewEventDetails } from "./utils/post";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Form, FormItem} from 'react-native-form-component'
import CurrencyInput from "react-native-currency-input";
import {Picker, PickerIOS} from '@react-native-picker/picker'
import { UserContext } from "../contexts/UserContext";

export default function NewEventScreen({ navigation }) {
  const {currentUser} = useContext(UserContext);

  const [eventName, setEventName] = useState("");
  const [artist, setArtist] = useState("");
  const [venue, setVenue] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState();
  const [ArrayOfVenues, setArrayOfVenues] = useState([]);
  const [ArrayOfArtists, setArrayOfArtists] = useState([]);
  const [modeStart, setModeStart] = useState('date');
  const [showStart, setShowStart] = useState(false);
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStart = (event, selectedDate = startTime) => {
    setShowStart(Platform.OS === 'ios');
    setStartTime(selectedDate);
  };

  const onChangeEnd = (event, selectedDate = endTime) => {
    setShowEnd(Platform.OS === 'ios');
    setEndTime(selectedDate);
  };

  const showModeStart = (currentMode) => {
    setShowStart(true);
    setModeStart(currentMode);
  };

  const showDatePickerStart = () => {
    showModeStart('date');
  };

  const showTimePickerStart = () => {
    showModeStart('time');
  };

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  const showDatePickerEnd = () => {
    showModeEnd('date');
  };

  const showTimePickerEnd = () => {
    showModeEnd('time');
  };

  useEffect(() => {
    getVenues().then((res) => {
      setArrayOfVenues(res);
    });
  }, [setShowStart, setShowEnd]);
  useEffect(() => {
    getArtists().then((res) => {
      setArrayOfArtists(res);
    });
  }, [setShowStart, setShowEnd]);

  const onPressHandler = () => {
    let time_start = new Date(startTime);
    let time_end = new Date(endTime)
    if (eventName.length < 0 || venue.length < 0 || artist.length < 0) {
      alert('please enter an event name')
    }
    let data = {
      event_name: eventName,
      entry_price: price,
      description: description,
      venue_id: venue,
      user_id: currentUser._id,
      artists_ids: [artist],
      authorised: {artist: false, venue: false},
      time_start: time_start,
      time_end: time_end,
      picture: picture
    }
    PostNewEventDetails(data)

  }

  let pickers;

  if(Platform.OS === 'ios') {
    pickers = (
      <View>
        <PickerIOS
    selectedValue={artist}
    style={styles.input}
    onValueChange={(itemValue) => setArtist(itemValue)}
    >
    <Picker.Item label="artist" value={""} />
      {ArrayOfArtists.map((artist) => {
      return (
        <Picker.Item key={artist._id} label={artist.artist_name} value={artist._id} />
        );
        })}
  </PickerIOS>
        <PickerIOS
        selectedValue={venue}
        style={styles.input}
        onValueChange={(itemValue) => setVenue(itemValue)}
      >
        <Picker.Item label="venue" value={""} />
        {ArrayOfVenues.map((venue) => {
          return <Picker.Item key={venue._id} label={venue.venue_name} value={venue._id} />;
        })}
      </PickerIOS>
      </View>
    )
  } else {
    pickers = (
      <View>
    <Picker
    selectedValue={artist}
    style={styles.input}
    onValueChange={(itemValue, itemIndex) => setArtist(itemValue)}
    >
    <Picker.Item label="artist" value={undefined} />
      {ArrayOfArtists.map((artist) => {
      return (
        <Picker.Item key={artist._id} label={artist.artist_name} value={artist._id} />
        );
        })}
  </Picker>
        <Picker
        selectedValue={venue}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setVenue(itemValue)}
      >
        <Picker.Item label="venue" value={undefined} />
        {ArrayOfVenues.map((venue) => {
          return <Picker.Item key={venue._id} label={venue.venue_name} value={venue._id} />;
        })}
      </Picker>
      </View>)
  }
  return (
    <ScrollView>
      <SafeAreaView>
        <Form onButtonPress={onPressHandler} >
      <FormItem isRequired label='Event name' value={eventName} onChangeText={(eventName) => setEventName(eventName)}/>
    {pickers}

      <View>
        <Button onPress={showDatePickerStart} title=" Show Start Date" />
      </View>
      <View>
        <Button onPress={showTimePickerStart} title="Show Start Time" />
      </View>
      <Text>Chosen start date: {startTime.toDateString()} {startTime.toTimeString().substring(0, 5)}</Text>
      <View>
         {showStart && (
        <DateTimePicker
         testID="dateTimePickerStart"
         value={startTime}
         mode={modeStart}
         is24Hour={true}
         display="default"
         onChange={onChangeStart}
        />)}
      </View>

     <View>
       <Button onPress={showDatePickerEnd} title=" Show End Date" />
     </View>
     <View>
       <Button onPress={showTimePickerEnd} title="Show End Time" />
     </View>
     <Text>Chosen end date: {endTime.toDateString()} {endTime.toTimeString().substring(0, 5)}</Text>
     <View>
       {showEnd && (
     <DateTimePicker
     testID="dateTimePickerEnd"
     value={endTime}
     mode={modeEnd}
     is24Hour={true}
     display="default"
     onChange={onChangeEnd}
     />)}
     </View>
      <CurrencyInput prefix="£" separator="." label='Event price' value={price} onChangeValue={(price) => setPrice(price)}/>
      <FormItem label='Event description' value={description} onChangeText={(description) => setDescription(description)}/>
      <FormItem label='Event picture' value={picture} onChangeText={(picture) => setPicture(picture)}/>
    </Form>
    </SafeAreaView>
    </ScrollView>);
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
