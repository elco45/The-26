import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import SignInModal from '../SignInModal';
import SModal from '../SModal';

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
    this.validatePassReset = this.validatePassReset.bind(this);
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

  validatePassReset(formData, errors, live) {
    const { passResetError, intl } = this.props;
    if (
      live &&
      passResetError &&
      passResetError.code === 'auth/user-not-found'
    ) {
      errors.email.addError(
        intl.formatMessage(messages.auth.emailNotRegistered),
      );
    }
    return errors;
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
    const schema = [
      {
        name: 'email',
        uiWidget: 'email',
      },
    ];
    return (
      <SModal
        key="mpr"
        toggle={this.togglePass}
        modalToggle={this.state.modalPassReset}
        func={sendPassReset}
        functionError={passResetError}
        validateFunc={this.validatePassReset}
        modalTitleTextId="app.auth.restorePass"
        modalButtonTextId="action.send"
        loading={loadingPassReset}
        schema={schema}
        requiredSchema={['email']}
      />
    );
  }

  renderSignInButton() {
    const { syncing } = this.props;

    if (!syncing) {
      return (
        <Nav.Item key="si">
          <Nav.Link onClick={this.toggleSignIn} to="#">
            <FormattedMessage {...messages.login} />
          </Nav.Link>
        </Nav.Item>
      );
    }
    return (
      <div key="spin" className="text-center">
        <i className="fa fa-spinner fa-spin fa-pulse" />
      </div>
    );
  }

  render() {
    return [
      this.renderSignInButton(),
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
  intl: intlShape.isRequired,
};

export default injectIntl(LoginButton);
