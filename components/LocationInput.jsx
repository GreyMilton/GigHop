import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import mainScreenStyles from '../style-documents/main-screen-styling';

export default function LocationInput() {

  const [text, onChangeText] = useState("Plymouth");

  return (
    <View style={mainScreenStyles.locationContainer} >
      <TextInput
        style={mainScreenStyles.locationInput}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
}