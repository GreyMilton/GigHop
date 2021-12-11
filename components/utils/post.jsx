import axios from "axios";

export const gigHopAPI = axios.create({
  baseURL: "https:gig-hop.herokuapp.com/api",
});

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
      console.log(res)
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
