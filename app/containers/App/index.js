/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import ClientsPage from 'containers/ClientsPage/Loadable';
import ClientPage from 'containers/ClientPage/Loadable';
import PlanTypesPage from 'containers/PlanTypesPage/Loadable';
import PlanTypePage from 'containers/PlanTypePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import HomeNav from '../../components/HomeNav';

import reducer from './reducer';
import saga from './saga';

const App = () => (
  <div>
    <HomeNav />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/clients" component={ClientsPage} />
      <Route exact path="/client/:id" component={ClientPage} />
      <Route exact path="/plan-types" component={PlanTypesPage} />
      <Route exact path="/plan-type/:id" component={PlanTypePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

const withReducer = injectReducer({ key: 'App', reducer });
const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withReducer,
  withSaga,
)(App);
