require("dotenv").config();
const fs = require("fs");
const Events = require("../models/Events");

const generateListOfDbAttributes = async () => {
  const rawEvents = await Events.fetchAll();

  const eventsPayload = rawEvents[0].map((e) => e.payload);

  let allPossibleKeys = [];
  let allPossibleKeysWithExample = [];
  let eventTypes = {};
  let eventTypesRelevantAttributes = {};

  let tempObj;
  eventsPayload.forEach((obj) => {
    
    // List of all possible Keys
    Object.keys(obj).forEach((key) => {
      // console.log(key)
      if (!allPossibleKeys.includes(key)) {
        allPossibleKeys.push(key);
        allPossibleKeysWithExample.push({[key]: obj[key]})
      }
    });

    // List of examples for each event type.
    if (!eventTypes.hasOwnProperty(obj.event_type)) {
      eventTypes[obj.event_type] = obj;
    }

    // List of relevant Attribues for each event type (doesn't include ids)
    // To be used in the FrontEnd
    if (!eventTypesRelevantAttributes.hasOwnProperty(obj.event_type)) {
      tempObj = { ...obj };
      Object.keys(tempObj).forEach((key1) => {
        if (key1.endsWith("_id") || key1.endsWith("navigation") || key1.endsWith("screenProps")) {
          delete tempObj[key1];
        }
      });
      eventTypesRelevantAttributes[obj.event_type] = tempObj;
    } 
  });

  // Keys that are present in all entries
  let alwaysPresentKeys = [...allPossibleKeys];
  eventsPayload.forEach((obj) => {
    var absent = allPossibleKeys.filter(e=>!Object.keys(obj).includes(e));
    absent.forEach(ab => {
      alwaysPresentKeys = alwaysPresentKeys.filter(value => value != ab);
    })
  })

  // Keys that change depending on eventType
  let eventBasedKeys = [...allPossibleKeys];
  eventsPayload.forEach((obj) => {
    alwaysPresentKeys.forEach(ab => {
      eventBasedKeys = eventBasedKeys.filter(value => value != ab);
    })
  })

  await fs.writeFileSync(
    "src/scripts/data/allPossibleKeys.json",
    JSON.stringify({ keys: allPossibleKeys })
  );

  await fs.writeFileSync(
    "src/scripts/data/allPossibleKeysWithExample.json",
    JSON.stringify({ keys: allPossibleKeysWithExample })
  );

  await fs.writeFileSync(
    "src/scripts/data/eventBasedKeys.json",
    JSON.stringify({ keys: eventBasedKeys })
  );

  await fs.writeFileSync(
    "src/scripts/data/alwaysPresentKeys.json",
    JSON.stringify({ keys: alwaysPresentKeys })
  );

  await fs.writeFileSync(
    "src/scripts/data/event-types.json",
    JSON.stringify({
      count: Object.keys(eventTypes).length,
      eventTypes: eventTypes,
    })
  );

  await fs.writeFileSync(
    "src/scripts/data/event-types-relevant-attributes.json",
    JSON.stringify({
      count: Object.keys(eventTypes).length,
      eventTypes: eventTypesRelevantAttributes,
    })
  );

  console.log("saved allPossibleKeys!");

  // console.log(allPossibleKeys)
};

generateListOfDbAttributes();
