import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_PROVIDER_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  PASS_RESET_REQUEST,
  PASS_RESET_SUCCESS,
  PASS_RESET_FAILURE,
  SYNC_USER,
  SYNC,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  loadingPassReset: false,
  loggedIn: false,
  user: null,
  syncing: true,
  signUpError: null,
  signInError: null,
  passResetError: null,
  signUpSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        draft.loading = true;
        draft.signUpError = null;
        draft.signUpSuccess = false;
        break;

      case LOGIN_REQUEST:
        draft.loading = true;
        draft.signInError = null;
        break;

      case LOGIN_PROVIDER_REQUEST:
      case LOGOUT_REQUEST:
        draft.loading = true;
        break;

      case SIGNUP_SUCCESS:
        draft.loading = false;
        draft.signUpSuccess = true;
        break;

      case LOGIN_SUCCESS:
      case LOGOUT_SUCCESS:
        draft.loading = false;
        draft.loggedIn = true;
        break;

      case SIGNUP_FAILURE:
        draft.loading = false;
        draft.signUpError = action.error;
        break;

      case LOGIN_FAILURE:
        draft.loading = false;
        draft.signInError = action.error;
        break;

      case LOGOUT_FAILURE:
        draft.loading = false;
        break;

      case PASS_RESET_REQUEST:
        draft.loadingPassReset = true;
        draft.passResetError = null;
        break;

      case PASS_RESET_SUCCESS:
        draft.loadingPassReset = false;
        break;

      case PASS_RESET_FAILURE:
        draft.loadingPassReset = false;
        draft.passResetError = action.error;
        break;

      case SYNC:
        draft.syncing = true;
        break;

      case SYNC_USER:
        draft.loggedIn = action.user != null;
        draft.syncing = false;
        draft.user = action.user;
        break;
    }
  });

export default appReducer;
