import { StyleSheet } from 'react-native';


const androidPressableButtonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 2,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})

export default androidPressableButtonStyles;