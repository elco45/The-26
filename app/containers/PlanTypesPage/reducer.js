import produce from 'immer';
import {
  ADD_PLAN_TYPE_REQUEST,
  ADD_PLAN_TYPE_SUCCESS,
  ADD_PLAN_TYPE_FAILURE,
  GET_PLAN_TYPE_REQUEST,
  GET_PLAN_TYPE_SUCCESS,
  GET_PLAN_TYPE_FAILURE,
  GET_PLAN_TYPES_REQUEST,
  GET_PLAN_TYPES_SUCCESS,
  GET_PLAN_TYPES_FAILURE,
  UPDATE_PLAN_TYPE_REQUEST,
  UPDATE_PLAN_TYPE_SUCCESS,
  UPDATE_PLAN_TYPE_FAILURE,
} from './constants';

// The initial state of the App
export const initialState = {
  planType: null,
  addPlanTypeError: null,
  addPlanTypeSuccess: false,
  selectedPlanType: null,
  loadingSelectedPlanType: false,
  selectedPlanTypeError: null,
  planTypes: [],
  loadingPlanTypes: false,
  planTypesError: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_PLAN_TYPE_REQUEST:
        draft.loadingSelectedPlanType = true;
        draft.addPlanTypeError = null;
        draft.addPlanTypeSuccess = false;
        break;

      case ADD_PLAN_TYPE_SUCCESS:
        draft.loadingSelectedPlanType = false;
        draft.addPlanTypeSuccess = true;
        break;

      case ADD_PLAN_TYPE_FAILURE:
        draft.loadingSelectedPlanType = false;
        draft.addPlanTypeError = action.error;
        break;

      case GET_PLAN_TYPE_REQUEST:
        draft.loadingSelectedPlanType = true;
        draft.selectedPlanTypeError = null;
        draft.selectedPlanType = null;
        break;

      case GET_PLAN_TYPE_SUCCESS:
        draft.loadingSelectedPlanType = false;
        draft.selectedPlanType = action.selectedPlanType;
        break;

      case GET_PLAN_TYPE_FAILURE:
        draft.loadingSelectedPlanType = false;
        draft.selectedPlanTypeError = action.error;
        break;

      case GET_PLAN_TYPES_REQUEST:
        draft.loadingPlanTypes = true;
        draft.planTypesError = null;
        draft.planTypes = [];
        break;

      case GET_PLAN_TYPES_SUCCESS:
        draft.loadingPlanTypes = false;
        draft.planTypes = action.planTypes;
        break;

      case GET_PLAN_TYPES_FAILURE:
        draft.loadingPlanTypes = false;
        draft.planTypesError = action.error;
        break;

      case UPDATE_PLAN_TYPE_REQUEST:
        draft.loadingSelectedPlanType = true;
        break;

      case UPDATE_PLAN_TYPE_SUCCESS:
        draft.loadingSelectedPlanType = false;
        draft.selectedPlanType = action.planType;
        break;

      case UPDATE_PLAN_TYPE_FAILURE:
        draft.loadingSelectedPlanType = false;
        draft.selectedPlanTypeError = action.error;
        break;
    }
  });

export default appReducer;
