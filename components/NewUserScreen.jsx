import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {Checkbox} from 'react-native-paper'
import { Form, FormItem } from "react-native-form-component";
import { PostNewUser, PostNewArtist, PostNewVenue } from "./utils/post";



export default function NewUserScreen() {
    const [username, setUsername] = useState('');
    const [artistPicture, setArtistPicture] = useState('');
    const [checkedArtist, setCheckedArtist] = useState(false);
    const [checkedVenue, setCheckedVenue] = useState(false);
    const [artistDescription, setArtistDescription] = useState('');
    const [genre, setGenre] = useState(''); 
    const [venueName, setVenueName] = useState('');
    const [latitude, setLatitude] = useState(50);
    const [longitude, setLongitude] = useState(-4);
    const [venueDescription, setVenueDescription] = useState('');
    const [venuePicture, setVenuePicture] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [artistName, setArtistName] = useState('');



    let venueForm;
    let artistForm;
    if (checkedArtist) {
        artistForm = (
            <View>                      
                <FormItem label='Artist name' value={artistName} onChangeText={(artistName) => {setArtistName(artistName)}} />
                <FormItem label='Artist Description' value={artistDescription} onChangeText={(artistDescription) => {setArtistDescription(artistDescription)}} />
                <FormItem label='artist Picture' value={artistPicture} onChangeText={(artistPicture) => {setArtistPicture(artistPicture)}} />
                <FormItem label='genre' value={genre} onChangeText={(genre) => {setGenre(genre)}} />
            </View>
        )
    }
    if (checkedVenue) {
        venueForm = (
            <View>
                <FormItem label="Venue Name" value={venueName} onChangeText={(venueName) => {setVenueName(venueName)}} />
                <FormItem label="Latitude" keyboardType={"decimal-pad"} value={latitude} onChangeText={(latitude) => {setLatitude(latitude)}} />
                <FormItem keyboardType={"decimal-pad"} label="Longitude" value={longitude} onChangeText={(longitude) => {setLongitude(longitude)}} />
                <FormItem label="Venue Description" value={venueDescription} onChangeText={(venueDescription) => {setVenueDescription(venueDescription)}} />
                <FormItem label="Venue picture" value={venuePicture} onChangeText={(venuePicture) => {setVenuePicture(venuePicture)}} />
                <FormItem label="Venue address" value={venueAddress} onChangeText={(venueAddress) => {setVenueAddress(venueAddress)}} />
            </View>
        )
    }
    const onPressHandler = async () => {
        let newUserData = {
            username: username,
            picture: profilePicture,
            artist: checkedArtist,
            venue: checkedVenue,
            events: []
        };
        let newArtistData = {
            artist_name: artistName,
            description: artistDescription,
            picture: artistPicture,
            genre: genre,
            upcoming_events:[]
        }
        let newVenueData = {
            venue_name: venueName,
            coordinates:{
                latitude:latitude,
                longitude: longitude
            },
            description: venueDescription,
            picture: venuePicture,
            address: venueAddress,
            upcoming_events: []
        }
        let newUser = await PostNewUser(newUserData);
        console.log(newUser)
        if(checkedArtist) {
            PostNewArtist(newArtistData)
        }
        if(checkedVenue) {
            PostNewVenue(newVenueData)
        }
    }

    return (
        <ScrollView>
            <Form onButtonPress={onPressHandler}>
                <FormItem label='Username' value={username} onChangeText={(username) => {setUsername(username)}} />
                <FormItem label='Profile picture' value={profilePicture} onChangeText={(profilePicture) => {setProfilePicture(profilePicture)}} />
                <Text>Are you an artist</Text><Checkbox status={checkedArtist ? 'checked': 'unchecked'} onPress={() => setCheckedArtist(!checkedArtist)} />
                <Text>Are you a venue</Text><Checkbox status={checkedVenue ? 'checked': 'unchecked'} onPress={() => setCheckedVenue(!checkedVenue)} />
                {artistForm}
                {venueForm}
            </Form>
        </ScrollView>
    )
}