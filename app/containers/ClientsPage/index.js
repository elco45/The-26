import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import AuthWrapper from '../../components/AuthWrapper';
import SButton from '../../components/SButton';

import { signUp } from '../App/actions';
import {
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
  makeSelectLoadingSelectedUser,
  makeSelectSelectedUserError,
} from '../App/selectors';
import reducer from '../App/reducer';
import saga from '../App/saga';

import messages from './messages';

class ClientsPage extends React.Component {
  constructor(props) {
    super(props);

    this.notifyVerificationSent = this.notifyVerificationSent.bind(this);
    this.validateCreateUser = this.validateCreateUser.bind(this);
    this.validateUpdateEmail = this.validateUpdateEmail.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.signUpSuccess !== nextProps.signUpSuccess &&
      nextProps.signUpSuccess
    ) {
      this.notifyVerificationSent();
    }
  }

  notifyVerificationSent = () => {
    const { intl } = this.props;
    return toast(intl.formatMessage(messages.auth.verificationSent), {
      className: 'bg-success',
      bodyClassName: 'text-white',
      progressClassName: 'fancy-progress-bar',
    });
  };

  validateCreateUser(formData, errors, showExtraError) {
    const { signUpError, intl } = this.props;
    if (
      showExtraError &&
      signUpError &&
      signUpError.code === 'auth/email-already-in-use'
    ) {
      errors.email.addError(intl.formatMessage(messages.auth.emailTaken));
    }
    return errors;
  }

  validateUpdateEmail(formData, errors, live) {
    const { selectedUserError, intl } = this.props;
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

  render() {
    const {
      signUpSuccess,
      signUpError,
      createUser,
      syncing,
      loadingSelectedUser,
    } = this.props;
    return (
      <AuthWrapper>
        <Container>
          <Row>
            <Col md={4} xs={12}>
              <SButton
                syncing={syncing}
                loading={loadingSelectedUser}
                buttonTextId="app.auth.addUser"
                functionSuccess={signUpSuccess}
                functionError={signUpError}
                func={createUser}
                validateFunc={this.validateCreateUser}
                modalTitleTextId="app.auth.addUser"
                modalButtonTextId="action.add"
                requiredSchema={['name', 'email', 'password']}
                schema={['name', 'email', 'password']}
                hiddenFormData={{
                  roles: ['client'],
                }}
              />
            </Col>
            <Col md={8} xs={12}>
              <h2>
                <FormattedMessage {...messages.action.edit} />{' '}
                <FormattedMessage {...messages.model.email} />
              </h2>
              <hr />
            </Col>
          </Row>
        </Container>
      </AuthWrapper>
    );
  }
}

ClientsPage.propTypes = {
  signUpSuccess: PropTypes.bool,
  selectedUserError: PropTypes.bool,
  signUpError: PropTypes.object,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingSelectedUser: PropTypes.bool,
  createUser: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  createUser: signUp,
};

const mapStateToProps = createStructuredSelector({
  signUpSuccess: makeSelectSignUpSuccess(),
  signUpError: makeSelectSignUpError(),
  loadingSelectedUser: makeSelectLoadingSelectedUser(),
  selectedUserError: makeSelectSelectedUserError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'ClientsPage', reducer });
const withSaga = injectSaga({ key: 'ClientsPage', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(injectIntl(ClientsPage)),
);
