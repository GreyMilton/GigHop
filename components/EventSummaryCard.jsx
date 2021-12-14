import React from 'react';
import { Pressable, Text, View} from 'react-native';
import mainScreenStyles from '../style-documents/main-screen-styling';
import { findIndexOfEvent } from '../utils/main-screen-utils';

export default function EventSummaryCard({ event, navigation, venueReferenceObject }) {
  return (
      <Pressable style={mainScreenStyles.EventSummaryCardPressableButton} onPress={() => navigation.navigate('EventScreen', { eventId: event['_id'], eventName: event['event_name']})}>
        <View>
          { event ? <>
          <Text style={mainScreenStyles.EventSummaryCardPressableHeaderText}>{event['event_name']}</Text>
          <Text style={mainScreenStyles.EventSummaryCardPressableText}>at {event['venue_info'][0]['venue_name']} { venueReferenceObject && (venueReferenceObject[event["venue_id"]].length > 1) ? (findIndexOfEvent(event["_id"], venueReferenceObject[event["venue_id"]]) + 1) + '/' + venueReferenceObject[event["venue_id"]].length : null}</Text>
          <Text style={mainScreenStyles.EventSummaryCardPressableText} >{event['time_start'].substring(11,16)} - {event['time_end'].substring(11,16)}</Text>
          <Text style={mainScreenStyles.EventSummaryCardPressableText}>{event['entry_price'] === 0 ? 'Free entry' : "£" + event['entry_price'] }</Text>
          <Text style={mainScreenStyles.EventSummaryCardPressableText}>{event.description}</Text>
          </>
          : <Text style={mainScreenStyles.EventSummaryCardPressableText} >No venue information found</Text> }
        </View>
        <Text style={mainScreenStyles.EventSummaryCardPressableArrow}>{'>'}</Text>
      </Pressable>
  );
}