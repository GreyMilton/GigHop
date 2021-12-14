import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getSingleUser, getEventById } from "../utils/api-requests";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function UsersEventsScreen({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [arrayOfUsersEvents, setArrayOfUsersEvents] = useState([]);
  const [listOfEvents, setListOfEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.getParent().addListener("focus", () => {
      navigation.popToTop();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getSingleUser(currentUser._id).then((response) => {
      // console.log(Array.isArray(response.events));
      setArrayOfUsersEvents(response.events);
      setListOfEvents([]);
    });
  }, []);

  let eventsObtained = [];

  useEffect(() => {
    for (let i = 0; i < arrayOfUsersEvents.length; i++) {
      console.log("************** IN THE FOR LOOP!!!!! ******************");
      if (typeof arrayOfUsersEvents[i].event_id === 'string') {
      getEventById(arrayOfUsersEvents[i].event_id).then((res) => {
        if (res.length > 0) {
          setListOfEvents((prevList) => {
            return [...prevList, res[0]]
          })
          eventsObtained.push(res);}
      }).then(() => {
        console.log("events obtained:", eventsObtained);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  }, [arrayOfUsersEvents]);

  useEffect(() => {
    console.log("list of events", listOfEvents);
  }, [listOfEvents])

  return (
    <View>
      <Text>UsersEventsScreen</Text>
      <ScrollView>
        {listOfEvents.map((event) => {
          return (
            <View key={event._id}>
              <Text>{event.event_name}</Text>
              <Button
                title="Edit an event"
                onPress={() => navigation.navigate("EditEventScreen")}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
