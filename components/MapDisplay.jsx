import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
// import { mapStyle } from '../style-documents/map-style';
import EventSummaryCard from './EventSummaryCard';

export default function MapDisplay({ venuesInCurrentViewWithGigs }) {

  const [cardIsDisplaying, setCardIsDisplaying] = useState(false);

  const setCardDisplayFalse = () => {
    setCardIsDisplaying(prevState => {
      if (prevState) return false;
    })
  }

  const setCardDisplayTrue = () => {
    setCardIsDisplaying(prevState => {
      if (!prevState) return true;
    })
  }

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={styles.map}
          onPress={setCardDisplayFalse}
          initialRegion={{
            latitude: 50.376289,
            longitude: -4.143841,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          {venuesInCurrentViewWithGigs.map(venue => {
            return (
              <Marker
                key={venue.venue} 
                coordinate={{
                  latitude: venue.coordinate.latitude,
                  longitude: venue.coordinate.longitude
                }}
                pinColor={venue.pinColor}
                title={venue.venue}
                description={venue.description}
                onPress={setCardDisplayTrue}
              />
            );
          })}
      </MapView>
      {cardIsDisplaying ? <View style={styles.card}>
        <EventSummaryCard />
      </View> : null}
    </View>
  );
}


const styles = StyleSheet.create({
  // container1: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  card: {
    width: 390,
    height: 60,
    position: 'absolute',
    top: 170,
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 4,
  },
  map: {
    // flex: 70,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    height: 240,
    position: 'relative',
  },
  // container2: {
  //   flex: 4,
  //   backgroundColor: '#fff',
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  // },
  // container3: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  marker: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: "#c6ddcc",
    borderColor: "#eee",
    borderRadius: 5,
    elevation: 10,
  },
  text: {
  color: "#fff",   
  },
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]