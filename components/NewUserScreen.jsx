import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {Checkbox} from 'react-native-paper'
import { Form, FormItem } from "react-native-form-component";
import { PostNewUser, PostNewArtist, PostNewVenue, patchUserIsArtist, patchUserIsVenue } from "../utils/api-requests";

export default function NewUserScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [artistPicture, setArtistPicture] = useState('');
    const [checkedArtist, setCheckedArtist] = useState(false);
    const [checkedVenue, setCheckedVenue] = useState(false);
    const [artistDescription, setArtistDescription] = useState('');
    const [genre, setGenre] = useState(''); 
    const [venueName, setVenueName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
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
                <FormItem label="Latitude" keyboardType={"decimal-pad"} value={latitude.toString()} onChangeText={(latitude) => {setLatitude(latitude)}} />
                <FormItem keyboardType={"decimal-pad"} label="Longitude" value={longitude.toString()} onChangeText={(longitude) => {setLongitude(longitude)}} />
                <FormItem label="Venue Description" value={venueDescription} onChangeText={(venueDescription) => {setVenueDescription(venueDescription)}} />
                <FormItem label="Venue picture" value={venuePicture} onChangeText={(venuePicture) => {setVenuePicture(venuePicture)}} />
                <FormItem label="Venue address" value={venueAddress} onChangeText={(venueAddress) => {setVenueAddress(venueAddress)}} />
            </View>
        )
    }
    const onPressHandler = async () => {
        let newUserData = {
            _id: username,
            picture: profilePicture,
            artist: '',
            venue: '',
            events: []
        };
        let newArtistData = {
            user_id: username,
            artist_name: artistName,
            description: artistDescription,
            picture: artistPicture,
            genre: genre,
            upcoming_events:[]
        }
        let newVenueData = {
            user_id: username,
            venue_name: venueName,
            coordinates:{
                latitude:{'$numberDecimal': latitude},
                longitude: {'$numberDecimal': longitude}
            },
            description: venueDescription,
            picture: venuePicture,
            address: venueAddress,
            upcoming_events: []
        }
        await PostNewUser(newUserData);
        
        if(checkedArtist) {
            let artistId = await PostNewArtist(newArtistData);
            let isArtist = {
                is_artist: {artist: artistId}
            }
            patchUserIsArtist(isArtist, username)
        }
        if(checkedVenue) {
            let venueId = await PostNewVenue(newVenueData);
            let isVenue = {
                is_venue: {venue: venueId}
            }
            patchUserIsArtist(isVenue, username)
        }

        navigation.navigate('Find gigs');

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