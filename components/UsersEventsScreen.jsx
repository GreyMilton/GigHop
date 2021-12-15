import React, { useEffect, useState } from "react";
import { Text, View, Button, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getSingleUser, getEventById } from "../utils/api-requests";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import usersEventsScreenStyles from "../style-documents/users-events-screen-styling";

export default function UsersEventsScreen({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [listOfEvents, setListOfEvents] = useState([[{}]]);

  useEffect(() => {
    const unsubscribe = navigation.getParent().addListener("focus", () => {
      navigation.popToTop();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setListOfEvents([[{}]]);
    Promise.all(currentUser.events.map((event) => {
      return getEventById(event.event_id);
    })).then((res) => {
      console.log(res);
      setListOfEvents(res);
    })
  }, []);

  return (
    <ScrollView style={usersEventsScreenStyles.usersEventsScrollViewContainer}>
      {listOfEvents.map((event) => {
        return ( event.length > 0 &&
          <View style={usersEventsScreenStyles.usersEventsEventViewContainer} key={event[0]._id}>
            <Pressable style={usersEventsScreenStyles.usersEventsPressableEvent}
              onPress={() => navigation.navigate("EditEventScreen", { event: event[0] })}
            >
              <View>
                <Text style={usersEventsScreenStyles.usersEventsPressableHeaderText} >{event[0].event_name}</Text>
                <Text style={usersEventsScreenStyles.usersEventsPressableText}>{event[0].venue_info && ("at " + event[0].venue_info[0].venue_name)}</Text>
                <Text style={usersEventsScreenStyles.usersEventsPressableText}>{event[0].description}</Text>
                <Text style={usersEventsScreenStyles.usersEventsPressableText}>{ (event[0]['time_start']) ? event[0]['time_start'].substring(0,10) : null}</Text>
                <Text style={usersEventsScreenStyles.usersEventsPressableText}>{ (event[0]['time_start'] && event[0]['time_end']) ? event[0]['time_start'].substring(11,16) + ' - ' + event[0].time_end.substring(11,16) : null }</Text>
                <Text style={usersEventsScreenStyles.usersEventsPressableText}>{event[0].authorised ? (event[0].authorised.artist ? "Confirmed by artist" : "Unconfirmed by artist") : null}</Text>
                <Text style={usersEventsScreenStyles.usersEventsPressableText}t>{event[0].authorised ? (event[0].authorised.venue ? "Confirmed by venue" : "Unconfirmed by venue" ) : null}</Text>
              </View>
              <Text style={usersEventsScreenStyles.usersEventsPressableArrow}>{'>'}</Text>
            </Pressable>
          </View>
        );
      })}
      </ScrollView>
  );
}
