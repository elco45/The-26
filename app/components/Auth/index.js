import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SignUpModal from '../UserCreateModal';
import SignInModal from '../SignInModal';
import PassResetModal from '../PassResetModal';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSignUp: false,
      modalSignIn: false,
      modalPassReset: false,
    };

    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.togglePassReset = this.togglePassReset.bind(this);
    this.togglePass = this.togglePass.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggleSignUp() {
    const { modalSignUp } = this.state;
    this.setState({
      modalSignUp: !modalSignUp,
    });
  }

  toggleSignIn() {
    const { modalSignIn } = this.state;
    this.setState({
      modalSignIn: !modalSignIn,
    });
  }

  togglePassReset() {
    const { modalSignIn, modalPassReset } = this.state;
    this.setState({
      modalSignIn: !modalSignIn,
      modalPassReset: !modalPassReset,
    });
  }

  togglePass() {
    const { modalPassReset } = this.state;
    this.setState({
      modalPassReset: !modalPassReset,
    });
  }

  toggle() {
    const { modalSignUp, modalSignIn } = this.state;
    this.setState({
      modalSignUp: !modalSignUp,
      modalSignIn: !modalSignIn,
    });
  }

  renderSignUpModal() {
    const { signUp, signUpError, signUpSuccess, loading } = this.props;
    return (
      <SignUpModal
        key="msu"
        toggle={this.toggle}
        toggleSignUp={this.toggleSignUp}
        modalSignUp={this.state.modalSignUp}
        signUp={signUp}
        signUpError={signUpError}
        signUpSuccess={signUpSuccess}
        loading={loading}
      />
    );
  }

  renderSignInModal() {
    const { signIn, signInError, loading } = this.props;
    return (
      <SignInModal
        key="msi"
        toggle={this.toggle}
        togglePassReset={this.togglePassReset}
        toggleSignIn={this.toggleSignIn}
        modalSignIn={this.state.modalSignIn}
        signIn={signIn}
        signInError={signInError}
        loading={loading}
      />
    );
  }

  renderPassResetModal() {
    const { sendPassReset, passResetError, loadingPassReset } = this.props;
    return (
      <PassResetModal
        key="mpr"
        togglePassReset={this.togglePass}
        modalPassReset={this.state.modalPassReset}
        passReset={sendPassReset}
        passResetError={passResetError}
        loadingPassReset={loadingPassReset}
      />
    );
  }

  renderSignUp() {
    return (
      <Nav.Item key="su">
        <Nav.Link onClick={this.toggleSignUp} to="#">
          <FormattedMessage {...messages.addUser} />
        </Nav.Link>
      </Nav.Item>
    );
  }

  renderSignIn() {
    return (
      <Nav.Item key="si">
        <Nav.Link onClick={this.toggleSignIn} to="#">
          <FormattedMessage {...messages.login} />
        </Nav.Link>
      </Nav.Item>
    );
  }

  renderAuthItems() {
    const { syncing } = this.props;

    if (!syncing) {
      return [this.renderSignIn(), this.renderSignUp()];
    }
    return (
      <div key="spin" className="text-center">
        <i className="fa fa-spinner fa-spin fa-pulse" />
      </div>
    );
  }

  render() {
    return [
      this.renderAuthItems(),
      this.renderSignUpModal(),
      this.renderSignInModal(),
      this.renderPassResetModal(),
    ];
  }
}

Auth.propTypes = {
  signUpSuccess: PropTypes.bool,
  signUpError: PropTypes.object,
  signInError: PropTypes.object,
  passResetError: PropTypes.object,
  signIn: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  sendPassReset: PropTypes.func.isRequired,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingPassReset: PropTypes.bool,
};

export default Auth;
