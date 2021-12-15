import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, ScrollView, Pressable } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getArtistById, getEventById, patchConfirmEvent, getVenueById } from '../utils/api-requests';
import dateModifier from '../utils/date-modifier';
import {handleDeleteEvent} from '../utils/deleteButton'

export default function ConfirmationScreen() {

  const { currentUser } = useContext(UserContext);
  const [ associatedEvents, setAssociatedEvents ] = useState([]);
  const [reload, setReload] = useState(true)



  useEffect(() => {
    setAssociatedEvents([]);
    if (currentUser.artist) {
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
    } else if(currentUser.venue) {
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
          console.log(res)
          setAssociatedEvents(res.flat())
      })
      .catch((err)=> {
        console.log(err)
      })
    }
  }, [reload])

  // console.log(artistInfo)

  console.log('***************************');




  

  let eventList = associatedEvents.map((event) => {
    const handleDeletePress = () => {
      handleDeleteEvent(event._id, event.artists_ids[0], event.venue_id, event.user_id)
      setReload(!reload)
    }


    const handleClick = () => {

      console.log(currentUser)
    
    let artist = event.authorised.artist;
    let venue = event.authorised.venue;
    if (currentUser.artist !== '') {
      let data = {authorised: {artist: !artist, venue: venue}}
    patchConfirmEvent(data, event._id)
    setReload(!reload)
    } else if (currentUser.venue !== '') {
      let data = {authorised: {artist: artist, venue: !venue}}
      patchConfirmEvent(data, event._id)
      setReload(!reload)
    }
    
 }

 
 let confirm;
 let venueAuth;
 let artistAuth;

 if (currentUser.artist) {
   venueAuth = event.authorised.venue ? `Authorised by ${event.venue_info[0].venue_name}.` : `Unauthorised by ${event.venue_info[0].venue_name}.`;
   artistAuth = event.authorised.artist ? `Authorised by you.` : `Unauthorised by you.`;
   confirm = event.authorised.artist ? 'Unconfirm' : 'Confirm'
 } else if (currentUser.venue) {
   console.log('here')
  venueAuth =event.authorised.venue ? `Authorised by you.` : `Unauthorised by you.`
  artistAuth = event.authorised.artist ? `Authorised by the artist` : `Unauthorised by the artist.`;
  confirm = event.authorised.venue ? 'Unconfirm' : 'Confirm'
 }

    return (
      <View key={event.event_name}>
        <Text>{event.event_name}</Text>
        <Text>{event.venue_info[0].venue_name}</Text>
        <Text>{dateModifier(event.time_start)}</Text>
        <Text>{dateModifier(event.time_end)}</Text>
        <Text>{artistAuth}</Text>
        <Text>{venueAuth}</Text>
        <Pressable onPress={handleClick}><Text>{confirm}</Text></Pressable>
        <Pressable onPress={handleDeletePress}><Text>Delete</Text></Pressable>
      </View>
    )
  })

  return (
    <ScrollView>
      {eventList}
    </ScrollView>
  );
}