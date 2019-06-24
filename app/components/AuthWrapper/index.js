import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { Container } from 'react-bootstrap';
import {
  makeSelectCurrentUser,
  makeSelectSync,
  makeSelectLoading,
} from '../../containers/App/selectors';
import LoadingSpinner from '../LoadingSpinner';
import messages from './messages';

const Wrapper = Styled.div`
  margin-top: 6%;

  @media (max-width: 1024px) {
    margin-top: 10%;
  }
  @media (max-width: 768px) {
    margin-top: 14%;
  }
  @media (max-width: 480px) {
    margin-top: 28%;
  }
`;

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
          user &&
          user.profile &&
          allowedRoles.some(r => user.profile.roles.includes(r))
        ) {
          return (
            <Wrapper>
              <Container>
                <WrappedComponent {...this.props} />
              </Container>
            </Wrapper>
          );
        }
        if (!allowedRoles || allowedRoles.includes('home')) {
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
