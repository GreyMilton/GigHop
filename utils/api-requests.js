import axios from 'axios';

const gigHopAPI = axios.create({
  baseURL: 'https://gig-hop.herokuapp.com/api/'
});

export const getEventsByTimestamp = (selectedTimestamp = ' ') => {
  return gigHopAPI.get(`/events?filter_by=${selectedTimestamp.toISOString()}`).then((response) => {return response.data});
}

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

export const PostNewEventDetails = (data) => {
  let venueData = JSON.stringify(data)
  console.log(venueData)
  return gigHopAPI.post("/events",
    venueData, {headers: {
      'Content-Type': 'application/json;charset=UTF-8'}}
  )
  .then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  });
};

export const PostNewUser = (data) => {
  let userData = JSON.stringify(data)
  return gigHopAPI.post('/users', userData, {headers: {
    'Content-Type': 'application/json;charset=UTF-8'}}
    ).then((res) => {
      return res
      console.log(res)
    }). catch ((err) => {
      console.log(err)
    })
}

export const PostNewArtist = (data) => {
  let artistData = JSON.stringify(data)
  return gigHopAPI.post('/artists', artistData, {headers: {
    'Content-Type': 'application/json;charset=UTF-8'}}
    ).then((res) => {
      console.log(res)
    }). catch ((err) => {
      console.log(err)
    })
}

export const PostNewVenue = (data) => {
  let venueData = JSON.stringify(data)
  return gigHopAPI.post('/venues', venueData, {headers: {
    'Content-Type': 'application/json;charset=UTF-8'}}
    ).then((res) => {
      console.log(res)
    }). catch ((err) => {
      console.log(err)
    })
}

export const getEventById = (eventId) => {
  return gigHopAPI.get(`/events/${eventId}`).then((response) => {return response.data});
}

export const getArtistById = (artistId) => {
  return gigHopAPI.get(`/artists/${artistId}`).then((response) => {return response.data});
}