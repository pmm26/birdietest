const Events = require("../models/Events");
const db = require("../util/mysql");

module.exports.getEvents = async (req, res, next) => {
  console.log(req.query);
  const events = await Events.fetchAll(req.query)

  console.log(events);
  // console.log(events.length);


  res.status(200).json({
    data: events,
  });
};
