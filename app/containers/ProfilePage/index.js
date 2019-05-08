import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import SForm from '../../components/SForm';

import AuthWrapper from '../../components/AuthWrapper';

import {
  updateProfileRequest,
  updateEmailRequest,
  updatePasswordRequest,
  logout,
} from '../App/actions';
import {
  makeSelectCurrentUser,
  makeSelectResetSuccess,
  makeSelectLoadingSelectedUser,
  makeSelectSelectedUserError,
} from '../App/selectors';

import messages from './messages';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.validateUpdateEmail = this.validateUpdateEmail.bind(this);
    this.validateUpdatePass = this.validateUpdatePass.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.resetSuccess) {
      history.push('/');
      this.notifyResetSuccess();
    }
  }

  notifyResetSuccess = () =>
    toast.success(this.props.intl.formatMessage(messages.auth.resetSuccess));

  validateUpdateEmail(formData, errors, live) {
    const { user, selectedUserError, intl } = this.props;
    if (user.email === formData.email) {
      errors.email.addError(intl.formatMessage(messages.auth.sameEmailError));
    }
    if (
      live &&
      selectedUserError &&
      selectedUserError.code === 'auth/email-already-in-use'
    ) {
      errors.email.addError(intl.formatMessage(messages.auth.emailTaken));
    }
    if (
      live &&
      selectedUserError &&
      selectedUserError.code === 'auth/requires-recent-login'
    ) {
      errors.email.addError(intl.formatMessage(messages.auth.relogin));
    }
    return errors;
  }

  validateUpdatePass(formData, errors, live) {
    const { selectedUserError, intl, signOut, history } = this.props;
    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword.addError(
        intl.formatMessage(messages.auth.repeatPassError),
      );
    }
    if (
      live &&
      selectedUserError &&
      selectedUserError.code === 'auth/requires-recent-login'
    ) {
      toast.error(intl.formatMessage(messages.auth.relogin));
      signOut();
      history.push('/');
    }
    return errors;
  }

  renderEditEmail() {
    const { user, loadingSelectedUser, updateEmail } = this.props;
    const schema = [
      {
        name: 'email',
        uiWidget: 'email',
      },
    ];
    return (
      <div>
        <h2>
          <FormattedMessage {...messages.action.edit} />{' '}
          <FormattedMessage {...messages.model.email} />
        </h2>
        <SForm
          idPrefix="editE"
          submitFunc={updateEmail}
          validateFunc={this.validateUpdateEmail}
          loading={loadingSelectedUser}
          showUiLabels
          showPlaceHolder={false}
          requiredSchema={['email']}
          schema={schema}
          submitBtnText="action.edit"
          defaultValues={{ email: user && user.email }}
        />
      </div>
    );
  }

  renderEditPass() {
    const { loadingSelectedUser, updatePassword } = this.props;
    const schema = [
      {
        name: 'password',
        uiWidget: 'password',
      },
      {
        name: 'repeatPassword',
        uiWidget: 'password',
      },
    ];
    return (
      <div>
        <h2>
          <FormattedMessage {...messages.action.edit} />{' '}
          <FormattedMessage {...messages.model.password} />
        </h2>
        <SForm
          idPrefix="editP"
          submitFunc={updatePassword}
          validateFunc={this.validateUpdatePass}
          loading={loadingSelectedUser}
          showUiLabels
          showPlaceHolder={false}
          requiredSchema={['password', 'repeatPassword']}
          schema={schema}
          submitBtnText="action.edit"
        />
      </div>
    );
  }

  render() {
    return (
      <AuthWrapper>
        <Container>
          <Row>
            <Col md={4} xs={12}>
              <div>Profile Pic</div>
            </Col>
            <Col md={8} xs={12}>
              {this.renderEditEmail()}
              <hr />
              {this.renderEditPass()}
            </Col>
          </Row>
        </Container>
      </AuthWrapper>
    );
  }
}

ProfilePage.propTypes = {
  user: PropTypes.object,
  resetSuccess: PropTypes.bool,
  loadingSelectedUser: PropTypes.bool,
  updateEmail: PropTypes.func,
  // updateProfile: PropTypes.func,
  updatePassword: PropTypes.func,
  selectedUserError: PropTypes.object,
  signOut: PropTypes.func,
  intl: intlShape.isRequired,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  updateProfile: updateProfileRequest,
  updatePassword: updatePasswordRequest,
  updateEmail: updateEmailRequest,
  signOut: logout,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  resetSuccess: makeSelectResetSuccess(),
  loadingSelectedUser: makeSelectLoadingSelectedUser(),
  selectedUserError: makeSelectSelectedUserError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(injectIntl(ProfilePage)));
