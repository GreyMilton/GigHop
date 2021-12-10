import axios from "axios";

export const gigHopAPI = axios.create({
  baseURL: "https:gig-hop.herokuapp.com/api",
});

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
