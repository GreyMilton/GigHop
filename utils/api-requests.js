import axios from "axios";

const gigHopAPI = axios.create({
	baseURL: "https://gig-hop.herokuapp.com/api/",
});

export const getEventsByTimestamp = (selectedTimestamp = " ") => {
	return gigHopAPI
		.get(`/events?filter_by=${selectedTimestamp.toISOString()}`)
		.then((response) => {
			return response.data;
		});
};

export const getTicketmasterEventsByTimestamp = (selectedTimestamp = " ") => {
	const startDate =
		`${selectedTimestamp.toISOString().substring(0, 11)}` + "00:00:00Z";
	const endDate =
		`${selectedTimestamp.toISOString().substring(0, 11)}` + "23:59:00Z";

	const reqStr = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&city=Plymouth&classificationName=music&startDateTime=${startDate}&endDateTime=${endDate}&apikey=qBX7LCUXqZgBssWsDOfW6ssvrwYWiYTV`;

	return axios
		.get(reqStr)
		.then((res) => {
			let eventArray = [];
			if (res.data._embedded) {
				res.data._embedded.events.map((event) => {
					eventArray.push({
						name: event.name,
						startTime: event.dates.start.dateTime,
						venue: event._embedded.venues[0].name,
						longitude: event._embedded.venues[0].location.longitude,
						latitude: event._embedded.venues[0].location.latitude,
						description: "Event from Ticketmaster",
						ticketmaster: true,
					});
				});
				return eventArray;
			} else return;
		})
		.catch((err) => {
			console.log(err);
		});
};

//if it throws errors remember that comma
export const getVenues = () => {
	return gigHopAPI
		.get("/venues")
		.then((res) => {
			return res.data;
			// console.log(res.data[0].venue_name);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getArtists = () => {
	return gigHopAPI
		.get("/artists")
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const postNewEventDetails = (data) => {
	let venueData = JSON.stringify(data);
	return gigHopAPI
		.post("/events", venueData, {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
			},
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const PostNewUser = (data) => {
	let userData = JSON.stringify(data);
	return gigHopAPI
		.post("/users", userData, {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
			},
		})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.log(err);
		});
};

export const PostNewArtist = (data) => {
	let artistData = JSON.stringify(data);
	return gigHopAPI
		.post("/artists", artistData, {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
			},
		})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const PostNewVenue = (data) => {
	let venueData = JSON.stringify(data);
	return gigHopAPI
		.post("/venues", venueData, {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
			},
		})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const getEventById = (eventId) => {
	return gigHopAPI.get(`/events/${eventId}`).then((response) => {
		return response.data;
	});
};

export const getAllUsers = () => {
	return gigHopAPI.get("users").then((users) => {
		return users.data;
	});
};

export const getSingleUser = (username) => {
	return gigHopAPI.get(`/users/${username}`).then((user) => {
		return user.data;
	});
};

export const getArtistById = (artistId) => {
	return gigHopAPI.get(`/artists/${artistId}`).then((response) => {
		return response.data;
	});
};

export const patchArtistNewEvent = (data, artistId) => {
	let addEvent = JSON.stringify(data);
	return gigHopAPI.patch(`/artists/${artistId}`, addEvent, {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
	});
};

export const patchVenueNewEvent = (data, venueId) => {
	let addEvent = JSON.stringify(data);
	return gigHopAPI.patch(`/venues/${venueId}`, addEvent, {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
	});
};

export const patchUserNewEvent = (data, userId) => {
	let addEvent = JSON.stringify(data);
	return gigHopAPI.patch(`/users/${userId}`, addEvent, {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
	});
};
