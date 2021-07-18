const eventsController = require("../../../controllers/events");

let get = eventsController.getEvents;
const YAML= require('yamljs')

get.apiDoc = YAML.load('src/api/v1/events/get.yml')


module.exports = {
  get: get,
};
