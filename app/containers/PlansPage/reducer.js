import produce from 'immer';
import {
  ADD_PLAN_REQUEST,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAILURE,
  GET_PLAN_REQUEST,
  GET_PLAN_SUCCESS,
  GET_PLAN_FAILURE,
  GET_PLANS_REQUEST,
  GET_PLANS_BY_CLIENT_ID_REQUEST,
  GET_ACTIVE_PLANS_BY_CLIENT_ID_REQUEST,
  GET_PLANS_SUCCESS,
  GET_PLANS_FAILURE,
  UPDATE_PLAN_REQUEST,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAILURE,
  DELETE_PLAN_REQUEST,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAILURE,
} from './constants';

// The initial state of the App
export const initialState = {
  plan: null,
  addPlanError: null,
  addPlanSuccess: false,
  selectedPlan: null,
  loadingSelectedPlan: false,
  selectedPlanError: null,
  plans: {
    user: {},
    data: [],
  },
  loadingPlans: false,
  plansError: null,
  updatePlanSuccess: false,
  deletePlanSuccess: false,
  deletePlanError: null,
};

/* eslint-disable default-case, no-param-reassign */
const plansReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_PLAN_REQUEST:
        draft.loadingSelectedPlan = true;
        draft.addPlanError = null;
        draft.addPlanSuccess = false;
        break;

      case ADD_PLAN_SUCCESS:
        draft.loadingSelectedPlan = false;
        draft.addPlanSuccess = true;
        break;

      case ADD_PLAN_FAILURE:
        draft.loadingSelectedPlan = false;
        draft.addPlanError = action.error;
        break;

      case GET_PLAN_REQUEST:
        draft.loadingSelectedPlan = true;
        draft.selectedPlanError = null;
        draft.selectedPlan = null;
        break;

      case GET_PLAN_SUCCESS:
        draft.loadingSelectedPlan = false;
        draft.selectedPlan = action.selectedPlan;
        break;

      case GET_PLAN_FAILURE:
        draft.loadingSelectedPlan = false;
        draft.selectedPlanError = action.error;
        break;

      case GET_PLANS_BY_CLIENT_ID_REQUEST:
      case GET_ACTIVE_PLANS_BY_CLIENT_ID_REQUEST:
      case GET_PLANS_REQUEST:
        draft.loadingPlans = true;
        draft.plansError = null;
        draft.plans = {
          user: {},
          data: [],
        };
        break;

      case GET_PLANS_SUCCESS:
        draft.loadingPlans = false;
        draft.plans = action.plans;
        break;

      case GET_PLANS_FAILURE:
        draft.loadingPlans = false;
        draft.plansError = action.error;
        break;

      case UPDATE_PLAN_REQUEST:
        draft.updatePlanSuccess = false;
        draft.loadingSelectedPlan = true;
        break;

      case UPDATE_PLAN_SUCCESS:
        draft.updatePlanSuccess = true;
        draft.loadingSelectedPlan = false;
        draft.selectedPlan = action.plan;
        break;

      case UPDATE_PLAN_FAILURE:
        draft.loadingSelectedPlan = false;
        draft.selectedPlanError = action.error;
        break;

      case DELETE_PLAN_REQUEST:
        draft.deletePlanSuccess = false;
        draft.deletePlanError = null;
        break;

      case DELETE_PLAN_SUCCESS:
        draft.deletePlanSuccess = true;
        break;

      case DELETE_PLAN_FAILURE:
        draft.deletePlanError = action.error;
        break;
    }
  });

export default plansReducer;
