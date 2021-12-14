import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getSingleUser, getEventById } from "../utils/api-requests";

export default function UsersEventsScreen({ navigation }) {
  const [arrayofuserevents, setArrayofuserevents] = useState([]);
  const [listofEvents, setlistofEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.getParent().addListener("focus", () => {
      navigation.popToTop();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getSingleUser("JamesRod7").then((response) => {
      console.log(Array.isArray(response.events));
      setArrayofuserevents(response.events);
    });
  }, []);

  let eventsObtained = [];

  useEffect(() => {
    for (let i = 0; i < arrayofuserevents.length; i++) {
      getEventById(arrayofuserevents[i].event_id).then((res) => {
        eventsObtained.push(res.event_name);
      });
    }
    if (eventsObtained.length === arrayofuserevents.length) {
      setlistofEvents(eventsObtained);
    }
  }, [eventsObtained]);

  console.log(listofEvents);

  return (
    <View>
      <Text>UsersEventsScreen</Text>
      <ScrollView>
        {listofEvents.map((event) => {
          return (
            <View>
              {event}
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
