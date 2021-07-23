
const YAML = require('yamljs')
const Events = require("../models/Events");
const permitParams = require("permit-params");
import { Request, Response, NextFunction } from 'express';

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const strongParams: any = permitParams.default(
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
        dates: [
          "start_date",
          "end_date"
        ]
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


module.exports = {
  get: getEvents,
};

module.exports.get.apiDoc = YAML.load('src/api-docs/v1/events/get.yml')