import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, StatusBar} from 'react-native';
import { getArtistById } from '../utils/api-requests';

export default function ArtistScreen(props) {
  const artistId = props.route.params.artist_id;

  const [artist, setArtist] = useState();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getArtistById(artistId).then((response) => {
      setArtist(response);
      setIsLoading(false);
    });
  }, []);

    if (isLoading) return (
      <View style={styles.LoadingContainer}>
        <Text style={styles.LoadingText}>Loading Artist...</Text>
      </View>
    )
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Artist Details:</Text>
        <Text style={styles.text}>Artist {artist.artist_name}</Text>
        <Text style={styles.text}>Description {artist.description}</Text>
        <Image style={[artist.picture ? styles.image : styles.noImage]}source={{ uri: artist.picture}}/>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: "#AFD2E9",
  },
  text: {
    backgroundColor: '#7cb48f',
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
    width: '100%'
  },
  item: {
    backgroundColor: "#C9F299",
    padding: 20,
    marginVertical: 8,
    width: '90%'
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 200
  },
  noImage: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  LoadingContainer: {
		flex: 1,
		backgroundColor: "#d8dee5",
		justifyContent: "center",
		alignItems: "center",
	},
  LoadingText: {
		color: "black",
		fontSize: 30,
	}
});