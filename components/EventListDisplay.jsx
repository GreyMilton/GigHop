import React from 'react';
import { Button, Text, View, ScrollView} from 'react-native';
import EventSummaryCard from './EventSummaryCard';
import mainScreenStyles from '../style-documents/main-screen-styling';

export default function EventListDisplay({ mapMarkers, navigation, venueReferenceObject }) {
  return (
    <ScrollView style={mainScreenStyles.EventListDisplayScrollViewContainer} >
      {mapMarkers.map((event) => {
        return (
          <View style={mainScreenStyles.EventSummaryCardViewContainer} key={event['_id']} >
            <EventSummaryCard navigation={navigation} event={event} venueReferenceObject={venueReferenceObject} />
          </View>
        );
      })}
    </ScrollView>
  );
}