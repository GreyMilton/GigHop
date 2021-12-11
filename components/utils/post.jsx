import { gigHopAPI } from "./get";

export const PostNewEventDetails = (data) => {
  console.log(data)
  const options = {headers: {
    'Content-Type': 'application/json',
}}
  return gigHopAPI.post("/events", {
    Object, options
  })
  .then((res)=> {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  });
};
