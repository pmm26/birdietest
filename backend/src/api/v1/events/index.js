const eventsController = require("../../../controllers/events");
const YAML= require('yamljs')

module.exports = {
  get: eventsController.getEvents,
};

module.exports.get.apiDoc = YAML.load('src/api/v1/events/get.yml')