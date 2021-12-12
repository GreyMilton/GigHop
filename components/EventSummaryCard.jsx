import React from 'react';
import { Pressable, Text, View} from 'react-native';
import mainScreenStyles from '../style-documents/main-screen-styling';


export default function EventSummaryCard({ event, navigation }) {
  return (
      <Pressable style={mainScreenStyles.EventSummaryCardPressableButton} onPress={() => navigation.navigate('EventScreen', { eventId: event['_id']})}>
        <View>
          { event ? <>
          <Text style={mainScreenStyles.EventSummaryCardPressableHeaderText}>{event['event_name']}</Text>
          <Text style={mainScreenStyles.EventSummaryCardPressableText}>at {event['venue_info'][0]['venue_name']}</Text>
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