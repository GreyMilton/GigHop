import "dotenv/config";

export default {
  name: 'GigHop',
  version: '1.0.0',
  extra: {
    googleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY,
    ticketmasterAPIKey: process.env.TICKETMASTER_API_KEY
  },
};