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

export const login = credential => ({
  type: LOGIN_REQUEST,
  credential,
});

export const loginWithProvider = provider => ({
  type: LOGIN_PROVIDER_REQUEST,
  provider,
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

export const sync = () => ({
  type: SYNC,
});

export const syncUser = user => ({
  type: SYNC_USER,
  user,
});
