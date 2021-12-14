import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getArtistById, getEventById } from '../utils/api-requests';

export default function ConfirmationScreen() {

  const { currentUser } = useContext(UserContext);
  const [ associatedEventIds, setAssociatedEventIds ] = useState([]);
  const [ associatedEvents, setAssociatedEvents ] = useState([]);

  useEffect(() => {
    if (currentUser.artist) {
      getArtistById(currentUser.artist)
        .then((artist) => {
          const upcomingEvents = artist.upcoming_events.map(event => {
            return event.event_id
          })
          setAssociatedEventIds(upcomingEvents);
        })
    }
  }, [])

  useEffect(() => {
    associatedEventIds.forEach(eventId => {
      getEventById(eventId).then((event) => {
        setAssociatedEvents((prevEvents) => {
          return [...prevEvents, event[0]];
        })
      })
    })
  }, []);

  console.log(associatedEvents)

  let eventList = associatedEvents.map((event) => {
    return (
      <View key={event._id}>
        <Text>{event.event_name}</Text>
      </View>
    )
  })

  return (
    <View>
      <Text>Events be here</Text>
      {eventList}
    </View>
  );
}