import produce from 'immer';
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
  DELETE_PLAN_EVENT_REQUEST,
  DELETE_PLAN_EVENT_SUCCESS,
  DELETE_PLAN_EVENT_FAILURE,
} from './constants';

// The initial state of the App
export const initialState = {
  planEvent: null,
  addPlanEventError: null,
  addPlanEventSuccess: false,
  selectedPlanEvent: null,
  loadingSelectedPlanEvent: false,
  selectedPlanEventError: null,
  planEvents: [],
  loadingPlanEvents: false,
  planEventsError: null,
  updatePlanEventSuccess: false,
  planEventClientId: null,
  deleteEventError: null,
  deleteEventSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const planEventsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_PLAN_EVENT_REQUEST:
        draft.loadingSelectedPlanEvent = true;
        draft.addPlanEventError = null;
        draft.addPlanEventSuccess = false;
        break;

      case ADD_PLAN_EVENT_SUCCESS:
        draft.planEventClientId = action.planEventInfo.clientId;
        draft.loadingSelectedPlanEvent = false;
        draft.addPlanEventSuccess = true;
        break;

      case ADD_PLAN_EVENT_FAILURE:
        draft.loadingSelectedPlanEvent = false;
        draft.addPlanEventError = action.error;
        draft.addPlanEventSuccess = false;
        break;

      case GET_PLAN_EVENT_REQUEST:
        draft.loadingSelectedPlanEvent = true;
        draft.selectedPlanEventError = null;
        draft.selectedPlanEvent = null;
        break;

      case GET_PLAN_EVENT_SUCCESS:
        draft.loadingSelectedPlanEvent = false;
        draft.selectedPlanEvent = action.selectedPlanEvent;
        break;

      case GET_PLAN_EVENT_FAILURE:
        draft.loadingSelectedPlanEvent = false;
        draft.selectedPlanEventError = action.error;
        break;

      case GET_PLAN_EVENTS_BY_CLIENT_ID_REQUEST:
      case GET_PLAN_EVENTS_REQUEST:
        draft.loadingPlanEvents = true;
        draft.planEventsError = null;
        draft.planEvents = [];
        break;

      case GET_PLAN_EVENTS_SUCCESS:
        draft.loadingPlanEvents = false;
        draft.planEvents = action.planEvents;
        break;

      case GET_PLAN_EVENTS_FAILURE:
        draft.loadingPlanEvents = false;
        draft.planEventsError = action.error;
        break;

      case UPDATE_PLAN_EVENT_REQUEST:
        draft.updatePlanEventSuccess = false;
        draft.loadingSelectedPlanEvent = true;
        break;

      case UPDATE_PLAN_EVENT_SUCCESS:
        draft.updatePlanEventSuccess = true;
        draft.loadingSelectedPlanEvent = false;
        draft.selectedPlanEvent = action.planEvent;
        break;

      case UPDATE_PLAN_EVENT_FAILURE:
        draft.loadingSelectedPlanEvent = false;
        draft.selectedPlanEventError = action.error;
        break;

      case DELETE_PLAN_EVENT_REQUEST:
        draft.deletePlanEventSuccess = false;
        draft.deletePlanEventFailure = null;
        break;

      case DELETE_PLAN_EVENT_SUCCESS:
        draft.deletePlanEventSuccess = true;
        break;

      case DELETE_PLAN_EVENT_FAILURE:
        draft.deletePlanEventFailure = action.error;
        break;
    }
  });

export default planEventsReducer;
