const eventsController = require('../../../controllers/events')

let get = eventsController.fetchEvents

get.apiDoc = {
  description: "Fetch a new user.",
  tags: ["events"],
  parameters: [
    // {  
    //   in: "body",
    //   name: "todo",
    //   schema: {
    //     $ref: "#/definitions/User",
    //   },
    // },
  ],
  summary: "Fetch events.",
  operationId: "getEvents",
  responses: {
    200: {
      description: "List of Events.",
      schema: {
        type: "array",
        items: {
          $ref: "#/definitions/Event",
        },
      },
    },
  },
};

module.exports = {
  get: get,
};

