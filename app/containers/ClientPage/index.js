/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';
import moment from 'moment';
import Swal from 'sweetalert2';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import SButton from '../../components/SButton';
import SForm from '../../components/SForm';
import STable from '../../components/STable';
import NotFoundPage from '../NotFoundPage';

import { getUserRequest, updateUserRequest } from '../App/actions';
import {
  makeSelectCurrentUser,
  makeSelectSelectedUser,
  makeSelectLoadingSelectedUser,
  makeSelectSelectedUserError,
} from '../App/selectors';

import { getPlanTypesRequest } from '../PlanTypesPage/actions';
import { makeSelectPlanTypes } from '../PlanTypesPage/selectors';
import {
  getPlansByClientIdRequest,
  addPlanRequest,
  deletePlanRequest,
} from '../PlansPage/actions';
import {
  makeSelectPlans,
  makeSelectLoadingSelectedPlan,
  makeSelectAddPlanSuccess,
  makeSelectAddPlanError,
  makeSelectDeletePlanSuccess,
  makeSelectDeletePlanError,
} from '../PlansPage/selectors';

import messages from './messages';

import planTypeReducer from '../PlanTypesPage/reducer';
import planTypeSaga from '../PlanTypesPage/saga';
import planReducer from '../PlansPage/reducer';
import planSaga from '../PlansPage/saga';

class ClientPage extends React.Component {
  constructor(props) {
    super(props);

    this.validateAddPlan = this.validateAddPlan.bind(this);
    this.showWarningForAddPlan = this.showWarningForAddPlan.bind(this);
  }

  componentWillMount() {
    const { getUser, getPlansByClientId, getPlanTypes, match } = this.props;
    getUser({ uid: match.params.id });
    getPlansByClientId({ clientId: match.params.id });
    getPlanTypes();
  }

  componentWillReceiveProps(nextProps) {
    const { deletePlanSuccess, deletePlanError } = this.props;
    if (
      deletePlanSuccess !== nextProps.deletePlanSuccess &&
      nextProps.deletePlanSuccess
    ) {
      this.notifyDeleteSuccess();
    }
    if (
      deletePlanError !== nextProps.deletePlanError &&
      nextProps.deletePlanError
    ) {
      this.notifyDeleteError();
    }
  }

  notifyDeleteSuccess = () => {
    const { intl } = this.props;
    return toast.success(
      `${intl.formatMessage(messages.action.delete)} ${intl.formatMessage(
        messages.action.success,
      )}`,
    );
  };

  notifyDeleteError = () => {
    const { intl } = this.props;
    return toast.error(
      `${intl.formatMessage(messages.action.delete)} ${intl.formatMessage(
        messages.action.error,
      )}`,
    );
  };

