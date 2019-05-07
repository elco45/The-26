import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
      dropdownOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen,
    });
  }

  renderMenu() {
    const { history, user, syncing } = this.props;
    if (syncing) {
      return (
        <div key="spin" className="text-center">
          <i className="fa fa-spinner fa-spin fa-pulse" />
        </div>
      );
    }
    return (
      <Navbar.Collapse key="menuItems">
        <Nav>
          {user ? (
            <Nav.Item>
              <Nav.Link onClick={() => history.push('/clients')}>
                <FormattedMessage {...{ id: 'app.model.clients' }} />
              </Nav.Link>
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Nav.Link onClick={() => history.push('/asd')}>asd</Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    );
  }

  renderUserNavItem() {
    const { user, loggedIn, syncing, signOut, history } = this.props;

    return (
      <Navbar.Collapse key="authItem" className="justify-content-end">
        <Nav>
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
            this.renderLoginButton()
          )}
        </Nav>
      </Navbar.Collapse>
    );
  }

  renderLoginButton() {
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
    return [this.renderMenu(), this.renderUserNavItem()];
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
