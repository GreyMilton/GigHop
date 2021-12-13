const createNewVenueReferenceObject = (arrayOfEventObjects) => {
  if (!arrayOfEventObjects || arrayOfEventObjects.length === 0) return {};

  const newVenuesObj = {};

  for (let i = 0; i < arrayOfEventObjects.length; i++) {
    const event = arrayOfEventObjects[i];
    const newEventObject = {"_id": event["_id"], "time_start": event["time_start"]};

    if (!newVenuesObj[event["venue_id"]]) {
      newVenuesObj[event["venue_id"]] = [];
      newVenuesObj[event["venue_id"]].push(newEventObject);
    } else {

      const eventArray = newVenuesObj[event["venue_id"]];
      const eventTimestamp = new Date(event["time_start"]).getTime();

      for (let j = 0; j < eventArray.length; j++) {
        const oldEventId = eventArray[j]["_id"];
        const oldEventTimeStamp = new Date(eventArray[j]["time_start"]).getTime();

        if (eventTimestamp <= oldEventTimeStamp) {
          eventArray.unshift(newEventObject);
          j = eventArray.length;
        } else if (j === eventArray.length - 1) {
          eventArray.push(newEventObject);
        }
      }
    }
  }
  return newVenuesObj;
}

const findIndexOfEvent = (id, referenceArray) => {
  let index = -1;

  if (!referenceArray) return index;

  for (let i = 0; i < referenceArray.length; i++) {
    if (referenceArray[i]["_id"] === id) {
      index = i;
    };
  }
  return index;
}

module.exports = { createNewVenueReferenceObject, findIndexOfEvent };