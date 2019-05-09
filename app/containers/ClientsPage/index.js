import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AuthWrapper from '../../components/AuthWrapper';
import SButton from '../../components/SButton';
import STable from '../../components/STable';

import { signUp, getUsersRequest } from '../App/actions';
import {
  makeSelectUsers,
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
    this.renderAddButton = this.renderAddButton.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    this.props.getUsers({ role: 'client' });
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

  renderTable() {
    const { users, history } = this.props;
    const columns = [
      {
        headerText: messages.model.fullName,
        accessor: 'displayName',
      },
      {
        headerText: messages.model.email,
        accessor: 'email',
      },
      {
        headerText: messages.action.edit,
        accessor: '_id',
        filterable: false,
        sortable: false,
        style: {
          textAlign: 'center',
        },
        cell: row => (
          // eslint-disable-next-line no-underscore-dangle
          <Button onClick={() => history.push(`/client/${row.original._id}`)}>
            <i className="fa fa-pencil" />
          </Button>
        ),
      },
    ];
    const additionalProps = {
      keyField: '_id',
      showPagination: false,
      pageSize: users && users.length ? users.length : 1,
      defaultSorted: [
        {
          id: 'displayName',
          desc: false,
        },
      ],
    };
    return users ? (
      <STable
        data={users}
        columns={columns}
        additionalProps={additionalProps}
      />
    ) : (
      <div />
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
          <Row>
            <Col>{this.renderTable()}</Col>
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
  users: PropTypes.arrayOf(PropTypes.object),
  syncing: PropTypes.bool,
  loading: PropTypes.bool,
  loadingSelectedUser: PropTypes.bool,
  createUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  createUser: signUp,
  getUsers: getUsersRequest,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  signUpSuccess: makeSelectSignUpSuccess(),
  signUpError: makeSelectSignUpError(),
  loadingSelectedUser: makeSelectLoadingSelectedUser(),
  selectedUserError: makeSelectSelectedUserError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(injectIntl(ClientsPage)));
