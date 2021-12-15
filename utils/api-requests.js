import axios from "axios";

const gigHopAPI = axios.create({
  baseURL: "https://gig-hop.herokuapp.com/api/"
});

export const getEventsByTimestamp = (selectedTimestamp = " ") => {
  return gigHopAPI
    .get(`/events?filter_by=${selectedTimestamp.toISOString()}`)
    .then(response => {
      return response.data;
    });
};

//if it throws errors remember that comma
export const getVenues = () => {
  return gigHopAPI
    .get("/venues")
    .then(res => {
      return res.data;
      // console.log(res.data[0].venue_name);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getArtists = () => {
  return gigHopAPI
    .get("/artists")
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const postNewEventDetails = data => {
  let venueData = JSON.stringify(data);
  return gigHopAPI
    .post("/events", venueData, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const PostNewUser = data => {
  let userData = JSON.stringify(data);
  return gigHopAPI
    .post("/users", userData, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

export const PostNewArtist = data => {
  let artistData = JSON.stringify(data);
  return gigHopAPI
    .post("/artists", artistData, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
    .then(res => {
      return res.data._id;
    })
    .catch(err => {
      console.log(err);
    });
};

export const PostNewVenue = data => {
  let venueData = JSON.stringify(data);
  return gigHopAPI
    .post("/venues", venueData, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    })
    .then(res => {
      return res.data._id;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getEventById = eventId => {
  return gigHopAPI.get(`/events/${eventId}`).then(response => {
    return response.data;
  });
};

export const getAllUsers = () => {
  return gigHopAPI.get("users").then(users => {
    return users.data;
  });
};

export const getSingleUser = username => {
  return gigHopAPI.get(`/users/${username}`).then(user => {
    return user.data;
  });
};

export const getArtistById = artistId => {
  return gigHopAPI.get(`/artists/${artistId}`).then(response => {
    return response.data;
  });
};

export const patchArtistNewEvent = (data, artistId) => {
  let addEvent = JSON.stringify(data);
  return gigHopAPI.patch(`/artists/${artistId}`, addEvent, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const patchVenueNewEvent = (data, venueId) => {
  let addEvent = JSON.stringify(data);
  return gigHopAPI.patch(`/venues/${venueId}`, addEvent, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const patchUserNewEvent = (data, userId) => {
  let addEvent = JSON.stringify(data);
  return gigHopAPI.patch(`/users/${userId}`, addEvent, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const patchUserIsArtist = (data, userId) => {
  let isArtist = JSON.stringify(data);
  return gigHopAPI.patch(`/users/${userId}`, isArtist, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const patchUserIsVenue = (data, userId) => {
  let isVenue = JSON.stringify(data);
  return gigHopAPI.patch(`/users/${userId}`, isVenue, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const patchConfirmEvent = (data, eventId) => {
  let confirm = JSON.stringify(data);
  return gigHopAPI.patch(`/events/${eventId}`, confirm, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const getVenueById = venueId => {
  return gigHopAPI.get(`/venues/${venueId}`).then(response => {
    return response.data;
  });
};

export const deleteEventById = eventId => {
  gigHopAPI.delete(`/events/${eventId}`);
};

export const patchArtistDeleteEvent = (data, artistId) => {
  let addEvent = JSON.stringify(data);
  return gigHopAPI.patch(`/artists/${artistId}`, addEvent, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const patchVenueDeleteEvent = (data, venueId) => {
  let addEvent = JSON.stringify(data);
  return gigHopAPI.patch(`/venues/${venueId}`, addEvent, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};

export const patchUserDeleteEvent = (data, userId) => {
  let addEvent = JSON.stringify(data);
  return gigHopAPI.patch(`/users/${userId}`, addEvent, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    }
  });
};
