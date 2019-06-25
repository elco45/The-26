import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectCurrentUser } from '../App/selectors';

import ClientHomePage from '../ClientHomePage';
import messages from './messages';
import Hero from './Hero';
import RestaurantStory from './RestaurantStory';
import Menu from './Menu';
import Footer from './Footer';
import Plans from './Plans';

class HomePage extends React.Component {
  renderHomePage() {
    return (
      <div>
        <Hero />
        <RestaurantStory />
        <Plans />
        <Menu />
        <Footer />
      </div>
    );
  }

  renderClientHomePage() {
    const { user } = this.props;
    return <ClientHomePage clientId={user.uid} />;
  }

  renderAdminHomePage() {
    return (
      <div>
        <FormattedMessage {...messages.welcome} /> Admin
      </div>
    );
  }

  renderByUserRole() {
    const { user } = this.props;
    // if (user && user.profile.roles.includes('admin')) {
    //   return this.renderAdminHomePage();
    // }
    if (user && user.profile.roles.includes('client')) {
      return this.renderClientHomePage();
    }
    return this.renderHomePage();
  }

  render() {
    return this.renderByUserRole();
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
