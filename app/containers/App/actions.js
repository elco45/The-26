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
} from './constants';

export const getUser = userInfo => ({
  type: GET_USER_REQUEST,
  userInfo,
});

export const getUserSuccess = selectedUser => ({
  type: GET_USER_SUCCESS,
  selectedUser,
});

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  error,
});

export const getUsersRequest = collection => ({
  type: GET_USERS_REQUEST,
  collection,
});

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  users,
});

export const getUsersFailure = error => ({
  type: GET_USERS_FAILURE,
  error,
});

export const updateUser = userInfo => ({
  type: UPDATE_USER_REQUEST,
  userInfo,
});

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  error,
});

export const updateProfileRequest = userInfo => ({
  type: UPDATE_PROFILE_REQUEST,
  userInfo,
});

export const updateProfileSuccess = () => ({
  type: UPDATE_PROFILE_SUCCESS,
});

export const updateProfileFailure = error => ({
  type: UPDATE_PROFILE_FAILURE,
  error,
});

export const updateEmailRequest = userInfo => ({
  type: UPDATE_EMAIL_REQUEST,
  userInfo,
});

export const updateEmailSuccess = () => ({
  type: UPDATE_EMAIL_SUCCESS,
});

export const updateEmailFailure = error => ({
  type: UPDATE_EMAIL_FAILURE,
  error,
});

export const updatePasswordRequest = userInfo => ({
  type: UPDATE_PASSWORD_REQUEST,
  userInfo,
});

export const updatePasswordSuccess = () => ({
  type: UPDATE_PASSWORD_SUCCESS,
});

export const updatePasswordFailure = error => ({
  type: UPDATE_PASSWORD_FAILURE,
  error,
});

export const login = credential => ({
  type: LOGIN_REQUEST,
  credential,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = error => ({
  type: LOGOUT_FAILURE,
  error,
});

export const signUp = credential => ({
  type: SIGNUP_REQUEST,
  credential,
});

export const signUpSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  error,
});

export const passReset = credential => ({
  type: PASS_RESET_REQUEST,
  credential,
});

export const passResetSuccess = () => ({
  type: PASS_RESET_SUCCESS,
});

export const passResetFailure = error => ({
  type: PASS_RESET_FAILURE,
  error,
});

export const sync = isSyncing => ({
  type: SYNC,
  isSyncing,
});

export const syncUser = user => ({
  type: SYNC_USER,
  user,
});
