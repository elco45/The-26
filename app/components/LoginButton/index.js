import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import SignInModal from '../SignInModal';
import PassResetModal from '../PassResetModal';

class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSignIn: false,
      modalPassReset: false,
    };

    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.togglePassReset = this.togglePassReset.bind(this);
    this.togglePass = this.togglePass.bind(this);
    this.toggle = this.toggle.bind(this);
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
    const { modalSignIn } = this.state;
    this.setState({
      modalSignIn: !modalSignIn,
    });
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
      return this.renderSignIn();
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
      this.renderSignInModal(),
      this.renderPassResetModal(),
    ];
  }
}

LoginButton.propTypes = {
  signInError: PropTypes.object,
  passResetError: PropTypes.object,
  signIn: PropTypes.func.isRequired,
  sendPassReset: PropTypes.func.isRequired,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingPassReset: PropTypes.bool,
};

export default LoginButton;
