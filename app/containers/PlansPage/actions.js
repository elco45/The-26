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

export const getPlanRequest = planInfo => ({
  type: GET_PLAN_REQUEST,
  planInfo,
});

export const getPlanSuccess = selectedPlan => ({
  type: GET_PLAN_SUCCESS,
  selectedPlan,
});

export const getPlanFailure = error => ({
  type: GET_PLAN_FAILURE,
  error,
});

export const getPlansRequest = () => ({
  type: GET_PLANS_REQUEST,
});

export const getPlansByClientIdRequest = planInfo => ({
  type: GET_PLANS_BY_CLIENT_ID_REQUEST,
  planInfo,
});

export const getActivePlansByClientIdRequest = planInfo => ({
  type: GET_ACTIVE_PLANS_BY_CLIENT_ID_REQUEST,
  planInfo,
});

export const getPlansSuccess = plans => ({
  type: GET_PLANS_SUCCESS,
  plans,
});

export const getPlansFailure = error => ({
  type: GET_PLANS_FAILURE,
  error,
});

export const updatePlanRequest = planInfo => ({
  type: UPDATE_PLAN_REQUEST,
  planInfo,
});

export const updatePlanSuccess = () => ({
  type: UPDATE_PLAN_SUCCESS,
});

export const updatePlanFailure = error => ({
  type: UPDATE_PLAN_FAILURE,
  error,
});

export const addPlanRequest = planInfo => ({
  type: ADD_PLAN_REQUEST,
  planInfo,
});

export const addPlanSuccess = () => ({
  type: ADD_PLAN_SUCCESS,
});

export const addPlanFailure = error => ({
  type: ADD_PLAN_FAILURE,
  error,
});

export const deletePlanRequest = planInfo => ({
  type: DELETE_PLAN_REQUEST,
  planInfo,
});

export const deletePlanSuccess = () => ({
  type: DELETE_PLAN_SUCCESS,
});

export const deletePlanFailure = error => ({
  type: DELETE_PLAN_FAILURE,
  error,
});
