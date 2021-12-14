import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {Checkbox} from 'react-native-paper'
import { Form, FormItem } from "react-native-form-component";
import { PostNewUser, PostNewArtist, PostNewVenue, patchUserIsArtist, patchUserIsVenue } from "../utils/api-requests";
import formsStyles from "../style-documents/forms-styling";


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
            <View style={formsStyles.artistFormContainer}>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label='Artist name' value={artistName} onChangeText={(artistName) => {setArtistName(artistName)}} />
                </View>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label='Artist Description' value={artistDescription} onChangeText={(artistDescription) => {setArtistDescription(artistDescription)}} />
                </View>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label='artist Picture' value={artistPicture} onChangeText={(artistPicture) => {setArtistPicture(artistPicture)}} />
                </View>
                <View style={formsStyles.formItemContainer}>    
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label='genre' value={genre} onChangeText={(genre) => {setGenre(genre)}} />
                </View>
            </View>
        )
    }
    if (checkedVenue) {
        venueForm = (
            <View style={formsStyles.venueFormContainer}>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label="Venue Name" value={venueName} onChangeText={(venueName) => {setVenueName(venueName)}} />
                </View>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label="Latitude" keyboardType={"decimal-pad"} value={latitude} onChangeText={(latitude) => {setLatitude(latitude)}} />
                </View>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} keyboardType={"decimal-pad"} label="Longitude" value={longitude} onChangeText={(longitude) => {setLongitude(longitude)}} />
                </View>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label="Venue Description" value={venueDescription} onChangeText={(venueDescription) => {setVenueDescription(venueDescription)}} />
                </View>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label="Venue picture" value={venuePicture} onChangeText={(venuePicture) => {setVenuePicture(venuePicture)}} />
                </View>
                <View style={formsStyles.formItemContainer}>
                    <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label="Venue address" value={venueAddress} onChangeText={(venueAddress) => {setVenueAddress(venueAddress)}} />
                </View>
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
        <ScrollView style={formsStyles.addUserScrollView}>
            <View style={formsStyles.addUserContainer} >
                <Form onButtonPress={onPressHandler} buttonText="Submit New User" buttonStyle={formsStyles.submitButton} buttonTextStyle={formsStyles.submitButtonText}>
                    <View style={formsStyles.formItemContainer}>
                        <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label='Username' value={username} onChangeText={(username) => {setUsername(username)}} />
                    </View>
                    <View style={formsStyles.formItemContainer}>
                        <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label='Profile picture' value={profilePicture} onChangeText={(profilePicture) => {setProfilePicture(profilePicture)}} />
                    </View>
                    <View style={formsStyles.checkboxesContainer} >
                    <View style={formsStyles.checkboxOuterContainer} >
                        <View style={formsStyles.checkboxContainer} >
                            <Checkbox color="#18c232" uncheckedColor="#18528a" status={checkedArtist ? 'checked': 'unchecked'} onPress={() => setCheckedArtist(!checkedArtist)} />
                        </View>
                        <Text style={formsStyles.checkboxLabel} >Are you an artist?</Text>
                    </View>
                    <View style={formsStyles.checkboxOuterContainer} >
                        <View style={formsStyles.checkboxContainer} >
                            <Checkbox color="#eab76b" uncheckedColor="#18528a" status={checkedVenue ? 'checked': 'unchecked'} onPress={() => setCheckedVenue(!checkedVenue)} />
                        </View>
                        <Text style={formsStyles.checkboxLabel}>Are you a venue?</Text>
                    </View>
                    </View>
                    {artistForm}
                    {venueForm}
                </Form>
            </View>
        </ScrollView>
    )
}