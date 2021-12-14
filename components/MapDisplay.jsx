import React, { useState } from 'react';
import { Text, View, Dimensions, Button } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from "react-native-maps";
import mapStyle from '../style-documents/map-style';
import EventSummaryCallout from './EventSummaryCallout';
import mainScreenStyles from '../style-documents/main-screen-styling';

export default function MapDisplay({ mapMarkers, navigation, venueReferenceObject, isLoading }) {

  if(isLoading) return(
    <View style={mainScreenStyles.mapDisplayContainer}>
      <MapView provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={mainScreenStyles.map}
          initialRegion={{
            latitude: 50.376289,
            longitude: -4.143841,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          {mapMarkers.map(event => {
            return (
            <Marker
                key={event['_id']} 
                coordinate={{
                  latitude: parseFloat(event['venue_info'][0].coordinates.latitude["$numberDecimal"]),
                  longitude: parseFloat(event['venue_info'][0].coordinates.longitude["$numberDecimal"])
                }}
                pinColor={venueReferenceObject && (venueReferenceObject[event["venue_id"]].length > 1) ? 'yellow' : 'green'}
                title={event['event_name']}
                description={event.description}
              >
                <Callout tooltip={false} style={mainScreenStyles.callout} onPress={() => navigation.navigate('EventScreen', { eventId: event['_id'], eventName: event['event_name']})}>
                    <EventSummaryCallout venueReferenceObject={venueReferenceObject} event={event} />
                </Callout>
              </Marker>
            );
          })}
      </MapView>
      <View style={mainScreenStyles.LoadingPopupContainer}>
        <View style={mainScreenStyles.LoadingPopup}>
          <Text style={mainScreenStyles.LoadingText}>
            Loading Events...
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={mainScreenStyles.mapDisplayContainer}>
      <MapView provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={mainScreenStyles.map}
          initialRegion={{
            latitude: 50.376289,
            longitude: -4.143841,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          {mapMarkers.map(event => {
            return (
            <Marker
                key={event['_id']} 
                coordinate={{
                  latitude: parseFloat(event['venue_info'][0].coordinates.latitude["$numberDecimal"]),
                  longitude: parseFloat(event['venue_info'][0].coordinates.longitude["$numberDecimal"])
                }}
                pinColor={venueReferenceObject && (venueReferenceObject[event["venue_id"]].length > 1) ? 'yellow' : 'green'}
                title={event['event_name']}
                description={event.description}
              >
                <Callout tooltip={false} style={mainScreenStyles.callout} onPress={() => navigation.navigate('EventScreen', { eventId: event['_id'], eventName: event['event_name']})}>
                    <EventSummaryCallout venueReferenceObject={venueReferenceObject} event={event} />
                </Callout>
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
}