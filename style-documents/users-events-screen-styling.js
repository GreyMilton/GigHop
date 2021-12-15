import { StyleSheet } from "react-native";

const usersEventsScreenStyles = StyleSheet.create({
	usersEventsScrollViewContainer: {
		backgroundColor: "#294460",
	},
	// usersEventsScreenContainer: {
	// 	flex: 1,
	// 	backgroundColor: "#bfc4ca",
	// },
	usersEventsEventViewContainer: {

	},
	usersEventsPressableEvent: {
		// alignItems: 'center',
		justifyContent: "space-between",
		paddingVertical: 8,
		paddingHorizontal: 18,
		marginVertical: 5,
		marginHorizontal: 7,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "white",
		flexDirection: "row",
	},
	usersEventsPressableHeaderText: {
		fontSize: 14,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "black",
	},
	usersEventsPressableText: {
		fontSize: 14,
		lineHeight: 18,
		// fontWeight: 'bold',
		letterSpacing: 0.25,
		color: "black",
	},
	usersEventsPressableArrow: {
		fontSize: 18,
		alignSelf: "center",
		fontWeight: "bold",
	},
	



	LoadingContainer: {
		flex: 1,
		backgroundColor: "#294460",
		justifyContent: "center",
		alignItems: "center",
	},
	LoadingPopupContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	LoadingPopup: {
		backgroundColor: "black",
		borderRadius: 5,
		padding: 5,
	},
	LoadingText: {
		color: "white",
		fontSize: 30,
	},



});

export default usersEventsScreenStyles;
