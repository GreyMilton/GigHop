import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

export default function LocationInput({ navigation }) {

  const [text, onChangeText] = useState("Plymouth");

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
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