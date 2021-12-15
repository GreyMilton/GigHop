import React, { useState, useEffect } from "react";
import formsStyles from "../style-documents/forms-styling";
import { getArtists } from "../utils/api-requests";
import { View } from 'react-native';
import {Picker, PickerIOS} from '@react-native-picker/picker'

export default function PickerForArtist({ currentArtist = "", setCurrentArtist, setArtistsLoading, artistsLoadingIndex }) {

  const [ArrayOfArtists, setArrayOfArtists] = useState([]);

  useEffect(() => {
    getArtists().then((res) => {
      setArrayOfArtists(res);
      setArtistsLoading((prevState)=> {
        const newState = [...prevState];
        newState[artistsLoadingIndex] = false;
        return newState;
      })
    });
  }, []);

  if (Platform.OS === "ios") {
    return (
      <View style={formsStyles.dropdownsContainer}>
        <PickerIOS
          selectedValue={currentArtist}
          style={formsStyles.dropdown}
          onValueChange={(itemValue) => setCurrentArtist(itemValue)}
        >
          <Picker.Item label="artist" value={""} />
          {ArrayOfArtists.map((artist) => {
            return (
              <Picker.Item
                key={artist._id}
                label={artist.artist_name}
                value={artist._id}
              />
            );
          })}
        </PickerIOS>
      </View>
    );
  } else {
    return (
      <View style={formsStyles.dropdownsContainer}>
        <Picker
          selectedValue={currentArtist}
          style={formsStyles.dropdown}
          onValueChange={(itemValue, itemIndex) => setCurrentArtist(itemValue)}
        >
          <Picker.Item label="artist" value={undefined} />
          {ArrayOfArtists.map((artist) => {
            return (
              <Picker.Item
                key={artist._id}
                label={artist.artist_name}
                value={artist._id}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}