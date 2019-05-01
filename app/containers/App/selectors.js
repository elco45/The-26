import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectSignUpSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.signUpSuccess,
  );

const makeSelectSignUpError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.signUpError,
  );

const makeSelectSignInError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.signInError,
  );

const makeSelectPassResetError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.passResetError,
  );

const makeSelectLoggedIn = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loggedIn,
  );

const makeSelectSync = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.syncing,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectLoadingPassReset = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingPassReset,
  );

const makeSelectLoadingSelectedUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingSelectedUser,
  );

const makeSelectSelectedUserError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedUserError,
  );

const makeSelectUsers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.users,
  );

const makeSelectLoadingUsers = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingUsers,
  );

const makeSelectusersError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.usersError,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  makeSelectCurrentUser,
  makeSelectLocation,
  makeSelectLoggedIn,
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
  makeSelectSignInError,
  makeSelectPassResetError,
  makeSelectSync,
  makeSelectLoading,
  makeSelectLoadingPassReset,
  makeSelectLoadingSelectedUser,
  makeSelectSelectedUserError,
  makeSelectUsers,
  makeSelectLoadingUsers,
  makeSelectusersError,
};
