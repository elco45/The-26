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
import messages from './messages';

// export function AuthWrapper({
//   user,
//   allowedRoles,
//   syncing,
//   loading,
//   children,
//   intl,
// }) {
//   console.log(allowedRoles);
//   return (
//     <div>
//       {syncing || loading ? (
//         intl.formatMessage(messages.loading)
//       ) : (
//         <div>
//           {user &&
//           user.profile &&
//           (user.profile.roles.includes(allowedRoles) || !allowedRoles)
//             ? React.Children.only(children)
//             : intl.formatMessage(messages.unauthorized)}
//         </div>
//       )}
//     </div>
//   );
// }
export default function Authorization(allowedRoles) {
  return WrappedComponent => {
    class WithAuthorization extends Component {
      render() {
        const { user, syncing, loading, intl } = this.props;
        if (syncing || loading) {
          return intl.formatMessage(messages.loading);
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

// Authorization.propTypes = {
//   user: PropTypes.object,
//   allowedRoles: PropTypes.arrayOf(PropTypes.string),
//   syncing: PropTypes.bool,
//   loading: PropTypes.bool,
//   children: PropTypes.element.isRequired,
//   intl: intlShape.isRequired,
// };

// const mapDispatchToProps = {};

// const mapStateToProps = createStructuredSelector({
//   user: makeSelectCurrentUser(),
//   syncing: makeSelectSync(),
//   loading: makeSelectLoading(),
// });

// export default injectIntl(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   )(Authorization),
// );
