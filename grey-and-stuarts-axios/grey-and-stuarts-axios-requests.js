import axios from 'axios';

const gigHopAPI = axios.create({
  baseURL: 'https://gig-hop.herokuapp.com/api/'
});

export const getEventsByTimestamp = (selectedTimestamp = ' ') => {
  return gigHopAPI.get(`/events?filter_by=${selectedTimestamp.toISOString()}`).then((response) => {return response.data});
}

 // When sending get request, timestamp will need to be sent as:
  //    selectedTimestamp.toISOString()
