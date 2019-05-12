/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  makeSelectCurrentUser,
  makeSelectSync,
  makeSelectLoading,
} from '../App/selectors';

import ClientHomePage from '../ClientHomePage';
import messages from './messages';

class HomePage extends React.Component {
  renderHomePage() {
    return (
      <div>
        <FormattedMessage {...messages.welcome} />
      </div>
    );
  }

  renderClientHomePage() {
    return <ClientHomePage />;
  }

  renderAdminHomePage() {
    return this.renderHomePage();
  }

  renderByUserRole() {
    const { user } = this.props;
    if (user && user.profile.roles.includes('admin')) {
      return this.renderAdminHomePage();
    }
    if (user && user.profile.roles.includes('client')) {
      return this.renderClientHomePage();
    }
    return this.renderHomePage();
  }

  render() {
    const { syncing, loading } = this.props;
    return syncing || loading ? <div>Loading</div> : this.renderByUserRole();
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  syncing: makeSelectSync(),
  loading: makeSelectLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
