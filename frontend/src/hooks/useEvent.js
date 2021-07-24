import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFirstPage,
  fetchPage,
  setDate,
  setOrder,
  setEventType,
} from "../store/actions/events";
import {capitalize, humanizeEventType} from '../utils/stringHelper'


const useEvent = (eventsState, dispatch) => {

  const eventTypeOptions = [
    "all_event_types",
    "fluid_intake_observation",
    "task_completed",
    "physical_health_observation",
    "visit_completed",
    "check_out",
    "mood_observation",
    "regular_medication_taken",
    "alert_raised",
    "no_medication_observation_received",
    "incontinence_pad_observation",
    "check_in",
    "general_observation",
    "regular_medication_not_taken",
    "food_intake_observation",
    "task_completion_reverted",
    "mental_health_observation",
    "medication_schedule_updated",
    "visit_cancelled",
    "regular_medication_maybe_taken",
    "medication_schedule_created",
    "alert_qualified",
    "task_schedule_created",
    "concern_raised",
    "regular_medication_partially_taken",
    "catheter_observation",
    "toilet_visit_recorded"
  ].map(event => {
    return {value: event, label: humanizeEventType(capitalize(event))}
  })


  const orderOptions = [
    { value: "desc", label: "Descending" },
    { value: "asc", label: "Ascending" },
  ];

  const changeEventType = (eventTpe) => {
    dispatch(setEventType(eventTpe));
  };

  const changeOrder = (order) => {
    dispatch(setOrder(order));
  };

  const changeDates = (data) => {
    dispatch(setDate(data));
  };

    return [
      eventTypeOptions,
      orderOptions,
      changeEventType,
      changeOrder,
      changeDates
    ]

}

export default useEvent