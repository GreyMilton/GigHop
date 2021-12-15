import { StyleSheet } from "react-native";

const confirmationScreenStyles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: "#d8dee5",
  },
  outermostViewContainer: {
    marginTop: 6,
  },
  listItemOuterContainer: {
    margin: 15,
  },
  listItemInnerContainer: {

  },
  sectionContainer: {

  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 4,
    marginBottom: 14,
    marginLeft: 4,
  },
  confirmationsTextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
		marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
		marginVertical: 10,
  },
  timeTextOuterContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  timeTextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  textLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 4,
    marginLeft: 4,
  },
  text: {
    // backgroundColor: '#7cb48f',
    // borderColor: 'black',
    // borderWidth: 1,
    // margin: 5,
    // width: '100%'
    fontSize: 14,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  pressableButtons: {
		alignItems: "center",
		justifyContent: "space-around",
		padding: 14,
		borderRadius: 4,
		margin: 2,
		elevation: 3,
		backgroundColor: "black",
    width: 250,
  },
	pressableButtonsText: {
		fontSize: 15,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
  pressableDeleteButtons: {
		alignItems: "center",
		justifyContent: "space-around",
		padding: 14,
		borderRadius: 4,
		margin: 2,
		elevation: 3,
    width: 110,
		backgroundColor: '#64002d',
  },
  borderLineContainer: {
    marginTop: 16,
  },
  borderLine: {
    textAlign: 'center',
  },
});

export default confirmationScreenStyles;
