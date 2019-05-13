import {
  ADD_PLAN_EVENT_REQUEST,
  ADD_PLAN_EVENT_SUCCESS,
  ADD_PLAN_EVENT_FAILURE,
  GET_PLAN_EVENT_REQUEST,
  GET_PLAN_EVENT_SUCCESS,
  GET_PLAN_EVENT_FAILURE,
  GET_PLAN_EVENTS_REQUEST,
  GET_PLAN_EVENTS_BY_CLIENT_ID_REQUEST,
  GET_PLAN_EVENTS_SUCCESS,
  GET_PLAN_EVENTS_FAILURE,
  UPDATE_PLAN_EVENT_REQUEST,
  UPDATE_PLAN_EVENT_SUCCESS,
  UPDATE_PLAN_EVENT_FAILURE,
} from './constants';

export const getPlanEventRequest = planEventInfo => ({
  type: GET_PLAN_EVENT_REQUEST,
  planEventInfo,
});

export const getPlanEventSuccess = selectedPlanEvent => ({
  type: GET_PLAN_EVENT_SUCCESS,
  selectedPlanEvent,
});

export const getPlanEventFailure = error => ({
  type: GET_PLAN_EVENT_FAILURE,
  error,
});

export const getPlanEventsRequest = () => ({
  type: GET_PLAN_EVENTS_REQUEST,
});

export const getPlanEventsByClientIdRequest = planEventInfo => ({
  type: GET_PLAN_EVENTS_BY_CLIENT_ID_REQUEST,
  planEventInfo,
});

export const getPlanEventsSuccess = planEvents => ({
  type: GET_PLAN_EVENTS_SUCCESS,
  planEvents,
});

export const getPlanEventsFailure = error => ({
  type: GET_PLAN_EVENTS_FAILURE,
  error,
});

export const updatePlanEventRequest = planEventInfo => ({
  type: UPDATE_PLAN_EVENT_REQUEST,
  planEventInfo,
});

export const updatePlanEventSuccess = () => ({
  type: UPDATE_PLAN_EVENT_SUCCESS,
});

export const updatePlanEventFailure = error => ({
  type: UPDATE_PLAN_EVENT_FAILURE,
  error,
});

export const addPlanEventRequest = planEventInfo => ({
  type: ADD_PLAN_EVENT_REQUEST,
  planEventInfo,
});

export const addPlanEventSuccess = planEventInfo => ({
  type: ADD_PLAN_EVENT_SUCCESS,
  planEventInfo,
});

export const addPlanEventFailure = error => ({
  type: ADD_PLAN_EVENT_FAILURE,
  error,
});
