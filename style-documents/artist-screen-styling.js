import { StyleSheet } from "react-native";

const artistScreenStyles = StyleSheet.create({
  artistScreenScrollViewContainer: {
    // flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
    backgroundColor: "#d8dee5",
  },
  artistScreenContainer: {
    backgroundColor: "#d8dee5",
    padding: 20,
    // margin: 10,
    // borderRadius: 5,
    // marginVertical: 8,
    // width: '90999999%'
  },
  artistScreenTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  eventDetailsContainer: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  artistScreenTextContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  artistScreenTextLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
    marginLeft: 4,
  },
  artistScreenText: {

    // backgroundColor: '#7cb48f',
    // borderColor: 'black',
    // borderWidth: 1,
    // margin: 5,
    // width: '100%'
    fontSize: 16,
    marginVertical: 4,
  },
  artistScreenImage: {
    resizeMode: 'contain',
    // width: '100%',
    height: 200,
    margin: 15,
  },
  artistScreenNoImage: {
    resizeMode: 'contain',
  },
  artistScreenButtonAndroid: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 4,
		margin: 2,
		elevation: 3,
		backgroundColor: "black",
  },
	artistScreenButtonTextAndroid: {
		fontSize: 14,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
  venueContainer: {
    marginTop: 20,
    // marginHorizontal: 10,
  },
  artistScreenVenueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    // margin: 4,
  },
  venueDetailsContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  artistScreenTextVenueName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 4,
    // marginLeft: 4,
  },
});

export default artistScreenStyles;