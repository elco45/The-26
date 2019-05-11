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

export const getPlanTypeRequest = planTypeInfo => ({
  type: GET_PLAN_TYPE_REQUEST,
  planTypeInfo,
});

export const getPlanTypeSuccess = selectedPlanType => ({
  type: GET_PLAN_TYPE_SUCCESS,
  selectedPlanType,
});

export const getPlanTypeFailure = error => ({
  type: GET_PLAN_TYPE_FAILURE,
  error,
});

export const getPlanTypesRequest = () => ({
  type: GET_PLAN_TYPES_REQUEST,
});

export const getPlanTypesSuccess = planTypes => ({
  type: GET_PLAN_TYPES_SUCCESS,
  planTypes,
});

export const getPlanTypesFailure = error => ({
  type: GET_PLAN_TYPES_FAILURE,
  error,
});

export const updatePlanTypeRequest = planTypeInfo => ({
  type: UPDATE_PLAN_TYPE_REQUEST,
  planTypeInfo,
});

export const updatePlanTypeSuccess = planType => ({
  type: UPDATE_PLAN_TYPE_SUCCESS,
  planType,
});

export const updatePlanTypeFailure = error => ({
  type: UPDATE_PLAN_TYPE_FAILURE,
  error,
});

export const addPlanTypeRequest = planTypeInfo => ({
  type: ADD_PLAN_TYPE_REQUEST,
  planTypeInfo,
});

export const addPlanTypeSuccess = () => ({
  type: ADD_PLAN_TYPE_SUCCESS,
});

export const addPlanTypeFailure = error => ({
  type: ADD_PLAN_TYPE_FAILURE,
  error,
});
