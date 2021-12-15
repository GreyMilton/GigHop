import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';
import PickerForArtist from './PickerForArtist';
import PickerForVenue from './PickerForVenue';

export default function EditEventScreen({ navigation, event }) {

  const [currentVenue, setCurrentVenue] = useState(event.venue_info[0].venue_name = "");

  const [currentArtist1, setCurrentArtist1] = useState(event.artists_ids[0].artist_id = "");
  const [currentArtist2, setCurrentArtist2] = useState(event.artists_ids[1].artist_id = "");
  const [currentArtist3, setCurrentArtist3] = useState(event.artists_ids[2].artist_id = "");
  const [currentArtist4, setCurrentArtist4] = useState(event.artists_ids[3].artist_id = "");

  // Maybe have all form items prefilled with the current details?
  
  return (
    <ScrollView>
      <View>
        <Text>EditEventScreen</Text>
      </View>
      <View>
        <Form>
          <View>
            <Text>Current Name</Text>
            <Text>{event.event_name}</Text>
          </View>
          <View>
            <FormItem label='New Name'/>
          </View>
          <View>
            <Text>Current Description</Text>
            <Text>{event.description}</Text>
          </View>
          <View>
            <FormItem label='New Description'/>
          </View>
          <View>
            <Text>Current Entry Fee</Text>
            <Text>{event.entry_price}</Text>
          </View>
          <View>
            <FormItem label='New Entry Fee'/>
          </View>
          <View>
            <Text>Current Venue</Text>
            <Text>{event.venue_info[0].venue_name}</Text>
            <Text>{event.venue_info[0].address}</Text>
          </View>
          <View>
            <Text>New Venue</Text>
            <PickerForVenue currentVenue={currentVenue} />
          </View>
          <View>
            <Text>Current Artists</Text>
            {/* will need to do a get request for the artists info, and also one for all other artist options to put in a dropdown*/}
            {/* will need to .map through the current artists here: */ }
            <View>
              <Text>Artist 1</Text>
              <PickerForArtist currentArtist={currentArtist1} setCurrentArtist={setCurrentArtist1}/>
            </View>
            { currentArtist1.length > 0 &&
            <View>
              <Text>Artist 2</Text>
              <PickerForArtist currentArtist={currentArtist2} setCurrentArtist={setCurrentArtist2}/>
            </View>}
            { currentArtist2.length > 0 &&
            <View>
              <Text>Artist 3</Text>
              <PickerForArtist currentArtist={currentArtist3} setCurrentArtist={setCurrentArtist3}/>
            </View>}
            { currentArtist3.length > 0 &&
            <View>
              <Text>Artist 4</Text>
              <PickerForArtist currentArtist={currentArtist4} setCurrentArtist={setCurrentArtist4}/>
            </View>}
          </View>
          <View>
            <FormItem label='New Artists'/>
          </View>
          <View>
            <Text>Confirmed By Artist</Text>
            <Text>{event.authorised.artist}</Text>
          </View>
          <View>
            <Text>Confirmed By Venue</Text>
            <Text>{event.authorised.venue}</Text>
          </View>
          <View>
            <Text>Current Start Time</Text>
            {/*Turn into time and date pickers*/}
            <Text>{event.time_start}</Text>
          </View>
          <View>
            <Text>Current End Time</Text>
            {/*Turn into time and date pickers*/}
            <Text>{event.time_end}</Text>
          </View>
          <View>
            <Text>Current Picture</Text>
            <Image source={{ uri: event.picture }}/>
            <Text>{event.venue_id}</Text>
          </View>
          <View>
            <FormItem label='New Picture'/>
          </View>
        </Form>
      </View>
    </ScrollView>
  );
}