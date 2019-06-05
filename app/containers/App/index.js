/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import ClientsPage from 'containers/ClientsPage/Loadable';
import ClientPage from 'containers/ClientPage/Loadable';
import PlanEventsPage from 'containers/PlanEventsPage/Loadable';
import PlanTypesPage from 'containers/PlanTypesPage/Loadable';
import PlanTypePage from 'containers/PlanTypePage/Loadable';
import ProfilePage from 'containers/ProfilePage/Loadable';
import QrScannerPage from 'containers/QrScannerPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import LoadingSpinner from '../../components/LoadingSpinner';
import HomeNav from '../../components/HomeNav';
import AuthWrapper from '../../components/AuthWrapper';

import reducer from './reducer';
import saga from './saga';
import { makeSelectSync } from './selectors';

// const Client = AuthWrapper(['client']);
const Admin = AuthWrapper(['admin']);
const LoggedIn = AuthWrapper(['admin', 'client']);

class App extends React.PureComponent {
  render() {
    return !this.props.syncing ? (
      <div>
        <HomeNav />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/calendar/:clientId"
            component={LoggedIn(PlanEventsPage)}
          />
          <Route exact path="/clients" component={Admin(ClientsPage)} />
          <Route exact path="/client/:id" component={Admin(ClientPage)} />
          <Route exact path="/plan-types" component={Admin(PlanTypesPage)} />
          <Route exact path="/plan-type/:id" component={Admin(PlanTypePage)} />
          <Route exact path="/profile" component={LoggedIn(ProfilePage)} />
          <Route exact path="/scan-qr" component={Admin(QrScannerPage)} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    ) : (
      <LoadingSpinner />
    );
  }
}

App.propTypes = {
  syncing: PropTypes.bool,
};

const withReducer = injectReducer({ key: 'App', reducer });
const withSaga = injectSaga({ key: 'App', saga });

const mapDispatchToProps = {};
const mapStateToProps = createStructuredSelector({
  syncing: makeSelectSync(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(App);
