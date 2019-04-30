import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Auth from '../Auth';
import CurrentUser from '../CurrentUser';

import {
  login,
  loginWithProvider,
  logout,
  signUp,
  passReset,
} from '../../containers/App/actions';
import {
  makeSelectCurrentUser,
  makeSelectLoggedIn,
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
  makeSelectSignInError,
  makeSelectPassResetError,
  makeSelectSync,
  makeSelectLoading,
  makeSelectLoadingPassReset,
} from '../../containers/App/selectors';
import reducer from '../../containers/App/reducer';
import saga from '../../containers/App/saga';

import LocaleToggle from '../../containers/LocaleToggle';

class HomeNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      dropdownOpen: false,
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onClick() {
    const { collapse } = this.state;
    this.setState({
      collapse,
    });
  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen,
    });
  }

  checkActive(path) {
    const { location } = this.props;
    if (location.pathname === path) {
      return 'true';
    }
    return 'false';
  }

  renderUserNavItem() {
    const { user, loggedIn, syncing, signOut } = this.props;
    return (
      <Navbar.Collapse className="justify-content-end">
        <Nav key="uN">
          <Nav.Item>
            <Nav.Link>
              <LocaleToggle />
            </Nav.Link>
          </Nav.Item>
          {loggedIn && user ? (
            <CurrentUser user={user} syncing={syncing} signOut={signOut} />
          ) : (
            this.renderAuth()
          )}
        </Nav>
      </Navbar.Collapse>
    );
  }

  renderAuth() {
    const {
      signUpSuccess,
      signUpError,
      signInError,
      passResetError,
      signIn,
      createUser,
      sendPassReset,
      syncing,
      loading,
      loadingPassReset,
    } = this.props;
    return (
      <Auth
        signUpSuccess={signUpSuccess}
        signUpError={signUpError}
        signInError={signInError}
        passResetError={passResetError}
        signIn={signIn}
        signUp={createUser}
        sendPassReset={sendPassReset}
        syncing={syncing}
        loading={loading}
        loadingPassReset={loadingPassReset}
      />
    );
  }

  renderNavItems() {
    return this.renderUserNavItem();
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        {/* <div className="container"> */}
        <Navbar.Brand // eslint-disable-line
          href="/"
        >
          The 26th
        </Navbar.Brand>
        <Navbar.Toggle className="ml-auto" aria-controls="collapse-nav" />
        {this.renderNavItems()}
      </Navbar>
    );
  }
}

HomeNav.propTypes = {
  user: PropTypes.object,
  signUpSuccess: PropTypes.bool,
  signUpError: PropTypes.object,
  signInError: PropTypes.object,
  passResetError: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  sendPassReset: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingPassReset: PropTypes.bool,
  location: PropTypes.object,
};

const mapDispatchToProps = {
  signIn: login,
  signInWithProvider: loginWithProvider,
  signOut: logout,
  createUser: signUp,
  sendPassReset: passReset,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loggedIn: makeSelectLoggedIn(),
  signUpSuccess: makeSelectSignUpSuccess(),
  signUpError: makeSelectSignUpError(),
  signInError: makeSelectSignInError(),
  passResetError: makeSelectPassResetError(),
  syncing: makeSelectSync(),
  loading: makeSelectLoading(),
  loadingPassReset: makeSelectLoadingPassReset(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homeNav', reducer });
const withSaga = injectSaga({ key: 'homeNav', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(HomeNav),
);