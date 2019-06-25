/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import plansReducer from 'containers/PlansPage/reducer';
import planTypesReducer from 'containers/PlanTypesPage/reducer';
import planEventsReducer from 'containers/PlanEventsPage/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    global: globalReducer,
    plans: plansReducer,
    planEvents: planEventsReducer,
    planTypes: planTypesReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
