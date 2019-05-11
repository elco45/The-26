import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.planTypes || initialState;

const makeSelectAddPlanTypeSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.addPlanTypeSuccess,
  );

const makeSelectAddPlanTypeError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.addPlanTypeError,
  );

const makeSelectLoadingSelectedPlanType = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingSelectedPlanType,
  );

const makeSelectSelectedPlanType = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedPlanType,
  );

const makeSelectSelectedPlanTypeError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedPlanTypeError,
  );

const makeSelectPlanTypes = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.planTypes,
  );

const makeSelectLoadingPlanTypes = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingPlanTypes,
  );

const makeSelectplanTypesError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.planTypesError,
  );

export {
  makeSelectAddPlanTypeSuccess,
  makeSelectAddPlanTypeError,
  makeSelectLoadingSelectedPlanType,
  makeSelectSelectedPlanType,
  makeSelectSelectedPlanTypeError,
  makeSelectPlanTypes,
  makeSelectLoadingPlanTypes,
  makeSelectplanTypesError,
};
