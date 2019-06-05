import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.planEvents || initialState;

const makeSelectPlanEventClientId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.planEventClientId,
  );

const makeSelectAddPlanEventSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.addPlanEventSuccess,
  );

const makeSelectAddPlanEventError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.addPlanEventError,
  );

const makeSelectLoadingSelectedPlanEvent = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingSelectedPlanEvent,
  );

const makeSelectSelectedPlanEvent = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedPlanEvent,
  );

const makeSelectSelectedPlanEventError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedPlanEventError,
  );

const makeSelectPlanEvents = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.planEvents,
  );

const makeSelectLoadingPlanEvents = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingPlanEvents,
  );

const makeSelectPlanEventsError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.planEventsError,
  );

const makeSelectUpdatePlanEventSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.updatePlanEventSuccess,
  );

const makeSelectDeletePlanEventSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.deletePlanEventSuccess,
  );

const makeSelectDeletePlanEventError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.deletePlanEventFailure,
  );

export {
  makeSelectPlanEventClientId,
  makeSelectAddPlanEventSuccess,
  makeSelectAddPlanEventError,
  makeSelectLoadingSelectedPlanEvent,
  makeSelectSelectedPlanEvent,
  makeSelectSelectedPlanEventError,
  makeSelectPlanEvents,
  makeSelectLoadingPlanEvents,
  makeSelectPlanEventsError,
  makeSelectUpdatePlanEventSuccess,
  makeSelectDeletePlanEventSuccess,
  makeSelectDeletePlanEventError,
};
