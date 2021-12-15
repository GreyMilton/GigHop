import React from 'react';
import { Button, Text, View} from 'react-native';
import mainScreenStyles from '../style-documents/main-screen-styling';
import { findIndexOfEvent } from '../utils/main-screen-utils';

export default function EventSummaryCallout({ event, venueReferenceObject }) {
  return (
    <View style={mainScreenStyles.EventSummaryCalloutView} >
      <>
        <Text style={mainScreenStyles.EventSummaryCalloutHeader} >{event['event_name']}</Text>
        <Text>at {event['venue_info'][0]['venue_name']} { (venueReferenceObject && (venueReferenceObject[event["venue_id"]].length > 1)) ? ((findIndexOfEvent(event["_id"], venueReferenceObject[event["venue_id"]]) + 1) + '/' + venueReferenceObject[event["venue_id"]].length) : null}</Text>
        <Text>{event['time_start'].substring(11,16)} - {event['time_end'].substring(11,16)}</Text>
        <Text>{event['entry_price']["$numberDecimal"] === 0 ? 'Free entry' : "£" + event['entry_price']["$numberDecimal"] }</Text>
      </>
    </View>
  );
}