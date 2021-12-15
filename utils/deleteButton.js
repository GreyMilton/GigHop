import {
  deleteEventById,
  patchArtistDeleteEvent,
  patchVenueDeleteEvent,
  patchUserDeleteEvent
} from "./api-requests";

export const handleDeleteEvent = (eventId, artist, venue, user) => {
  deleteEventById(eventId);
  let data = { remove_event: { event_id: eventId } };
  patchArtistDeleteEvent(data, artist);
  patchVenueDeleteEvent(data, venue);
  patchUserDeleteEvent(data, user);
};
