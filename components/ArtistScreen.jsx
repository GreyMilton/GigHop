import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, StatusBar} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import artistScreenStyles from '../style-documents/artist-screen-styling';
import { getArtistById } from '../utils/api-requests';

export default function ArtistScreen(props) {
  const artistsIds = props.route.params.artists_ids;

  const [artists, setArtists] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setArtists();
    Promise.all(artistsIds.map((artist) => {
      if (typeof artist === 'string') {
        return getArtistById(artist);
      } else {
      return getArtistById(artist.artist_id);
    }
    })).then((res) => {
      setArtists(res);
      setIsLoading(false);
    }).catch(console.log);
  }, []);

    if (isLoading) return (
      <View style={styles.LoadingContainer}>
        <Text style={styles.LoadingText}>Loading Artist...</Text>
      </View>
    )
    return (
      <ScrollView style={artistScreenStyles.artistScreenScrollViewContainer} >
        <View style={artistScreenStyles.artistScreenContainer}>
          <Text style={artistScreenStyles.artistScreenTitle}>Artist{artists.length > 1 && 's'}</Text>
          {artists.map((artist) => {
            return (
              <View key={artist._id} >
                <View style={artistScreenStyles.artistDetailsContainer}>
                  <View style={artistScreenStyles.artistScreenTextContainer}>
                    <Text style={artistScreenStyles.artistScreenTextLabel}>Artist:</Text>
                    <Text style={artistScreenStyles.artistScreenText}> {artist.artist_name}</Text>
                  </View>
                  <View style={artistScreenStyles.artistScreenTextContainer}>
                    <Text style={artistScreenStyles.artistScreenTextLabel}>Description:</Text>
                    <Text style={artistScreenStyles.artistScreenText}> {artist.description}</Text>
                  </View>
                </View>
                { artist.picture ?
                  <Image style={artistScreenStyles.artistScreenImage} source={{ uri: artist.picture}}/>
                : null}
              </View>
            )
          })}
        </View>
      </ScrollView>
          );

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