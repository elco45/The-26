import produce from 'immer';
import {
  LOGIN_REQUEST,
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
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
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
  selectedUser: null,
  loadingSelectedUser: false,
  selectedUserError: null,
  users: [],
  loadingUsers: false,
  usersError: null,
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

      case LOGOUT_REQUEST:
        draft.loading = true;
        break;

      case SIGNUP_SUCCESS:
        draft.loading = false;
        draft.signUpSuccess = true;
        break;

      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.loggedIn = true;
        break;

      case LOGOUT_SUCCESS:
        draft.user = null;
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
        draft.syncing = action.isSyncing;
        break;

      case SYNC_USER:
        draft.loggedIn = action.user != null;
        draft.user = action.user;
        break;

      case GET_USER_REQUEST:
        draft.loadingSelectedUser = true;
        draft.selectedUserError = null;
        draft.selectedUser = null;
        break;

      case GET_USER_SUCCESS:
        draft.loadingSelectedUser = false;
        draft.selectedUser = action.selectedUser;
        break;

      case GET_USER_FAILURE:
        draft.loadingSelectedUser = false;
        draft.selectedUserError = action.error;
        break;

      case GET_USERS_REQUEST:
        draft.loadingUsers = true;
        draft.usersError = null;
        draft.users = [];
        break;

      case GET_USERS_SUCCESS:
        draft.loadingUsers = false;
        draft.users = action.users;
        break;

      case GET_USERS_FAILURE:
        draft.loadingUsers = false;
        draft.usersError = action.error;
        break;

      case UPDATE_PROFILE_REQUEST:
      case UPDATE_USER_REQUEST:
        draft.loadingSelectedUser = true;
        break;

      case UPDATE_PROFILE_SUCCESS:
      case UPDATE_USER_SUCCESS:
        draft.loadingSelectedUser = false;
        break;

      case UPDATE_PROFILE_FAILURE:
      case UPDATE_USER_FAILURE:
        draft.loadingSelectedUser = false;
        draft.selectedUserError = action.error;
        break;
    }
  });

export default appReducer;
