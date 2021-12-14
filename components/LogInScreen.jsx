import React, { useState, useContext, useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { Form, FormItem } from 'react-native-form-component';
import { UserContext } from '../contexts/UserContext';
import { getAllUsers, getSingleUser } from '../utils/api-requests';

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
      <Text>Please enter your username to login</Text>
      <Text>{errorMessage}</Text>
      <Form onButtonPress={onSubmit}>
        <FormItem label="Username" value={userName} onChangeText={ (userName) => {
            setUserName(userName)
            setInvalidUser(false)
          } }/>
      </Form>
    </ScrollView>
  );
}