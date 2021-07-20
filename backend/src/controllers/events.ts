const Events = require("../models/Events");
const permitParams = require("permit-params");
import {Request, Response, NextFunction} from 'express';

module.exports.getEvents = async (req : Request, res: Response, next: NextFunction) => {
  try {
    const strongParams : Object = permitParams.default(
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
  } catch (err: any) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
