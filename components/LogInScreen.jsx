import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View, Pressable } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';
import { UserContext } from '../contexts/UserContext';
import { getAllUsers, getSingleUser } from '../utils/api-requests';
import formsStyles from '../style-documents/forms-styling';

export default function LogInScreen({ navigation }) {

  const [userName, setUserName] = useState("");
  const [validUsers, setValidUsers] = useState([]);
  const [showInvalidUser, setInvalidUser] = useState(false);
  const { setCurrentUser } = useContext(UserContext);
  
  useEffect(() => {
    getAllUsers()
      .then((listOfUsers) => {
        const usernames = listOfUsers.map(user => user._id);
        setValidUsers(usernames);
      })
  }, []);

  const onSubmit = () => {
    if (validUsers.includes(userName)) {
      setInvalidUser(false);
      getSingleUser(userName)
        .then(selectedUser => {
          setCurrentUser(selectedUser)
        })
    } else {
      setInvalidUser(true);
    }
  } 
  
  let errorMessage = "";

  if (showInvalidUser) {
    errorMessage = "Invalid username";
  }

  return (
    <ScrollView style={formsStyles.logInScreenContainer}>
      <Text style={formsStyles.logInGuidance} >Please enter your username to log in</Text>
      <Text>{errorMessage}</Text>
      <Form buttonText="Log In" onButtonPress={onSubmit} buttonStyle={formsStyles.submitButton} buttonTextStyle={formsStyles.submitButtonText}>
        <View style={formsStyles.formItemContainer}>
          <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label="Username" value={userName} onChangeText={ (userName) => {
            setUserName(userName)
            setInvalidUser(false)
          } }/>
        </View>
      </Form>
      <View style={formsStyles.logInScreenSignUpContainer}>
        <Text style={formsStyles.logInScreenSignUpSuggestion}>Don't yet have an account?</Text>
        <Text style={formsStyles.logInScreenSignUpSuggestion}>Create an account to add, edit, and confirm new gigs.</Text>
        <Pressable onPress={() => { navigation.navigate('Sign Up') }}style={formsStyles.logInScreenSignUpButtonAndroid} >
          <Text style={formsStyles.logInScreenSignUpButtonTextAndroid}>Sign Up Now</Text>
        </Pressable>
        <Text style={formsStyles.logInScreenSignUpSuggestion}>Soon you'll be able to save and track fave gigs, receive gig suggestions, and more!</Text>
      </View>
    </ScrollView>
  );
}