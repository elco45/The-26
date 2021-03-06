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
  UPDATE_EMAIL_REQUEST,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  APPLY_ACTION_CODE_REQUEST,
  CONFIRM_PASSWORD_RESET_REQUEST,
  APPLY_ACTION_CODE_SUCCESS,
  APPLY_ACTION_CODE_FAILURE,
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
  resetSuccess: false,
  selectedUser: null,
  loadingSelectedUser: false,
  selectedUserError: null,
  users: [],
  loadingUsers: false,
  usersError: null,
  applyActionSuccess: null,
  applyActionError: null,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNUP_REQUEST:
        draft.loadingSelectedUser = true;
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
        draft.loadingSelectedUser = false;
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
        draft.loadingSelectedUser = false;
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
        draft.user = null;
        draft.syncing = action.isSyncing;
        break;

      case SYNC_USER:
        draft.loggedIn = action.user != null;
        draft.syncing = false;
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

      case UPDATE_EMAIL_REQUEST:
      case UPDATE_PASSWORD_REQUEST:
        draft.resetSuccess = false;
        draft.loadingSelectedUser = true;
        draft.selectedUserError = null;
        break;

      case UPDATE_PROFILE_REQUEST:
        draft.loadingSelectedUser = true;
        draft.selectedUserError = null;
        break;

      case UPDATE_EMAIL_SUCCESS:
      case UPDATE_PASSWORD_SUCCESS:
        draft.user = null;
        draft.loadingSelectedUser = false;
        draft.resetSuccess = true;
        break;

      case UPDATE_PROFILE_SUCCESS:
        draft.loadingSelectedUser = false;
        break;

      case UPDATE_EMAIL_FAILURE:
      case UPDATE_PASSWORD_FAILURE:
      case UPDATE_PROFILE_FAILURE:
        draft.resetSuccess = false;
        draft.loadingSelectedUser = false;
        draft.selectedUserError = action.error;
        if (action.error.code === 'auth/user-token-expired') {
          draft.user = null;
          draft.resetSuccess = true;
        }
        break;

      case UPDATE_USER_REQUEST:
        draft.loadingSelectedUser = true;
        break;

      case UPDATE_USER_SUCCESS:
        draft.loadingSelectedUser = false;
        draft.selectedUser = action.user;
        break;

      case UPDATE_USER_FAILURE:
        draft.loadingSelectedUser = false;
        draft.selectedUserError = action.error;
        break;

      case APPLY_ACTION_CODE_REQUEST:
        draft.applyActionSuccess = null;
        draft.applyActionError = null;
        break;

      case CONFIRM_PASSWORD_RESET_REQUEST:
        draft.applyActionSuccess = null;
        draft.applyActionError = null;
        break;

      case APPLY_ACTION_CODE_SUCCESS:
        draft.applyActionSuccess = action.success;
        break;

      case APPLY_ACTION_CODE_FAILURE:
        draft.applyActionError = action.error;
        break;
    }
  });

export default appReducer;
