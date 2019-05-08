import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AuthWrapper from '../../components/AuthWrapper';
import SButton from '../../components/SButton';

import { signUp } from '../App/actions';
import {
  makeSelectSignUpSuccess,
  makeSelectSignUpError,
  makeSelectLoadingSelectedUser,
  makeSelectSelectedUserError,
} from '../App/selectors';

import messages from './messages';

class ClientsPage extends React.Component {
  constructor(props) {
    super(props);

    this.notifyVerificationSent = this.notifyVerificationSent.bind(this);
    this.validateCreateUser = this.validateCreateUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { signUpSuccess } = this.props;
    if (signUpSuccess !== nextProps.signUpSuccess && nextProps.signUpSuccess) {
      this.notifyVerificationSent();
    }
  }

  notifyVerificationSent = () => {
    const { intl } = this.props;
    return toast.success(
      `${intl.formatMessage(messages.action.success)} ${intl.formatMessage(
        messages.auth.verificationSent,
      )}`,
    );
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

  renderAddButton() {
    const {
      signUpSuccess,
      signUpError,
      createUser,
      syncing,
      loadingSelectedUser,
    } = this.props;
    const addClientSchema = [
      {
        name: 'name',
      },
      {
        name: 'email',
        uiWidget: 'email',
      },
      {
        name: 'password',
        uiWidget: 'password',
      },
    ];
    return (
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
        schema={addClientSchema}
        hiddenFormData={{
          roles: ['client'],
        }}
      />
    );
  }

  render() {
    return (
      <AuthWrapper>
        <Container>
          <Row>
            <Col md={4} xs={12}>
              {this.renderAddButton()}
            </Col>
            <Col md={8} xs={12}>
              <h2>
                <FormattedMessage {...messages.model.clients} />
              </h2>
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

export default compose(withConnect)(injectIntl(ClientsPage));
