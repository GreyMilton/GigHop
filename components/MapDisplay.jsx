import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
// import { mapStyle } from '../style-documents/map-style';
import EventSummaryCard from './EventSummaryCard';

export default function MapDisplay({ navigation }) {

  const venueArr = [
    {
      venue: "The Ship",
      coordinate: { latitude: 50.3678, longitude: -4.13566 },
      description: "pub with live music",
      pinColor: "yellow"
    },
    {
      venue: "The Three Crowns",
      coordinate: { latitude: 50.36835, longitude: -4.13577 },
      description: "pub with live music",
      pinColor: "cyan"
    },
    {
      venue: "Cap'n Jaspers",
      coordinate: { latitude: 50.36766, longitude: -4.13418 },
      description: "pub with live music",
      pinColor: "pink"
    },
    {
      venue: "Bar Rakuda",
      coordinate: { latitude: 50.36763, longitude: -4.13511 },
      description: "pub with live music",
      pinColor: "green"
    }
  ];


  return (
    <View>
      <MapView provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={styles.map}
          initialRegion={{
            latitude: 50.376289,
            longitude: -4.143841,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>
          {venueArr.map(venue => {
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
              />
            );
          })}
          <Marker coordinate={{ latitude: 50.376289, longitude: -4.143841 }}/>
      </MapView>
      <EventSummaryCard />
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
  map: {
    // flex: 70,
    width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    height: 150,
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