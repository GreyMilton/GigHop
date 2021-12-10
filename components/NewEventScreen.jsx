import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View, Picker } from "react-native";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { getVenues, getArtists } from "./utils/get";
export default function NewEventScreen({ navigation }) {
  const [eventName, setEventName] = useState("");
  const [artist, setArtist] = useState("");
  const [venue, setVenue] = useState("");
  const [venueAddress, setvenueAddress] = useState("");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [picture, setPicture] = useState();
  const [ArrayOfVenues, setArrayofVenues] = useState([]);
  const [ArrayOfArtists, setArrayofArtists] = useState([]);

  useEffect(() => {
    getVenues().then((res) => {
      setArrayofVenues(res);
    });
  }, []);
  useEffect(() => {
    getArtists().then((res) => {
      setArrayofArtists(res);
    });
  }, []);

  //when you have collected all the details have been entered
  const [newEvent, setnewEvent] = useState();
  const [newArtist, setnewArtist] = useState();
  const [newVenue, setnewVenue] = useState();
  const [newVenueAdress, setnewVenueAdress] = useState();
  const [newstartTime, setnewstartTime] = useState();
  const [newendTime, setnewendTime] = useState();
  const [newprice, setnewPrice] = useState();
  const [newDescription, setnewDescriptin] = useState();
  const [newPicture, setnewPicture] = useState();
  // console.log(newEvent, newArtist, newVenue, newVenueAdress, newstartTime);

  //  "event_name",
  //   "entry_price",
  //   "description",
  //   "venue_id",
  //   "user_id",
  //   "artists_ids",
  //   "authorised",
  //   "time_end",
  //   "time_start",
  //   "picture"
  return (
    <SafeAreaView>
      <form action="">
        <TextInput
          required
          style={styles.input}
          onChangeText={setEventName}
          value={eventName}
          placeholder="event name"
          keyboardType="text"
        />
        {/* <TextInput
          required
          style={styles.input}
          onChangeText={setArtist}
          value={artist}
          placeholder="artist"
          keyboardType="text"
          //select
        /> */}
        <Picker
          selectedValue={artist}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setArtist(itemValue)}
        >
          <Picker.Item label="artist" value={undefined} />
          {ArrayOfArtists.map((artist) => {
            return (
              <Picker.Item label={artist.artist_name} value={artist._id} />
            );
          })}
        </Picker>

        <Picker
          selectedValue={venue}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setVenue(itemValue)}
        >
          <Picker.Item label="venue" value={undefined} />
          {/* <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" /> */}
          {ArrayOfVenues.map((venue) => {
            return <Picker.Item label={venue.venue_name} value={venue._id} />;
          })}
        </Picker>
        {/* 
        <TextInput
          required
          style={styles.input}
          onChangeText={setVenue}
          value={venue}
          placeholder="Venue"
          keyboardType="text"
        /> */}

        <TextInput
          required
          style={styles.input}
          onChangeText={setstartTime}
          value={startTime}
          placeholder="start time"
          keyboardType="text"
        />
        <TextInput
          required
          style={styles.input}
          onChangeText={setendTime}
          value={endTime}
          placeholder="end time"
          keyboardType="text"
        />
        <TextInput
          required
          style={styles.input}
          onChangeText={setPrice}
          value={price}
          placeholder="price"
          keyboardType="number"
        />
        <TextInput
          multiline
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="description"
          keyboardType="text"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPicture}
          value={picture}
          placeholder="picture"
          keyboardType="text"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setnewEvent(eventName);
            setEventName(""); //clear the interface
            setnewArtist(artist);
            setArtist("");
            setnewVenue(venue);
            setVenue("");
            setnewVenueAdress(venueAddress);
            setvenueAddress("");
            setnewstartTime(startTime);
            setstartTime("");
          }}
        >
          submit event
        </button>
      </form>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
