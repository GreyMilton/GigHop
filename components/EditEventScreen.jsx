import React, { useEffect, useState, useContext } from 'react';
import { Text, View, ScrollView, Image, Pressable } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';
import CurrencyInput from "react-native-currency-input";import { UserContext } from "../contexts/UserContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { postNewEventDetails, patchArtistNewEvent, patchVenueNewEvent, patchUserNewEvent } from "../utils/api-requests";
import PickerForArtist from './PickerForArtist';
import PickerForVenue from './PickerForVenue';
import formsStyles from "../style-documents/forms-styling";

export default function EditEventScreen(props) {
  const event = props.route.params.event;
  const {currentUser} = useContext(UserContext);

  const [eventName, setEventName] = useState(event.event_name);
  const [startTime, setStartTime] = useState(event.time_start);
  const [endTime, setEndTime] = useState(event.time_end);
  const [price, setPrice] = useState(event.entry_price);
  const [description, setDescription] = useState(event.description);
  const [picture, setPicture] = useState(event.picture);
  const [modeStart, setModeStart] = useState('date');
  const [showStart, setShowStart] = useState(false);
  const [modeEnd, setModeEnd] = useState('date');
  const [showEnd, setShowEnd] = useState(false);
  const [venuesLoading, setVenuesLoading] = useState(true);
  const [artistsLoading, setArtistsLoading] = useState([true, true, true, true]);

  const [currentVenue, setCurrentVenue] = useState(event.venue_info[0].venue_name);

  const [currentArtist1, setCurrentArtist1] = useState(event.artists_ids[0].artist_id = "");
  // const [currentArtist2, setCurrentArtist2] = useState(event.artists_ids[1].artist_id = "");
  // const [currentArtist3, setCurrentArtist3] = useState(event.artists_ids[2].artist_id = "");
  // const [currentArtist4, setCurrentArtist4] = useState(event.artists_ids[3].artist_id = "");

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
      artists_ids: [artist],
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

  // Maybe have all form items prefilled with the current details?
  
  return (
    <ScrollView style={formsStyles.editEventScreenScrollViewContainer}>
      <View style={formsStyles.editEventScreenMainViewContainer}>
        <View style={formsStyles.editEventScreenTextContainer}>
          <Text style={formsStyles.editEventScreenTextLabel}>Confirmed By Artist?</Text>
          <Text style={formsStyles.editEventScreenText}> {event.authorised.artist ? "Yes" : "No"}</Text>
        </View>
        <View style={formsStyles.editEventScreenTextContainer}>
          <Text style={formsStyles.editEventScreenTextLabel}>Confirmed By Venue?</Text>
          <Text style={formsStyles.editEventScreenText}> {event.authorised.venue ? "Yes" : "No"}</Text>
        </View>
          <Form onButtonPress={onPressHandler} buttonText="Submit Gig Update" buttonStyle={formsStyles.submitButton} buttonTextStyle={formsStyles.submitButtonText}>
            <View style={formsStyles.editEventScreenTextContainer}>
              <Text style={formsStyles.editEventScreenTextLabel}>Current Name:</Text>
              <Text style={formsStyles.editEventScreenText}> {event.event_name}</Text>
            </View>
            <View style={formsStyles.formItemContainer}>
              <FormItem label='New Gig Name' labelStyle={formsStyles.eventScreenInputlabel} textInputStyle={formsStyles.eventScreenInput} value={eventName} onChangeText={(eventName) => setEventName(eventName)}/>
            </View>
            <View style={formsStyles.editEventScreenTextContainer}>
              <Text style={formsStyles.editEventScreenTextLabel}>Current Venue:</Text>
              <Text style={formsStyles.editEventScreenText}> {event.venue_info[0].venue_name}</Text>
              <Text style={formsStyles.editEventScreenText}>{event.venue_info[0].address}</Text>
            </View>
            <Text style={formsStyles.editEventScreenTextLabel}>New Venue</Text>
            <PickerForVenue currentVenue={currentVenue} setVenuesLoading={setVenuesLoading}/>
            <View>
              <Text style={formsStyles.editEventScreenTextLabel}>Current Artists</Text>
              <Text style={formsStyles.editEventScreenTextLabel} >Artist 1</Text>
              <PickerForArtist currentArtist={currentArtist1} setCurrentArtist={setCurrentArtist1} setArtistsLoading={setArtistsLoading} artistsLoadingIndex={0}/>
            </View>
            {/* { currentArtist1.length > 0 &&
              <View>
                <Text>Artist 2</Text>
                <PickerForArtist currentArtist={currentArtist2} setCurrentArtist={setCurrentArtist2} setArtistsLoading={setArtistsLoading} artistsLoadingIndex={1}/>
              </View>}
              { currentArtist2.length > 0 &&
              <View>
                <Text>Artist 3</Text>
                <PickerForArtist currentArtist={currentArtist3} setCurrentArtist={setCurrentArtist3} setArtistsLoading={setArtistsLoading} artistsLoadingIndex={2}/>
              </View>}
              { currentArtist3.length > 0 &&
              <View>
                <Text>Artist 4</Text>
                <PickerForArtist currentArtist={currentArtist4} setCurrentArtist={setCurrentArtist4} setArtistsLoading={setArtistsLoading} artistsLoadingIndex={3}/>
              </View>} */}
            <View style={formsStyles.editEventScreenTextContainer}>
              <Text style={formsStyles.editEventScreenTextLabel}>Current Start Time:</Text>
              {/*Turn into time and date pickers*/}
              <Text style={formsStyles.editEventScreenText}> {event.time_start}</Text>
            </View>
            <View style={formsStyles.editEventScreenTextContainer}>
              <Text style={formsStyles.editEventScreenTextLabel}>Current End Time:</Text>
              {/*Turn into time and date pickers*/}
              <Text style={formsStyles.editEventScreenText}> {event.time_end}</Text>
            </View>
            <View style={formsStyles.timeAndDateInputContainer}>
            <Text style={formsStyles.timeAndDateInputLabel}>Start time</Text>
            <View style={formsStyles.timeAndDateButtonContainer}>
              <Pressable style={formsStyles.datePickerButtonAndroid} onPress={showDatePickerStart} >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{startTime.toDateString()}</Text>
              </Pressable>
              <Pressable style={formsStyles.timePickerButtonAndroid} onPress={showTimePickerStart} >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{startTime.toTimeString().substring(0, 5)}</Text>
              </Pressable>
            </View>
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
            />)
          }
          </View>
          <View style={formsStyles.timeAndDateInputContainer}>
            <Text style={formsStyles.timeAndDateInputLabel}>End time</Text>
            <View style={formsStyles.timeAndDateButtonContainer}>
              <Pressable style={formsStyles.datePickerButtonAndroid} onPress={showDatePickerEnd} title=" Show End Date" >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{endTime.toDateString()}</Text>
              </Pressable>
              <Pressable style={formsStyles.timePickerButtonAndroid} onPress={showTimePickerEnd} title="Show End Time" >
                <Text style={formsStyles.timeOrDatePickerButtonTextAndroid}>{endTime.toTimeString().substring(0, 5)}</Text>
              </Pressable>         
            </View>
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
              />)
            }
          </View>
          <View style={formsStyles.editEventScreenTextContainer}>
            <Text style={formsStyles.editEventScreenTextLabel}>Current Entry Fee: </Text>
            <Text style={formsStyles.editEventScreenText}> £{event.entry_price}</Text>
          </View>
          <View style={formsStyles.entryFeeContainer}>
              <Text style={formsStyles.entryFeeLabel} >New Entry Fee</Text>
              <CurrencyInput style={formsStyles.entryFeeInput} prefix="£" separator="." label='Event price' value={price} onChangeValue={(price) => setPrice(price)}/>
            </View>
          <View style={formsStyles.editEventScreenTextContainer}>
            <Text style={formsStyles.editEventScreenTextLabel}>Current Description</Text>
            <Text style={formsStyles.editEventScreenText}>{event.description}</Text>
          </View>
          <View>
            <FormItem labelStyle={formsStyles.eventScreenInputlabel} textInputStyle={formsStyles.eventScreenInput} label='New Description'/>
          </View>
          <View>
            <Text style={formsStyles.editEventScreenTextLabel}>Current Picture</Text>
            <Image style={formsStyles.editEventScreenEventImage} source={{ uri: event.picture }}/>
          </View>
          <View style={formsStyles.editEventScreenTextContainer}>
            <Text style={formsStyles.editEventScreenTextLabel}>Current Picture URL:</Text>
            <Text style={formsStyles.editEventScreenText}>{event.picture}</Text>
          </View>
          <View>
            <FormItem label='New Picture URL' labelStyle={formsStyles.eventScreenInputlabel} textInputStyle={formsStyles.eventScreenInput}/>
          </View>
        </Form>
      </View>
    </ScrollView>
  );
}