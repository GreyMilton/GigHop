import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import EventListDisplay from './EventListDisplay';
import { getEventsByTimestamp, getTicketmasterEventsByTimestamp } from '../utils/api-requests';
import mainScreenStyles from '../style-documents/main-screen-styling';
import { createNewVenueReferenceObject } from '../utils/main-screen-utils';

export default function MainScreen({ navigation }) {
  const venueArr = [
    {
      "_id": "61ae26cb8d70b95db023dbe6",
      "entry_price": 4.99,
      "description": "test",
      "venue_id": "61ae068dcff5425db378629e",
      "user_id": "61ae0411e399a088552170ba",
      "artists_ids": [
        {
          "artist_id": "61ae0411e399a088552170ba"
        },
        {
          "artist_id": "testing"
        },
        {
          "event_id": "testing"
        }
      ],
      "authorised": {
        "artist": true,
        "venue": true
      },
      "time_end": "2021-12-10T22:00:00.000Z",
      "time_start": "2021-12-10T18:30:00.000Z",
      "picture": "https://upload.wikimedia.org/wikipedia/commons/e/ef/The_Wiggles_live_in_Sydney_2018.jpg",
      "event_name": "Grey and the Wiggles",
      "venue_info": [
        {
          "_id": "61ae068dcff5425db378629e",
          "venue_name": "The Three Crowns",
          "coordinates": {
            "latitude": {
              "$numberDecimal": "50.36835"
            },
            "longitude": {
              "$numberDecimal": "-4.13577"
            }
          },
          "description": "pub with live music",
          "pin_colour": "cyan",
          "address": "11 The Parade, Plymouth PL1 2JL",
          "picture": "https://i2-prod.plymouthherald.co.uk/incoming/article579474.ece/ALTERNATES/s615/0_929382JPG.jpg",
          "upcoming_events": [
            {
              "event_id": "61ae26cb8d70b95db023dbe6"
            }
          ],
          "owner_id": "61ae22d28d70b95db023dbdd"
        }
      ]
    },
  ];
  const [mapIsDisplaying, setMapIsDisplaying] = useState(true);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const [ticketmasterEvents, setTicketmasterEvents] = useState([]);
  const [venuesInCurrentViewWithGigs, setVenuesInCurrentViewWithGigs] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [venueReferenceObject, setVenueReferenceObject] = useState({"61ae068dcff5425db378629e": [{"_id": "61ae26cb8d70b95db023dbe6", "time_start": "2021-12-10T18:30:00.000Z"}]});
  const [isLoading, setIsLoading] = useState(true);

  const switchDisplay = () => {
    setMapIsDisplaying((prevState) => {
      if (prevState) return false;
      else return true;
    })
  }

  const [selectedTimestamp, setSelectedTimestamp] = useState(new Date());
  
  useEffect(() => {
    getEventsByTimestamp(selectedTimestamp).then((response) => {
      setFetchedEvents(response),
      setIsLoading(false);
    })
  }, [selectedTimestamp])

  useEffect(() => {
    const assignTicketmasterEvents = async () => {
      await getTicketmasterEventsByTimestamp(selectedTimestamp)
      .then((response) => {
        setTicketmasterEvents(response)
        setIsLoading(false)
      })
    }
    assignTicketmasterEvents();
  }, [selectedTimestamp])

  useEffect(() => {
    console.log(ticketmasterEvents)
    // // here is where we could filter out gigs not in the current map view
    if(ticketmasterEvents == undefined || []) {
      setVenuesInCurrentViewWithGigs(fetchedEvents)
    } else {
      setVenuesInCurrentViewWithGigs([...fetchedEvents, ...ticketmasterEvents])
    }
  }, [fetchedEvents, ticketmasterEvents])

  useEffect(() => {
    // here is where we calculate multiple gigs at the same venue
    setVenueReferenceObject(createNewVenueReferenceObject(venuesInCurrentViewWithGigs));
    setMapMarkers(venuesInCurrentViewWithGigs);
  }, [venuesInCurrentViewWithGigs])

  useEffect(() => {
    // console.log("*************************");
    // console.log(venuesInCurrentViewWithGigs);
    // console.log("*************************");
    // console.log(venueReferenceObject);
  }, [venueReferenceObject]);

  // console.log(mapMarkers)

  return (
    <View style={mainScreenStyles.mainScreenContainer}>
      <SearchBar selectedTimestamp={selectedTimestamp} setSelectedTimestamp={setSelectedTimestamp} />
      <View style={mainScreenStyles.mapViewSwitchContainer} >
        <Pressable style={mainScreenStyles.mapViewSwitchButton} onPress={switchDisplay}>
          <Text style={mainScreenStyles.mapViewSwitchTextSelected} >{`${mapIsDisplaying ? "Map" : "List"}`}</Text>
          <Text style={mainScreenStyles.mapViewSwitchTextNotSelected}>{`${mapIsDisplaying ? "/list" : "/map"}`}</Text>
        </Pressable>
      </View>
      {mapIsDisplaying ? <MapDisplay navigation={navigation} mapMarkers={mapMarkers} venueReferenceObject={venueReferenceObject} isLoading={isLoading}/> : <EventListDisplay navigation={navigation} mapMarkers={mapMarkers} isLoading={isLoading} venueReferenceObject={venueReferenceObject}/> }
    </View>
  );
}
