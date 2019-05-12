import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.plans || initialState;

const makeSelectAddPlanSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.addPlanSuccess,
  );

const makeSelectAddPlanError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.addPlanError,
  );

const makeSelectLoadingSelectedPlan = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingSelectedPlan,
  );

const makeSelectSelectedPlan = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedPlan,
  );

const makeSelectSelectedPlanError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.selectedPlanError,
  );

const makeSelectPlans = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.plans,
  );

const makeSelectLoadingPlans = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loadingPlans,
  );

const makeSelectPlansError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.plansError,
  );

const makeSelectUpdatePlanSuccess = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.updatePlanSuccess,
  );

export {
  makeSelectAddPlanSuccess,
  makeSelectAddPlanError,
  makeSelectLoadingSelectedPlan,
  makeSelectSelectedPlan,
  makeSelectSelectedPlanError,
  makeSelectPlans,
  makeSelectLoadingPlans,
  makeSelectPlansError,
  makeSelectUpdatePlanSuccess,
};
