import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';
import { UserContext } from '../contexts/UserContext';
import { getAllUsers, getSingleUser } from '../utils/api-requests';
import formsStyles from '../style-documents/forms-styling';

export default function LogInScreen() {

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
    <ScrollView>
      <Text style={formsStyles.logInGuidance} >Please enter your username to login</Text>
      <Text>{errorMessage}</Text>
      <Form onButtonPress={onSubmit} buttonStyle={formsStyles.submitButton} buttonTextStyle={formsStyles.submitButtonText}>
        <View style={formsStyles.formItemContainer}>
          <FormItem labelStyle={formsStyles.label} textInputStyle={formsStyles.input} label="Username" value={userName} onChangeText={ (userName) => {
            setUserName(userName)
            setInvalidUser(false)
          } }/>
        </View>
      </Form>
    </ScrollView>
  );
}