import React, { useContext, useEffect, useState } from "react";
import {Text, Platform, Pressable, View, StyleSheet, SafeAreaView, TextInput, ScrollView, Button } from "react-native"; 
import { getVenues, getArtists, postNewEventDetails, patchArtistNewEvent, patchVenueNewEvent, patchUserNewEvent } from "../utils/api-requests";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Form, FormItem} from 'react-native-form-component'
import CurrencyInput from "react-native-currency-input";
import {Picker, PickerIOS} from '@react-native-picker/picker'
import { UserContext } from "../contexts/UserContext";
import FormsStyles from "../style-documents/forms-styling";

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
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [artistsLoading, setArtistsLoading] = useState(true);

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
      setVenuesLoading(false);
    });
  }, [setShowStart, setShowEnd]);
  useEffect(() => {
    getArtists().then((res) => {
      setArrayOfArtists(res);
      setArtistsLoading(false);
    });
  }, [setShowStart, setShowEnd]);

  const onPressHandler = async () => {
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


    const eventData = await postNewEventDetails(data);
    // console.log(currentUser._id)

    let addEvent = {
      add_event:{event_id: eventData}
    }
    patchArtistNewEvent(addEvent, artist);
    patchVenueNewEvent(addEvent, venue);
    patchUserNewEvent(addEvent, currentUser._id)

  }

  let pickers;

  if(Platform.OS === 'ios') {
    pickers = (
      <View>
        <PickerIOS
    selectedValue={artist}
    style={FormsStyles.dropdown}
    onValueChange={(itemValue) => setArtist(itemValue)}
    >
    <Picker.Item label={(artistsLoading ? "Loading artists..." : "artist")} value={""} />
      {ArrayOfArtists.map((artist) => {
      return (
        <Picker.Item key={artist._id} label={artist.artist_name} value={artist._id} />
        );
        })}
  </PickerIOS>
        <PickerIOS
        selectedValue={venue}
        style={FormsStyles.dropdown}
        onValueChange={(itemValue) => setVenue(itemValue)}
      >
        <Picker.Item label={(venuesLoading ? "Loading Venues..." : "venue")} value={""} />
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
    style={FormsStyles.dropdown}
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
        style={FormsStyles.dropdown}
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
      <View>
        <Form onButtonPress={onPressHandler} buttonText="Submit New Gig" buttonStyle={FormsStyles.submitButton} buttonTextStyle={FormsStyles.submitButtonText} >
      <FormItem isRequired label='Event name' labelStyle={FormsStyles.label} textInputStyle={FormsStyles.input} value={eventName} onChangeText={(eventName) => setEventName(eventName)}/>
    {pickers}

      <View style={FormsStyles.timeAndDateInputContainer}>
        <Text>Gig start:</Text>
        <Pressable style={FormsStyles.timeOrDatePickerButtonAndroid} onPress={showDatePickerStart} >
          <Text style={FormsStyles.timeOrDatePickerButtonTextAndroid}>{startTime.toDateString()}</Text>
        </Pressable>
        <Pressable style={FormsStyles.timeOrDatePickerButtonAndroid} onPress={showTimePickerStart} >
        <Text style={FormsStyles.timeOrDatePickerButtonTextAndroid}>{startTime.toTimeString().substring(0, 5)}</Text>
        </Pressable>
      </View>
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

     <View style={FormsStyles.timeAndDateInputContainer}>
      <Text>Gig end:</Text>
       <Pressable style={FormsStyles.timeOrDatePickerButtonAndroid} onPress={showDatePickerEnd} title=" Show End Date" >
        <Text style={FormsStyles.timeOrDatePickerButtonTextAndroid}>{endTime.toDateString()}</Text>
       </Pressable>
       <Pressable style={FormsStyles.timeOrDatePickerButtonAndroid} onPress={showTimePickerEnd} title="Show End Time" >
       <Text style={FormsStyles.timeOrDatePickerButtonTextAndroid}>{endTime.toTimeString().substring(0, 5)}</Text>
       </Pressable>
     </View>
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
      <FormItem label='Event description' labelStyle={FormsStyles.label} textInputStyle={FormsStyles.input} value={description} onChangeText={(description) => setDescription(description)}/>
      <FormItem underneathText="Hellllllo!" underneathTextStyle={FormsStyles.textUnderneathInput} label='Event picture' labelStyle={FormsStyles.label} textInputStyle={FormsStyles.input} value={picture} onChangeText={(picture) => setPicture(picture)}/>
    </Form>
    </View>
    </ScrollView>);
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightblue',
  },
});
