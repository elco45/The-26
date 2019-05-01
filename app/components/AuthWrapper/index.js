import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import {
  makeSelectCurrentUser,
  makeSelectSync,
  makeSelectLoading,
} from '../../containers/App/selectors';
import messages from './messages';

export function AuthWrapper({ user, syncing, loading, children, intl }) {
  return (
    <div>
      {syncing || loading ? (
        intl.formatMessage(messages.loading)
      ) : (
        <div>
          {user && user.profile
            ? React.Children.only(children)
            : intl.formatMessage(messages.unauthorized)}
        </div>
      )}
    </div>
  );
}

AuthWrapper.propTypes = {
  user: PropTypes.object,
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  syncing: makeSelectSync(),
  loading: makeSelectLoading(),
});

export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AuthWrapper),
);
