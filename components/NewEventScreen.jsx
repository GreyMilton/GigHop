import React, { useContext, useEffect, useState } from "react";
import {Text, Platform, Pressable, View, StyleSheet, SafeAreaView, TextInput, ScrollView, Button } from "react-native"; 
import { getVenues, getArtists, postNewEventDetails, patchArtistNewEvent, patchVenueNewEvent, patchUserNewEvent } from "../utils/api-requests";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Form, FormItem} from 'react-native-form-component'
import CurrencyInput from "react-native-currency-input";
import {Picker, PickerIOS} from '@react-native-picker/picker'
import { UserContext } from "../contexts/UserContext";
import formsStyles from "../style-documents/forms-styling";
import { datePickerButtonAndroid, timePickerButtonAndroid } from '../style-documents/pressable-functions';

export default function NewEventScreen({ navigation }) {
  const {currentUser} = useContext(UserContext);

  const [eventName, setEventName] = useState(null);
  const [artist, setArtist] = useState(null);
  const [venue, setVenue] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState(null);
  const [picture, setPicture] = useState('');
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
      entry_price: {'$numberDecimal': price},
      description: description,
      venue_id: venue,
      user_id: currentUser._id,
      artists_ids: [{artist_id: artist}],
      authorised: {artist: false, venue: false},
      time_start: time_start,
      time_end: time_end,
      picture: picture
    }


    const eventData = await postNewEventDetails(data);

    let addEvent = {
      add_event:{event_id: eventData}
    }
    await patchArtistNewEvent(addEvent, artist);
    await patchVenueNewEvent(addEvent, venue);
    await patchUserNewEvent(addEvent, currentUser._id)
    navigation.navigate('Find gigs');
    setEventName(null);
    setArtist(null);
    setVenue(null);
    setStartTime(new Date());
    setEndTime(new Date());
    setPrice(0);
    setDescription(null);
    setPicture(null);


  }

  let pickers;

  if(Platform.OS === 'ios') {
    pickers = (
      <View style={formsStyles.dropdownsContainer}>
        <PickerIOS
        isRequired
    selectedValue={artist}
    style={formsStyles.dropdown}
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
        isRequired
        selectedValue={venue}
        style={formsStyles.dropdown}
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
      <View style={formsStyles.dropdownsContainer}>
    <Picker
    isRequired
    selectedValue={artist}
    style={formsStyles.dropdown}
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
        isRequired
        selectedValue={venue}
        style={formsStyles.dropdown}
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
      <View style={formsStyles.addGigContainer} >
        <Form onButtonPress={onPressHandler} buttonText="Submit New Gig" buttonStyle={formsStyles.submitButton} buttonTextStyle={formsStyles.submitButtonText} >
          <View style={formsStyles.formItemContainer}>
            <FormItem isRequired label='Gig name' labelStyle={formsStyles.label} textInputStyle={formsStyles.input} value={eventName} onChangeText={(eventName) => setEventName(eventName)}/>
          </View>
            {pickers}

          <View style={formsStyles.timeAndDateInputContainer}>
            <Text style={formsStyles.timeAndDateInputLabel}>Start time</Text>
            <View style={formsStyles.timeAndDateButtonContainer}>
              <Pressable style={datePickerButtonAndroid} onPress={showDatePickerStart} >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{startTime.toDateString()}</Text>
              </Pressable>
              <Pressable style={timePickerButtonAndroid} onPress={showTimePickerStart} >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{startTime.toTimeString().substring(0, 5)}</Text>
              </Pressable>
            </View>
          </View>
          <View>
          {showStart && (
            <DateTimePicker
            isRequired
              testID="dateTimePickerStart"
              value={startTime}
              mode={modeStart}
              is24Hour={true}
              display="default"
              onChange={onChangeStart}
            />)
          }
          </View>

          <View style={formsStyles.timeAndDateInputContainer}>
            <Text style={formsStyles.timeAndDateInputLabel}>End time</Text>
            <View style={formsStyles.timeAndDateButtonContainer}>
              <Pressable style={datePickerButtonAndroid} onPress={showDatePickerEnd} title=" Show End Date" >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{endTime.toDateString()}</Text>
              </Pressable>
              <Pressable style={timePickerButtonAndroid} onPress={showTimePickerEnd} title="Show End Time" >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{endTime.toTimeString().substring(0, 5)}</Text>
              </Pressable>         
            </View>
          </View>
          <View>
            {showEnd && (
              <DateTimePicker
              isRequired
                testID="dateTimePickerEnd"
                value={endTime}
                mode={modeEnd}
                is24Hour={true}
                display="default"
                onChange={onChangeEnd}
              />)
            }
          </View>
            <View style={formsStyles.entryFeeContainer}>
              <Text style={formsStyles.entryFeeLabel} >Entry fee</Text>
              <CurrencyInput isRequired style={formsStyles.entryFeeInput} prefix="£" separator="." label='Event price' value={price} onChangeValue={(price) => setPrice(price)}/>
            </View>
            <View style={formsStyles.formItemContainer}>
              <FormItem isRequired label='Gig description' labelStyle={formsStyles.label} textInputStyle={formsStyles.input} value={description} onChangeText={(description) => setDescription(description)}/> 
            </View>
            <View style={formsStyles.formItemContainer}>
              <FormItem label='Gig picture (url)' labelStyle={formsStyles.label} textInputStyle={formsStyles.input} value={picture} onChangeText={(picture) => setPicture(picture)}/>
            </View>
        </Form>
      </View>
    </ScrollView>);
}
