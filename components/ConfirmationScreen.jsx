import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, ScrollView, Pressable } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getArtistById, getEventById, patchConfirmEvent, getVenueById } from '../utils/api-requests';
import dateModifier from '../utils/date-modifier';
import {handleDeleteEvent} from '../utils/deleteButton';
import confirmationScreenStyles from '../style-documents/confirmation-screen-styling';
import { confirmationScreenButton, confirmationScreenDeleteButton } from "../style-documents/pressable-functions";

export default function ConfirmationScreen() {

  const { currentUser } = useContext(UserContext);
  const [ associatedEvents, setAssociatedEvents ] = useState([]);
  const [reload, setReload] = useState(true)

  useEffect(() => {
    setAssociatedEvents([]);
    if (currentUser.artist && currentUser.venue === '') {
      return getArtistById(currentUser.artist)
      .then((res) => {
        const upcomingEvents = res.upcoming_events.map(event => {
          return event.event_id;
        })
        return upcomingEvents

      })
      .then((res) =>  {
        let events = res.map(async (eventId) => {
          return await getEventById(eventId)
          }
        )
        return Promise.all(events).then((res)=> {
          return res
        })
      })
        .then((res) => {
          setAssociatedEvents(res.flat())
      })
      .catch((err)=> {
        console.log(err)
      })
    } else if (currentUser.venue && currentUser.artist === '') {
      return getVenueById(currentUser.venue)
      .then((res) => {
          const upcomingEvents = res.upcoming_events.map(event => {
            return event.event_id;
        })
        return upcomingEvents

      })
      .then((res) =>  {
        let events = res.map(async (eventId) => {
          return await getEventById(eventId)
          }
        )
        return Promise.all(events).then((res)=> {
          return res
        })
      })
        .then((res) => {
          setAssociatedEvents(res.flat())
      })
      .catch((err)=> {
        console.log(err)
      })
    } else if (currentUser.artist && currentUser.venue) {
      return getVenueById(currentUser.venue)
      .then((res) => {
          const upcomingEvents = res.upcoming_events.map(event => {
            return event.event_id;
        })
        return upcomingEvents

      })
      .then((res) =>  {
        let events = res.map(async (eventId) => {
          return await getEventById(eventId)
          }
        )
        return Promise.all(events).then((res)=> {
          return res
        })
      })
        .then((res) => {
          setAssociatedEvents(res.flat())
      })
      .catch((err)=> {
        console.log(err)
      })
    }
  }, [reload])
  
  let eventList = associatedEvents.map((event, index) => {

    const handleDeletePress = () => {
      handleDeleteEvent(event._id, event.artists_ids[0], event.venue_id, event.user_id)
      setReload(!reload)
    }
    const handleClick = () => {
      
    let artist = event.authorised.artist;
    let venue = event.authorised.venue;
    if (currentUser.artist !== '' && currentUser.venue === '') {
      let data = {authorised: {artist: !artist, venue: venue}}
      patchConfirmEvent(data, event._id)
      setReload(!reload)
    } else if (currentUser.venue !== '' && currentUser.artist === '') {
      let data = {authorised: {artist: artist, venue: !venue}}
      patchConfirmEvent(data, event._id)
      setReload(!reload)
    } else if (currentUser.artist !== '' && currentUser.venue !== '') {
      let data = {authorised: {artist: !artist, venue: !venue}};
      patchConfirmEvent(data, event._id);
      setReload(!reload);
    } 
 }
 let confirm;
 let venueAuth;
 let artistAuth;

 if (currentUser.artist && !currentUser.venue) {
   venueAuth = event.authorised.venue ? `Confirmed by ${event.venue_info[0].venue_name}.` : `Unconfirmed by ${event.venue_info[0].venue_name}.`;
   artistAuth = event.authorised.artist ? `Confirmed by you.` : `Unconfirmed by you.`;
   confirm = event.authorised.artist ? 'Unconfirm' : 'Confirm'
 } else if (currentUser.venue && !currentUser.artist) {
  venueAuth =event.authorised.venue ? `Confirmed by you.` : `Unconfirmed by you.`
  artistAuth = event.authorised.artist ? `Confirmed by the artist` : `Unconfirmed by the artist.`;
  confirm = event.authorised.venue ? 'Unconfirm' : 'Confirm'
 } else if (currentUser.venue && currentUser.artist) {
  venueAuth =event.authorised.venue ? `Confirmed by you as the venue` : `Unconfirmed by you as the venue`
  artistAuth = event.authorised.artist ? `Confirmed by you as the artist` : `Unconfirmed by you as the artist`;
  confirm = event.authorised.venue ? 'Unconfirm' : 'Confirm'
 }

    if (currentUser.artist) {
      venueAuth = event.authorised.venue ? `Confirmed by ${event.venue_info[0].venue_name}.` : `Unconfirmed by ${event.venue_info[0].venue_name}.`;
      artistAuth = event.authorised.artist ? `Confirmed by you.` : `Unconfirmed by you.`;
      confirm = event.authorised.artist ? 'Unconfirm' : 'Confirm'
    } else if (currentUser.venue) {
      console.log('here')
      venueAuth =event.authorised.venue ? `Confirmed by you.` : `Unconfirmed by you.`
      artistAuth = event.authorised.artist ? `Confirmed by the artist` : `Unconfirmed by the artist.`;
      confirm = event.authorised.venue ? 'Unconfirm' : 'Confirm'
    }

    return (
      <View style={confirmationScreenStyles.listItemOuterContainer} key={event.event_name}>
        <View style={confirmationScreenStyles.listItemInnerContainer} key={event._id}>
          <Text style={confirmationScreenStyles.header}>{event.event_name}</Text>
          <View style={confirmationScreenStyles.sectionContainer}>
            <Text style={confirmationScreenStyles.text}>This gig has been:</Text>
            <View style={confirmationScreenStyles.confirmationsTextContainer}>
              <Text style={confirmationScreenStyles.textLabel}>{artistAuth}</Text>
              <Text style={confirmationScreenStyles.text}>(artist)</Text>
              <Text style={confirmationScreenStyles.textLabel}>{venueAuth}</Text>
              <Text style={confirmationScreenStyles.text}>(venue)</Text>
            </View>
          </View>
          <View style={confirmationScreenStyles.textContainer}>
            <Text style={confirmationScreenStyles.textLabel} >Gig Name:</Text>
            <Text style={confirmationScreenStyles.text}>{event.event_name}</Text>
          </View>
          <View style={confirmationScreenStyles.textContainer}>
            <Text style={confirmationScreenStyles.textLabel} >Gig Description:</Text>
            <Text style={confirmationScreenStyles.text}>{event.description}</Text>
          </View>
          <View style={confirmationScreenStyles.textContainer}>
            <Text style={confirmationScreenStyles.textLabel}>Venue Name:</Text>
            <Text style={confirmationScreenStyles.text}>{event.venue_info[0].venue_name}</Text>
          </View>
          <View style={confirmationScreenStyles.timeTextOuterContainer}>
            <View style={confirmationScreenStyles.timeTextContainer}>
              <Text style={confirmationScreenStyles.textLabel}>Starts</Text>
              <Text style={confirmationScreenStyles.text}>o{dateModifier(event.time_start).substring(1)}</Text>
            </View>
            <View style={confirmationScreenStyles.timeTextContainer}>
              <Text style={confirmationScreenStyles.textLabel}>Ends</Text>
              <Text style={confirmationScreenStyles.text}>o{dateModifier(event.time_end).substring(1)}</Text>
            </View>
          </View>
          <View style={confirmationScreenStyles.buttonsContainer}>
            <Pressable style={confirmationScreenButton} onPress={handleClick}>
              <Text style={confirmationScreenStyles.pressableButtonsText}>{confirm} Gig</Text>
            </Pressable>
            <Pressable style={confirmationScreenDeleteButton} onPress={handleDeletePress}>
              <Text style={confirmationScreenStyles.pressableButtonsText}>Delete Gig</Text>
            </Pressable>
          </View>
        </View>
        { (index < associatedEvents.length - 1) &&
        <View style={confirmationScreenStyles.borderLineContainer}>
          <Text style={confirmationScreenStyles.borderLine}>----------------------------------------------------------------------------------</Text>
        </View>}
      </View>
    )
  })

  return (
    <ScrollView style={confirmationScreenStyles.scrollViewContainer}>
      <View style={confirmationScreenStyles.outermostViewContainer}>
        {eventList}
      </View>
    </ScrollView>
  );
}
