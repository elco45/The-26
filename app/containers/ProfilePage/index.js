import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import SForm from '../../components/SForm';

import AuthWrapper from '../../components/AuthWrapper';

import {
  updateProfileRequest,
  updateEmailRequest,
  updatePasswordRequest,
} from '../App/actions';
import {
  makeSelectCurrentUser,
  makeSelectResetSuccess,
  makeSelectLoadingSelectedUser,
  makeSelectSelectedUserError,
} from '../App/selectors';
import reducer from '../App/reducer';
import saga from '../App/saga';

import messages from './messages';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.validateUpdateEmail = this.validateUpdateEmail.bind(this);
    this.validateUpdatePass = this.validateUpdatePass.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.resetSuccess !== nextProps.resetSuccess &&
      nextProps.resetSuccess
    ) {
      window.location.href = '/';
    }
  }

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
    const { selectedUserError, intl } = this.props;
    if (live && formData.password !== formData.repeatPassword) {
      errors.repeatPassword.addError(
        intl.formatMessage(messages.auth.repeatPassError),
      );
    }
    if (
      live &&
      selectedUserError &&
      selectedUserError.code === 'auth/requires-recent-login'
    ) {
      errors.repeatPassword.addError(intl.formatMessage(messages.auth.relogin));
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
  intl: intlShape.isRequired,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  updateProfile: updateProfileRequest,
  updatePassword: updatePasswordRequest,
  updateEmail: updateEmailRequest,
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

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(injectIntl(ProfilePage)),
);
