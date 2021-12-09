import axios from 'axios';

const gigHopAPI = axios.create({
  baseURL: 'https://gig-hop.herokuapp.com/api/'
});

export const getEventsByDate = (date = ' ') => {
  return gigHopAPI.get(`/events?filter_by=${date}`).then((response) => {console.log(response.data)});
}