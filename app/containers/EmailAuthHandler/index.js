import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import Swal from 'sweetalert2';
import QueryString from 'querystring';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  applyActionCodeRequest,
  confirmPasswordResetRequest,
} from '../App/actions';
import {
  makeSelectApplyActionSuccess,
  makeSelectApplyActionError,
} from '../App/selectors';

import messages from './messages';

class EmailAuthHandler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    const { location, applyActionCode } = this.props;
    const query = location.search.substr(1);
    const values = QueryString.parse(query);
    const { mode } = values;

    switch (mode) {
      case 'resetPassword':
        this.handleResetPassword(values);
        break;
      case 'verifyEmail':
        applyActionCode(values);
        break;
      default:
        this.handleInvalidToken();
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { applyActionSuccess, applyActionError } = nextProps;
    if (this.applyActionSuccess !== applyActionSuccess && applyActionSuccess) {
      if (applyActionSuccess === 'resetPassword') {
        this.handlePasswordResetSuccess();
      } else {
        this.handleEmailVerificationSuccess();
      }
    }
    if (this.applyActionError !== applyActionError && applyActionError) {
      this.handleInvalidToken();
    }
  }

  handleInvalidToken() {
    const { intl } = this.props;
    Swal.fire({
      title: intl.formatMessage(messages.action.error),
      text: intl.formatMessage(messages.auth.invalidToken),
      type: 'error',
      confirmButtonText: intl.formatMessage(messages.action.accept),
      allowOutsideClick: false,
    }).then(result => {
      if (result.value) {
        this.props.history.push('/');
      }
    });
  }

  handlePasswordResetSuccess() {
    const { intl } = this.props;
    Swal.fire({
      title: intl.formatMessage(messages.action.success),
      text: intl.formatMessage(messages.auth.resetSuccess),
      type: 'success',
      confirmButtonText: intl.formatMessage(messages.action.accept),
      allowOutsideClick: false,
    }).then(result => {
      if (result.value) {
        this.props.history.push('/');
      }
    });
  }

  handleEmailVerificationSuccess() {
    const { intl } = this.props;
    Swal.fire({
      title: intl.formatMessage(messages.action.success),
      text: intl.formatMessage(messages.auth.emailVerifificationSuccess),
      type: 'success',
      confirmButtonText: intl.formatMessage(messages.action.accept),
      allowOutsideClick: false,
    }).then(result => {
      if (result.value) {
        this.props.history.push('/');
      }
    });
  }

  handleResetPassword(values) {
    const { mode, oobCode } = values;
    const { intl, confirmPasswordReset } = this.props;
    Swal.fire({
      title: `${intl.formatMessage(messages.model.new)} ${intl.formatMessage(
        messages.model.password,
      )}`,
      input: 'password',
      confirmButtonText: intl.formatMessage(messages.action.submit),
      allowOutsideClick: false,
      preConfirm: newPass => {
        if (newPass.length < 6) {
          Swal.showValidationMessage(
            `${intl.formatMessage(messages.error.minRequired)} 6`,
          );
        }
      },
    }).then(result => {
      if (result.value) {
        confirmPasswordReset({
          mode,
          oobCode,
          newPassword: result.value,
        });
      }
    });
  }

  render() {
    return <div />;
  }
}

EmailAuthHandler.propTypes = {
  applyActionCode: PropTypes.func,
  confirmPasswordReset: PropTypes.func,
  applyActionSuccess: PropTypes.string,
  applyActionError: PropTypes.object,

  intl: intlShape.isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  applyActionCode: applyActionCodeRequest,
  confirmPasswordReset: confirmPasswordResetRequest,
};

const mapStateToProps = createStructuredSelector({
  applyActionSuccess: makeSelectApplyActionSuccess(),
  applyActionError: makeSelectApplyActionError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(injectIntl(EmailAuthHandler)));
