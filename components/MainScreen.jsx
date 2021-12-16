import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import EventListDisplay from './EventListDisplay';
import { getEventsByTimestamp } from '../utils/api-requests';
import mainScreenStyles from '../style-documents/main-screen-styling';
import { createNewVenueReferenceObject } from '../utils/main-screen-utils';

export default function MainScreen({ navigation }) {
  const [mapIsDisplaying, setMapIsDisplaying] = useState(true);
  const [fetchedEvents, setFetchedEvents] = useState([]);
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
    // here is where we could filter out gigs not in the current map view
    setVenuesInCurrentViewWithGigs(fetchedEvents);
  }, [fetchedEvents])

  useEffect(() => {
    // here is where we calculate multiple gigs at the same venue
    setVenueReferenceObject(createNewVenueReferenceObject(venuesInCurrentViewWithGigs));
    setMapMarkers(venuesInCurrentViewWithGigs);
  }, [venuesInCurrentViewWithGigs])

  useEffect(() => {
  }, [venueReferenceObject]);

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