  showDelete(plan) {
    const { intl, deletePlan } = this.props;
    const { _id, startDate, endDate, planTypeName } = plan;
    Swal.fire({
      title: `${intl.formatMessage(messages.action.delete)} ${planTypeName}`,
      html:
        `<p><b>${intl.formatMessage(
          messages.model.startDate,
        )}: </b> ${moment.utc(startDate).format('YYYY-MM-DD')}</p>` +
        `<p><b>${intl.formatMessage(messages.model.endDate)}: </b> ${moment
          .utc(endDate)
          .format('YYYY-MM-DD')}</p>` +
        `<p>${intl.formatMessage(messages.action.cannotUndo)}</p>`,
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: intl.formatMessage(messages.action.delete),
      cancelButtonText: intl.formatMessage(messages.action.close),
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: intl.formatMessage(messages.action.areYouSure),
          text: intl.formatMessage(messages.action.cannotUndo),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'red',
          confirmButtonText: intl.formatMessage(messages.action.delete),
          cancelButtonText: intl.formatMessage(messages.action.cancel),
        }).then(confirm => {
          // eslint-disable-next-line no-underscore-dangle
          if (confirm.value) {
            deletePlan({ id: _id });
          }
        });
      }
    });
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
      {
        name: 'telephone',
      },
      {
        name: 'roomNumber',
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
          telephone: selectedUser.profile.telephone,
          roomNumber: selectedUser.profile.roomNumber,
        }}
        hiddenFormData={{
          uid: match.params.id,
        }}
      />
    );
  }

  validateAddPlan(formData, errors, showExtraError) {
    const { addPlanError, intl } = this.props;
    if (
      showExtraError &&
      addPlanError &&
      addPlanError.code === 'invalid/no-such-plan-type'
    ) {
      errors.planType.addError(
        `${intl.formatMessage(messages.model.planType)} ${intl.formatMessage(
          messages.error.invalid,
        )}`,
      );
    }
    if (
      showExtraError &&
      addPlanError &&
      addPlanError.code === 'invalid/client-already-have-plan'
    ) {
      errors.startDate.addError(
        `${intl.formatMessage(messages.error.hasActivePlan)} ${moment(
          addPlanError.endDate,
        ).format('YYYY-MM-DD')}`,
      );
    }
    return errors;
  }

  showWarningForAddPlan(formData) {
    const { addPlan, intl } = this.props;
    Swal.fire({
      title: intl.formatMessage(messages.action.areYouSure),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: intl.formatMessage(messages.action.accept),
      cancelButtonText: intl.formatMessage(messages.action.cancel),
    }).then(result => {
      if (result.value) {
        addPlan(formData);
      }
    });
  }

  renderAddPlanButton() {
    const {
      user,
      loadingSelectedPlan,
      addPlanSuccess,
      addPlanError,
      planTypes,
      match,
      intl,
    } = this.props;
    const definitions = {
      planType: {
        type: 'string',
        anyOf: [],
        default: planTypes && planTypes[0] && planTypes[0]._id,
      },
    };
    planTypes.forEach(planType => {
      definitions.planType.anyOf.push({
        type: 'string',
        enum: [planType._id],
        title: `${planType.name} ${
          planType.description ? `(${planType.description})` : ''
        }`,
      });
    });
    const addPlanSchema = {
      planType: {
        $ref: '#/definitions/planType',
        title: intl.formatMessage(messages.model.planType),
      },
      startDate: {
        type: 'string',
        format: 'date',
        default: moment(new Date()).format('YYYY-MM-DD'),
        title: intl.formatMessage(messages.model.startDate),
      },
    };
    return (
      <SButton
        loading={loadingSelectedPlan}
        showUiLabels
        buttonTextId="app.action.add"
        functionSuccess={addPlanSuccess}
        functionError={addPlanError}
        func={this.showWarningForAddPlan}
        validateFunc={this.validateAddPlan}
        modalTitleTextId="app.model.mealPlan"
        modalButtonTextId="action.add"
        requiredSchema={['planType', 'startDate']}
        customSchema={addPlanSchema}
        definitions={definitions}
        hiddenFormData={{
          clientId: match.params.id,
          createdBy: user && user.uid,
        }}
      />
    );
  }

  renderTable() {
    const { plans, match, history } = this.props;
    const columns = [
      {
        headerText: messages.model.startDate,
        accessor: 'startDate',
        cell: row => moment.utc(row.original.startDate).format('YYYY-MM-DD'),
      },
      {
        headerText: messages.model.endDate,
        accessor: 'endDate',
        cell: row => moment.utc(row.original.endDate).format('YYYY-MM-DD'),
      },
      {
        headerText: messages.model.planType,
        accessor: 'planTypeName',
      },
      {
        headerText: messages.action.delete,
        accessor: '_id',
        filterable: false,
        sortable: false,
        cell: row => (
          <Button onClick={() => this.showDelete(row.original)}>
            <i className="fa fa-trash" />
          </Button>
        ),
      },
      {
        headerText: messages.model.calendar,
        accessor: '_id',
        filterable: false,
        sortable: false,
        cell: () => (
          <Button
            onClick={() => history.replace(`/calendar/${match.params.id}`)}
          >
            <i className="fa fa-calendar" />
          </Button>
        ),
      },
    ];
    const additionalProps = {
      keyField: '_id',
      showPagination: false,
      pageSize: plans && plans.data.length ? plans.length : 1,
      defaultSorted: [
        {
          id: 'endDate',
          desc: true,
        },
      ],
      getTrProps: (state, rowInfo) => {
        const hasEnded = moment(new Date()).isAfter(
          rowInfo && rowInfo.original.endDate,
        );
        return {
          style: {
            background: hasEnded && 'red',
            color: hasEnded && '#fff',
          },
        };
      },
    };
    return plans && plans.data ? (
      <STable
        data={plans.data}
        columns={columns}
        additionalProps={additionalProps}
      />
    ) : (
      <div />
    );
  }

  render() {
    const { selectedUser, loadingSelectedUser, selectedUserError } = this.props;
    return !loadingSelectedUser ? (
      <div>
        {!selectedUserError && selectedUser ? (
          <Row>
            <Col md={4} xs={12}>
              <Row>
                <Col>
                  <h2>
                    <FormattedMessage {...messages.model.client} />
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>{this.renderClientEditForm()}</Col>
              </Row>
            </Col>
            <Col md={8} xs={12}>
              <Row>
                <Col>
                  <h2>
                    <FormattedMessage {...messages.model.mealPlan} />
                  </h2>
                </Col>
                <Col md="auto">{this.renderAddPlanButton()}</Col>
              </Row>
              <Row>
                <Col>{this.renderTable()}</Col>
              </Row>
            </Col>
          </Row>
        ) : (
          <NotFoundPage />
        )}
      </div>
    ) : (
      <div />
    );
  }
}

