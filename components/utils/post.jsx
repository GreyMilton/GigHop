import { gigHopAPI } from "./get";

export const PostNewEventDetails = () => {
  return gigHopAPI.post("/events");
};
