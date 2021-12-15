import { StyleSheet } from "react-native";

const userScreenStyles = StyleSheet.create({
	userScreenOuterContainer: {
		backgroundColor: "#d8dee5",
	},
	userScreenContainer: {
		// marginVertical: 20,
		marginHorizontal: 10,
		flexDirection: 'column',
		backgroundColor: "#d8dee5",
	},
  userPicture: {
    // resizeMode: 'contain',
    borderRadius: 50,
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 15,
  },
	recycledTabNavButtonsContainer: {

	},
	userScreenButtonsContainer: {
		marginVertical: 30,
	},
	userScreenLogOutButtonContainer: {
		marginVertical: 10,
	},
	UserScreenButtonAndroid: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		padding: 14,
		borderRadius: 4,
		margin: 2,
		elevation: 3,
		backgroundColor: "black",
  },
	UserScreenLogOutButtonAndroid: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-around",
		padding: 14,
		borderRadius: 4,
		margin: 2,
		elevation: 3,
		backgroundColor: '#4e001c',
  },
	UserScreenButtonTextAndroid: {
		fontSize: 15,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
	userScreenPrompt: {
		marginBottom: 20,
		textAlign: 'center',
		// fontWeight: 'bold',
	},
});

export default userScreenStyles;