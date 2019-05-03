import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LoginButton from '../LoginButton';
import CurrentUser from '../CurrentUser';

import { login, logout, passReset } from '../../containers/App/actions';
import {
  makeSelectCurrentUser,
  makeSelectLoggedIn,
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
    const { user, loggedIn, syncing, signOut, history } = this.props;

    return (
      <Navbar.Collapse className="justify-content-end">
        <Nav key="uN">
          <Nav.Item>
            <Nav.Link>
              <LocaleToggle />
            </Nav.Link>
          </Nav.Item>
          {loggedIn && user ? (
            <CurrentUser
              user={user}
              syncing={syncing}
              signOut={signOut}
              history={history}
            />
          ) : (
            this.renderAuth()
          )}
        </Nav>
      </Navbar.Collapse>
    );
  }

  renderAuth() {
    const {
      signInError,
      passResetError,
      signIn,
      sendPassReset,
      syncing,
      loading,
      loadingPassReset,
    } = this.props;
    return (
      <LoginButton
        signInError={signInError}
        passResetError={passResetError}
        signIn={signIn}
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
    const { history } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand onClick={() => history.push('/')}>The 26th</Navbar.Brand>
        <Navbar.Toggle className="ml-auto" aria-controls="collapse-nav" />
        {this.renderNavItems()}
      </Navbar>
    );
  }
}

HomeNav.propTypes = {
  user: PropTypes.object,
  signInError: PropTypes.object,
  passResetError: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  sendPassReset: PropTypes.func.isRequired,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingPassReset: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  signIn: login,
  signOut: logout,
  sendPassReset: passReset,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loggedIn: makeSelectLoggedIn(),
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