ClientPage.propTypes = {
  user: PropTypes.object,
  loadingSelectedUser: PropTypes.bool,
  selectedUser: PropTypes.object,
  selectedUserError: PropTypes.object,
  updateUser: PropTypes.func,
  getUser: PropTypes.func,

  getPlanTypes: PropTypes.func,
  planTypes: PropTypes.arrayOf(PropTypes.object),

  getPlansByClientId: PropTypes.func,
  plans: PropTypes.object,
  loadingSelectedPlan: PropTypes.bool,
  addPlanSuccess: PropTypes.bool,
  addPlanError: PropTypes.object,
  deletePlanSuccess: PropTypes.bool,
  deletePlanError: PropTypes.object,
  addPlan: PropTypes.func,
  deletePlan: PropTypes.func,

  intl: intlShape.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
};

const mapDispatchToProps = {
  getUser: getUserRequest,
  updateUser: updateUserRequest,
  getPlanTypes: getPlanTypesRequest,
  getPlansByClientId: getPlansByClientIdRequest,
  addPlan: addPlanRequest,
  deletePlan: deletePlanRequest,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loadingSelectedUser: makeSelectLoadingSelectedUser(),
  loadingSelectedPlan: makeSelectLoadingSelectedPlan(),
  selectedUser: makeSelectSelectedUser(),
  selectedUserError: makeSelectSelectedUserError(),
  planTypes: makeSelectPlanTypes(),
  plans: makeSelectPlans(),
  addPlanSuccess: makeSelectAddPlanSuccess(),
  addPlanError: makeSelectAddPlanError(),
  deletePlanSuccess: makeSelectDeletePlanSuccess(),
  deletePlanError: makeSelectDeletePlanError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withPlanTypeReducer = injectReducer({
  key: 'PlanType',
  reducer: planTypeReducer,
});
const withPlanTypeSaga = injectSaga({ key: 'PlanType', saga: planTypeSaga });
const withPlanReducer = injectReducer({ key: 'Plan', reducer: planReducer });
const withPlanSaga = injectSaga({ key: 'Plan', saga: planSaga });

export default withRouter(
  compose(
    withPlanTypeReducer,
    withPlanTypeSaga,
    withPlanReducer,
    withPlanSaga,
    withConnect,
  )(injectIntl(ClientPage)),
);
