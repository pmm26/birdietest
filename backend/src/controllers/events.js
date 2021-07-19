const Events = require("../models/Events");
const db = require("../util/mysql");
const permitParams = require("permit-params");

module.exports.getEvents = async (req, res, next) => {
  try {
    strongParams = permitParams.default(
      req.query,
      "page",
      "per_page",
      "order",
      {
        filter: [
          "event_type",
          "care_recipient_id",
          "alert_id",
          "task_instance_id",
          "visit_id",
          "caregiver_id",
          "rejected_event_id",
          "observation_event_id",
        ],
      }
    );

    const events = await Events.fetchAll(strongParams);

    res.status(200).json(events);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
