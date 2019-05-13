import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import {
  makeSelectCurrentUser,
  makeSelectSync,
  makeSelectLoading,
} from '../../containers/App/selectors';
import LoadingSpinner from '../LoadingSpinner';
import messages from './messages';

export default function Authorization(allowedRoles) {
  return WrappedComponent => {
    // eslint-disable-next-line react/prefer-stateless-function
    class WithAuthorization extends Component {
      render() {
        const { user, syncing, loading, intl } = this.props;
        if (syncing || loading) {
          return <LoadingSpinner />;
        }
        if (
          (user &&
            user.profile &&
            allowedRoles.some(r => user.profile.roles.includes(r))) ||
          !allowedRoles
        ) {
          return <WrappedComponent {...this.props} />;
        }
        return <h1>{intl.formatMessage(messages.unauthorized)}</h1>;
      }
    }

    WithAuthorization.propTypes = {
      user: PropTypes.object,
      allowedRoles: PropTypes.arrayOf(PropTypes.string),
      syncing: PropTypes.bool,
      loading: PropTypes.bool,
      intl: intlShape.isRequired,
    };
    const mapDispatchToProps = {};

    const mapStateToProps = createStructuredSelector({
      user: makeSelectCurrentUser(),
      syncing: makeSelectSync(),
      loading: makeSelectLoading(),
    });

    return injectIntl(
      connect(
        mapStateToProps,
        mapDispatchToProps,
      )(WithAuthorization),
    );
  };
}
