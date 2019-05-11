import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AuthWrapper from '../../components/AuthWrapper';
import SForm from '../../components/SForm';
import NotFoundPage from '../NotFoundPage';

import { getUserRequest, updateUserRequest } from '../App/actions';
import {
  makeSelectSelectedUser,
  makeSelectLoadingSelectedUser,
  makeSelectSelectedUserError,
} from '../App/selectors';

import messages from './messages';

class ClientPage extends React.Component {
  componentWillMount() {
    const { getUser, match } = this.props;
    getUser({ uid: match.params.id });
  }

  renderClientEditForm() {
    const { selectedUser, loadingSelectedUser, updateUser, match } = this.props;
    const schema = [
      {
        name: 'email',
        uiWidget: 'email',
        isReadOnly: true,
      },
      {
        name: 'name',
      },
    ];
    return (
      <SForm
        idPrefix="editE"
        submitFunc={updateUser}
        loading={loadingSelectedUser}
        showUiLabels
        showPlaceHolder={false}
        requiredSchema={['email', 'name']}
        schema={schema}
        submitBtnText="action.edit"
        defaultValues={{
          email: selectedUser.email,
          name: selectedUser.displayName,
        }}
        hiddenFormData={{
          uid: match.params.id,
        }}
      />
    );
  }

  render() {
    const { selectedUser, loadingSelectedUser, selectedUserError } = this.props;
    return !loadingSelectedUser ? (
      <AuthWrapper>
        {!selectedUserError && selectedUser ? (
          <Container>
            <Row>
              <Col md={6} xs={12}>
                <h2>
                  <FormattedMessage {...messages.model.client} />
                </h2>
                {this.renderClientEditForm()}
              </Col>
              <Col md={6} xs={12}>
                <h2>
                  <FormattedMessage {...messages.model.monthlyMealPlan} />
                </h2>
              </Col>
            </Row>
          </Container>
        ) : (
          <NotFoundPage />
        )}
      </AuthWrapper>
    ) : (
      <div />
    );
  }
}

ClientPage.propTypes = {
  loadingSelectedUser: PropTypes.bool,
  selectedUser: PropTypes.object,
  selectedUserError: PropTypes.object,
  getUser: PropTypes.func,
  updateUser: PropTypes.func,
  intl: intlShape.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
};

const mapDispatchToProps = {
  getUser: getUserRequest,
  updateUser: updateUserRequest,
};

const mapStateToProps = createStructuredSelector({
  loadingSelectedUser: makeSelectLoadingSelectedUser(),
  selectedUser: makeSelectSelectedUser(),
  selectedUserError: makeSelectSelectedUserError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(injectIntl(ClientPage)));
