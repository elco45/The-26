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
import QrScannerPage from 'containers/QrScannerPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import HomeNav from '../../components/HomeNav';
import Authorization from '../../components/AuthWrapper';

import reducer from './reducer';
import saga from './saga';

// const Client = Authorization(['client']);
const Admin = Authorization(['admin']);
const LoggedIn = Authorization(['admin', 'client']);

const App = () => (
  <div>
    <HomeNav />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/clients" component={Admin(ClientsPage)} />
      <Route exact path="/client/:id" component={Admin(ClientPage)} />
      <Route exact path="/plan-types" component={Admin(PlanTypesPage)} />
      <Route exact path="/plan-type/:id" component={Admin(PlanTypePage)} />
      <Route exact path="/profile" component={LoggedIn(ProfilePage)} />
      <Route exact path="/scan-qr" component={Admin(QrScannerPage)} />
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
