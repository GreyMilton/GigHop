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
