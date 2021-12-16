import { StyleSheet, Dimensions } from "react-native";

const mainScreenStyles = StyleSheet.create({
	mainScreenContainer: {
		flex: 1,
		backgroundColor: "#bfc4ca",
	},
	searchBarContainer: {
		marginVertical: 6,
		marginHorizontal: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	locationContainer: {
		flex: 1,
		alignItems: "center",
		marginVertical: 2,
	},
	locationInnerContainer: {
		backgroundColor: "white",
		alignItems: "center",
		marginVertical: 2,
	},
	locationInput: {
		// height: 30,
		borderWidth: 1,
		paddingVertical: 3,
		paddingHorizontal: 10,
		fontSize: 13,
	},
	timeAndDateInputContainer: {
		flex: 2,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginVertical: 2,
		marginHorizontal: 6,
	},
	timeAndDatePressableButtonsAndroid: {
		alignItems: "center",
		justifyContent: "space-around",
		paddingVertical: 6,
		paddingHorizontal: 16,
		marginHorizontal: 2,
		borderRadius: 4,
		elevation: 3,
		// backgroundColor: "black",
	},
	timeAndDatePressableButtonsTextAndroid: {
		fontSize: 13,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
	timeAndDateButtoniOSContainer: {
		flex: 1,
		// alignItems: "center",
		justifyContent: "space-around",
		// paddingVertical: 6,
		// paddingHorizontal: 16,
		marginHorizontal: 2,
		// borderRadius: 4,
		// elevation: 3,
		// backgroundColor: "white",
		// width: 100,
	},
	timeAndDateButtoniOS: {
		backgroundColor: "red",
		borderRadius: 4,
	},
	mapViewSwitchContainer: {},
	mapViewSwitchButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		// borderRadius: 4,
		elevation: 3,
		backgroundColor: "black",
		flexDirection: "row",
	},
	mapViewSwitchTextSelected: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "white",
	},
	mapViewSwitchTextNotSelected: {
		fontSize: 12,
		lineHeight: 21,
		// fontWeight: 'bold',
		letterSpacing: 0.25,
		color: "white",
	},
	mapDisplayContainer: {
		flex: 2,
		// width: Dimensions.get('window').width,
		// height: '100%',
		alignItems: "center",
	},
	map: {
		flex: 1,
		width: "100%",
		// width: Dimensions.get('window').width,
		// height: Dimensions.get('window').height,
		// height: '50%',
		position: "relative",
	},
	marker: {
		paddingVertical: 0,
		paddingHorizontal: 0,
		backgroundColor: "#c6ddcc",
		borderColor: "#eee",
		borderRadius: 5,
		elevation: 10,
	},
	callout: {},
	EventSummaryCalloutView: {
		backgroundColor: "white",
		borderRadius: 5,
	},
	EventSummaryCalloutHeader: {
		fontWeight: "bold",
		color: "black",
	},
	EventListDisplayScrollViewContainer: {
		backgroundColor: "#294460",
	},
	EventSummaryCardViewContainer: {},
	EventSummaryCardPressableButton: {
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
	EventSummaryCardPressableHeaderText: {
		fontSize: 14,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "black",
	},
	EventSummaryCardPressableText: {
		fontSize: 14,
		lineHeight: 18,
		// fontWeight: 'bold',
		letterSpacing: 0.25,
		color: "black",
	},
	EventSummaryCardPressableArrow: {
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

export default mainScreenStyles;
