import eventScreenStyles from "./event-screen-styling";
import formsStyles from "./forms-styling";
import mainScreenStyles from "./main-screen-styling";
import userScreenStyles from "./user-screen-styling";
import confirmationScreenStyles from "./confirmation-screen-styling"

export function eventScreenButton({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7c7c7c'
        : 'black'
    },
    eventScreenStyles.eventScreenButtonAndroid
  ]
};

export function signUpOnLogInScreenButton({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7c7c7c'
        : 'black'
    },
    formsStyles.logInScreenSignUpButtonAndroid
  ]
};

export function timeAndDateButtonsAndroid({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7c7c7c'
        : 'black'
    },
    mainScreenStyles.timeAndDatePressableButtonsAndroid
  ]
};

export function timePickerButtonAndroid({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7c7c7c'
        : 'black'
    },
    formsStyles.timePickerButtonAndroid
  ]
};

export function datePickerButtonAndroid({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7c7c7c'
        : 'black'
    },
    formsStyles.datePickerButtonAndroid
  ]
};

export function userScreenButtonAndroid({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7c7c7c'
        : 'black'
    },
    userScreenStyles.UserScreenButtonAndroid
  ]
};

export function confirmationScreenButton({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7c7c7c'
        : 'black'
    },
    confirmationScreenStyles.pressableButtons
  ]
};

export function confirmationScreenDeleteButton({ pressed }) {
  return [
    {
      backgroundColor: pressed
        ? '#7e5758'
        : '#64002d',
    },
    confirmationScreenStyles.pressableDeleteButtons
  ]
};