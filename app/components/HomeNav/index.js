import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { scroller, animateScroll as scroll } from 'react-scroll';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

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

import LocaleToggle from '../../containers/LocaleToggle';
require('./style.css');

const QrCodeIcon = Styled.i`
  border-radius: 8px;
  padding: 4px;
  color: black;
  background: white;
  font-size: 28px !important;
  margin-left: 5px;
`;

const specialPages = ['/'];

class HomeNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navExpanded: false,
      scrollY: 0,
    };

    this.setNavExpanded = this.setNavExpanded.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.navBarStyle = this.navBarStyle.bind(this);
  }

  componentDidMount() {
    this.setState({
      scrollY: window.pageYOffset,
    });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const { scrollY } = this.state;
    const { pageYOffset } = window;
    if (pageYOffset === 0 || scrollY === 0) {
      this.setState({
        scrollY: pageYOffset,
      });
    }
  }

  navBarStyle() {
    const { scrollY } = this.state;
    const { location } = this.props;
    return {
      backgroundColor: '#000',
      opacity:
        scrollY === 0 && specialPages.includes(location.pathname) ? 0.6 : 1,
      transform: scrollY !== 0 ? 'scaleY(0.95)' : '',
      transformOrigin: 'top',
    };
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }

  closeNav(path = null, scrollTo = null) {
    const { history, location } = this.props;
    this.setState({ navExpanded: false });
    if (path) {
      if (location.pathname !== path) {
        history.push(path);
      } else {
        scroll.scrollToTop();
      }
    } else {
      scroller.scrollTo(scrollTo, { delay: 100, smooth: true, offset: -50 });
    }
  }

  renderMenu() {
    const { user, syncing } = this.props;
    if (syncing) {
      return (
        <div key="spin" className="text-center">
          <i className="fa fa-spinner fa-spin fa-pulse" />
        </div>
      );
    }
    return (
      <Navbar.Collapse key="menuItems">
        {user && user.profile ? (
          this.renderUserMenu()
        ) : (
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => this.closeNav(null, 'RestaurantStory')}>
                About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => this.closeNav(null, 'Plan')}>
                Plan
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => this.closeNav(null, 'Menu')}>
                Menu
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => this.closeNav(null, 'ContactUs')}>
                Contact Us
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    );
  }

  renderUserMenu() {
    const { user } = this.props;
    return (
      user.profile.roles.includes('admin') && (
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={() => this.closeNav('/clients')}>
              <FormattedMessage {...{ id: 'app.model.clients' }} />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => this.closeNav('/plan-types')}>
              <FormattedMessage {...{ id: 'app.model.planTypes' }} />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )
    );
  }

  renderUserNavItem() {
    const { user, loggedIn, syncing, signOut, history } = this.props;

    return (
      <Nav key="authItem">
        {loggedIn && user && user.profile.roles.includes('admin') ? (
          <Nav.Item>
            <Nav.Link onClick={() => this.closeNav('/scan-qr')}>
              <QrCodeIcon className="fa fa-qrcode" />
            </Nav.Link>
          </Nav.Item>
        ) : (
          <div />
        )}
        <Navbar.Collapse className="justify-content-end">
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
                closeNav={this.closeNav}
              />
            ) : (
              this.renderLoginButton()
            )}
          </Nav>
        </Navbar.Collapse>
      </Nav>
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
        closeNav={this.closeNav}
      />
    );
  }

  renderNavItems() {
    return [this.renderMenu(), this.renderUserNavItem()];
  }

  render() {
    const { navExpanded } = this.state;
    return (
      <Navbar
        className="navbarCustomStyle"
        fixed="top"
        variant="dark"
        expand="lg"
        onToggle={this.setNavExpanded}
        expanded={navExpanded}
        style={this.navBarStyle()}
      >
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => this.closeNav('/')}
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
  signInError: PropTypes.object,
  passResetError: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  sendPassReset: PropTypes.func,
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

export default withRouter(compose(withConnect)(HomeNav));
