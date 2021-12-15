import React, { useContext, useEffect, useState } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getArtistById, getEventById, patchConfirmArtist } from '../utils/api-requests';

export default function ConfirmationScreen() {

  const { currentUser } = useContext(UserContext);
  const [ associatedEventIds, setAssociatedEventIds ] = useState([]);
  const [ associatedEvents, setAssociatedEvents ] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
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
    }
  }, [reload])

  // console.log(artistInfo)

  console.log('***************************');




  

  let eventList = associatedEvents.map((event) => {
    const handleClick = () => {
    
    console.log(event)
    let artist = event.authorised.artist;
    let venue = event.authorised.venue;
    console.log(event.artist, event.venue)
    let data = {authorised: {artist: !artist, venue: venue}}
    patchConfirmArtist(data, event._id)
    setReload(!reload)
 }
    let authorised;
    if (event.authorised.artist) {
      authorised = <Text>True</Text>
    } else {
      authorised = <Text>False</Text>
    }
    return (
      <View key={event.event_name}>
        <View key={event._id}>
        <Text>{event.event_name}</Text>
        <Text>{event.venue_info[0].venue_name}</Text>
        <Text>{event.time_start}</Text>
        <Text>{event.time_end}</Text>
        <Text>{authorised}</Text>
        <Button title="Confirm" onPress={handleClick}></Button>
      </View>
      </View>
    )
  })

  return (
    <ScrollView>
      {eventList}
    </ScrollView>
  );
}