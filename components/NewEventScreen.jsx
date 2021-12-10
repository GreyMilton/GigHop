import React, { useEffect, useState } from "react";
import {Text, View, Picker, Platform, Button, SafeAreaView, StyleSheet, TextInput, ScrollView } from "react-native"; 
import { getVenues, getArtists } from "./utils/get";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Form, FormItem} from 'react-native-form-component'
import CurrencyInput from "react-native-currency-input";

export default function NewEventScreen({ navigation }) {
  const [eventName, setEventName] = useState("");
  const [artist, setArtist] = useState("");
  const [venue, setVenue] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [picture, setPicture] = useState();
  const [ArrayOfVenues, setArrayOfVenues] = useState([]);
  const [ArrayOfArtists, setArrayOfArtists] = useState([]);
  const [modeStart, setModeStart] = useState('date');
  const [showStart, setShowStart] = useState(false);
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStart = (event, selectedDate = startTime) => {
    setShowStart(false);
    setStartTime(selectedDate);
  };

  const onChangeEnd = (event, selectedDate = endTime) => {
    setShowEnd(false);
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

  //when you have collected all the details have been entered
  const [newEvent, setNewEvent] = useState();
  const [newArtist, setNewArtist] = useState();
  const [newVenue, setNewVenue] = useState();
  const [newVenueAddress, setNewVenueAddress] = useState();
  const [newStartTime, setNewStartTime] = useState();
  const [newEndTime, setNewEndTime] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newDescription, setNewDescriptin] = useState();
  const [newPicture, setNewPicture] = useState();
  // console.log(newEvent, newArtist, newVenue, newVenueAddress, newStartTime);

  //  "event_name",
  //   "entry_price",
  //   "description",
  //   "venue_id",
  //   "user_id",
  //   "artists_ids",
  //   "authorised",
  //   "time_end",
  //   "time_start",
  //   "picture"
  return (
    <ScrollView>
    <Form onSubmit=''>
      <FormItem label='Event name' value={eventName} onChangeText={(eventName) => setEventName(eventName)}/>
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
      <CurrencyInput label='Event price' value={price} onChangeValue={(price) => setPrice(price)}/>
      <FormItem label='Event description' value={description} onChangeText={(description) => setDescription(description)}/>
      <FormItem label='Event picture' value={picture} onChangeText={(picture) => setPicture(picture)}/>
    </Form>
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
