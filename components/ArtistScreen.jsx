import React from 'react';
import { Text } from 'react-native';

export default function ArtistScreen(props) {
    console.log(props.route.params.artist_id)
    return <Text>Artist Id: {props.route.params.artist_id}</Text>
}