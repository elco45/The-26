/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Styled from 'styled-components';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';
import QRCode from 'qrcode.react';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  getPlanEventsByClientIdRequest,
  deletePlanEventRequest,
  addPlanEventRequest,
} from './actions';
import { makeSelectCurrentUser } from '../App/selectors';
import {
  makeSelectLoadingPlanEvents,
  makeSelectPlanEvents,
  makeSelectPlanEventsError,
  makeSelectDeletePlanEventSuccess,
  makeSelectDeletePlanEventError,
  makeSelectAddPlanEventSuccess,
  makeSelectAddPlanEventError,
} from './selectors';

import { getActivePlansByClientIdRequest } from '../PlansPage/actions';
import {
  makeSelectPlans,
  makeSelectLoadingPlans,
} from '../PlansPage/selectors';

import planEventReducer from './reducer';
import planEventSaga from './saga';
import planReducer from '../PlansPage/reducer';
import planSaga from '../PlansPage/saga';
import messages from './messages';

import LoadingSpinner from '../../components/LoadingSpinner';
const localizer = BigCalendar.momentLocalizer(moment);

const ActivePlanWrapper = Styled.div`
  background: lightgray;
  padding: 24px 0px;
  height: 100%;
  border: solid;
`;

const NoActivePlanWrapper = Styled.div`
  background: lightgray;
  padding: 24px;
  height: 100%;
  border: solid;
`;

const TitleWrapper = Styled.div`
  border-bottom: solid;
  margin-bottom: 24px;
`;

const CalendarWrapper = Styled.div`
  height: 80vh;

  @media (max-width: 480px) {
    height: 100vh;
  }
`;

class PlanEventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStartDate: moment()
        .startOf('month')
        .toDate(),
    };

    this.changeRange = this.changeRange.bind(this);
    this.navigate = this.navigate.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.selectEventAdmin = this.selectEventAdmin.bind(this);
    this.selectEventClient = this.selectEventClient.bind(this);
  }

  componentWillMount() {
    const {
      getPlanEventsByClientId,
      getActivePlansByClientId,
      match,
      clientId,
    } = this.props;
    getPlanEventsByClientId({
      clientId: clientId || match.params.clientId,
      startDate: moment()
        .startOf('month')
        .toDate(),
      endDate: moment()
        .endOf('month')
        .toDate(),
    });
    getActivePlansByClientId({ clientId: clientId || match.params.clientId });
  }

  componentWillReceiveProps(nextProps) {
    const { deletePlanEventSuccess, deletePlanEventError } = this.props;
    if (
      deletePlanEventSuccess !== nextProps.deletePlanEventSuccess &&
      nextProps.deletePlanEventSuccess
    ) {
      this.notifyDeleteSuccess();
    }
    if (
      deletePlanEventError !== nextProps.deletePlanEventError &&
      nextProps.deletePlanEventError
    ) {
      this.notifyDeleteError();
    }

    const { addPlanEventSuccess, addPlanEventError } = this.props;
    if (
      addPlanEventSuccess !== nextProps.addPlanEventSuccess &&
      nextProps.addPlanEventSuccess
    ) {
      this.showSuccess();
    }
    if (
      addPlanEventError !== nextProps.addPlanEventError &&
      nextProps.addPlanEventError
    ) {
      this.showError(nextProps.addPlanEventError);
    }
  }

  showSuccess() {
    const { intl } = this.props;
    Swal.fire({
      title: intl.formatMessage(messages.action.success),
      type: 'success',
      confirmButtonText: intl.formatMessage(messages.action.accept),
    });
  }

  showError(addPlanEventError = null) {
    const { intl } = this.props;
    let message = intl.formatMessage(messages.error.happened);
    if (
      addPlanEventError &&
      addPlanEventError.code === 'invalid/daily-limit-exceed'
    ) {
      message = intl.formatMessage(messages.error.exceedDailyLimit);
    } else if (
      addPlanEventError &&
      addPlanEventError.code === 'invalid/no-such-plan'
    ) {
      message = intl.formatMessage(messages.error.noActivePlan);
    }
    Swal.fire({
      title: intl.formatMessage(messages.action.error),
      text: message,
      type: 'error',
      confirmButtonText: intl.formatMessage(messages.action.accept),
    });
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

  navigate(startDate) {
    this.setState({
      currentStartDate: startDate,
    });
  }

  changeRange(range) {
    const { getPlanEventsByClientId, match } = this.props;
    const { currentStartDate } = this.state;
    let sameRange = true;
    let startDate;
    let endDate;
    if (range.start && range.end) {
      sameRange = moment(range.start).isSame(currentStartDate, 'month');
      if (!sameRange) {
        startDate = moment(range.start)
          .startOf('month')
          .toDate();
        endDate = moment(range.end)
          .endOf('month')
          .toDate();
      }
    }
    if (!sameRange) {
      getPlanEventsByClientId({
        clientId: match.params.clientId,
        startDate,
        endDate,
      });
    }
  }

  selectEventAdmin(event) {
    const { intl, deletePlanEvent } = this.props;
    const { id, title, start, addedBy, manuallyAdded, createdAt } = event;
    Swal.fire({
      title,
      html:
        `<p><b>${intl.formatMessage(
          manuallyAdded ? messages.action.createdAt : messages.action.scannedAt,
        )}: </b> ${moment(manuallyAdded ? createdAt : start).format(
          'LLLL',
        )}</p>` +
        `<p><b>${intl.formatMessage(
          manuallyAdded
            ? messages.action.addedManuallyBy
            : messages.action.addedBy,
        )}: </b> ${addedBy}</p>`,
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
          if (confirm.value) {
            deletePlanEvent({ id });
          }
        });
      }
    });
  }

  selectEventClient(event) {
    const { intl } = this.props;
    const { title, start, addedBy, manuallyAdded, createdAt } = event;
    Swal.fire({
      title,
      html:
        `<p><b>${intl.formatMessage(
          manuallyAdded ? messages.action.createdAt : messages.action.scannedAt,
        )}: </b> ${moment(manuallyAdded ? createdAt : start).format(
          'LLLL',
        )}</p>` +
        `<p><b>${intl.formatMessage(
          manuallyAdded
            ? messages.action.addedManuallyBy
            : messages.action.addedBy,
        )}: </b> ${addedBy}</p>`,
      confirmButtonText: intl.formatMessage(messages.action.accept),
    });
  }

  addNewEvent(slot) {
    const { intl, addPlanEvent, activePlans, user } = this.props;
    Swal.fire({
      title: `${intl.formatMessage(messages.action.add)} ${intl.formatMessage(
        messages.model.new,
      )}`,
      showCancelButton: true,
      confirmButtonText: intl.formatMessage(messages.action.add),
      cancelButtonText: intl.formatMessage(messages.action.close),
    }).then(result => {
      if (result.value) {
        if (activePlans && activePlans.data.length > 0) {
          const activePlan = activePlans.data[0];
          const { _id, startDate, endDate } = activePlan;
          if (
            moment(slot.start).isBetween(moment(startDate), moment(endDate))
          ) {
            addPlanEvent({
              planId: _id,
              adminId: user.uid,
              start: slot.start,
              manuallyAdded: true,
            });
          } else {
            Swal.fire({
              html:
                `<p><b>${intl.formatMessage(
                  messages.error.minimum,
                )} </b> ${moment
                  .utc(startDate)
                  .set({ hour: 0, minute: 0, second: 0 })
                  .format('LLLL')}</p>` +
                `<p><b>${intl.formatMessage(
                  messages.error.maximum,
                )} </b> ${moment
                  .utc(endDate)
                  .set({ hour: 23, minute: 59, second: 59 })
                  .format('LLLL')}</p>`,
              type: 'error',
              confirmButtonText: intl.formatMessage(messages.action.accept),
            });
          }
        } else {
          Swal.fire({
            text: intl.formatMessage(messages.error.noActivePlan),
            type: 'error',
            confirmButtonText: intl.formatMessage(messages.action.accept),
          });
        }
      }
    });
  }

  renderActivePlanInfo() {
    const { activePlans } = this.props;
    const { clientName, clientEmail } = activePlans.user;
    if (activePlans && activePlans.data.length > 0) {
      const activePlan = activePlans.data[0];
      const { planTypeName, startDate, endDate, _id } = activePlan;
      return (
        <ActivePlanWrapper>
          <div className="d-flex justify-content-center">
            <h3>{planTypeName}</h3>
          </div>
          <div>
            <div className="d-flex justify-content-center">
              <p>
                <b>
                  <FormattedMessage {...messages.model.client} />:{' '}
                </b>
                {clientName}
              </p>
            </div>
            <div className="text-center">
              <p>
                <b>
                  <FormattedMessage {...messages.model.email} />:{' '}
                </b>
                {clientEmail}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <p>
              <b>
                <FormattedMessage {...messages.model.startDate} />:{' '}
              </b>
              {moment.utc(startDate).format('YYYY-MM-DD')}
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <p>
              <b>
                <FormattedMessage {...messages.model.endDate} />:{' '}
              </b>
              {moment.utc(endDate).format('YYYY-MM-DD')}
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <QRCode value={`plan-${_id}`} />
          </div>
        </ActivePlanWrapper>
      );
    }
    return (
      <NoActivePlanWrapper>
        <div>
          <p>
            <b>
              <FormattedMessage {...messages.model.client} />:{' '}
            </b>
            {clientName}
          </p>
          <p>
            <b>
              <FormattedMessage {...messages.model.email} />:{' '}
            </b>
            {clientEmail}
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <FormattedMessage {...messages.error.noActivePlan} />
        </div>
      </NoActivePlanWrapper>
    );
  }

  render() {
    const { planEvents, loadingPlanEvents, user, planEventsError } = this.props;
    const { currentStartDate } = this.state;
    if (loadingPlanEvents) {
      return <LoadingSpinner />;
    }
    return !planEventsError ? (
      <Container>
        <TitleWrapper className="d-flex justify-content-center">
          <h2>
            <FormattedMessage {...messages.model.mealPlan} />
          </h2>
        </TitleWrapper>
        <Row>
          <Col md={3} xs={12}>
            {this.renderActivePlanInfo()}
          </Col>
          <Col>
            <CalendarWrapper className="d-flex justify-content-center">
              <BigCalendar
                style={{ width: '100%', marginBottom: '10%' }}
                localizer={localizer}
                events={planEvents}
                defaultDate={currentStartDate}
                startAccessor="start"
                endAccessor="end"
                onRangeChange={this.changeRange}
                onNavigate={this.navigate}
                onSelectEvent={
                  user.profile.roles.includes('admin')
                    ? this.selectEventAdmin
                    : this.selectEventClient
                }
                views={['month', 'agenda']}
                onSelectSlot={this.addNewEvent}
                selectable={user.profile.roles.includes('admin')}
              />
            </CalendarWrapper>
          </Col>
        </Row>
      </Container>
    ) : (
      <h1>Error 404! Not found</h1>
    );
  }
}

PlanEventsPage.propTypes = {
  clientId: PropTypes.string,
  planEvents: PropTypes.arrayOf(PropTypes.object),
  getPlanEventsByClientId: PropTypes.func,
  deletePlanEvent: PropTypes.func,
  loadingPlanEvents: PropTypes.bool,
  user: PropTypes.object,
  deletePlanEventSuccess: PropTypes.bool,
  deletePlanEventError: PropTypes.object,
  planEventsError: PropTypes.object,
  addPlanEvent: PropTypes.func,
  addPlanEventSuccess: PropTypes.bool,
  addPlanEventError: PropTypes.object,

  getActivePlansByClientId: PropTypes.func.isRequired,
  activePlans: PropTypes.object,

  intl: intlShape.isRequired,
  match: PropTypes.object,
};

const mapDispatchToProps = {
  addPlanEvent: addPlanEventRequest,
  getPlanEventsByClientId: getPlanEventsByClientIdRequest,
  getActivePlansByClientId: getActivePlansByClientIdRequest,
  deletePlanEvent: deletePlanEventRequest,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loadingPlanEvents: makeSelectLoadingPlanEvents(),
  planEvents: makeSelectPlanEvents(),
  planEventsError: makeSelectPlanEventsError(),
  deletePlanEventSuccess: makeSelectDeletePlanEventSuccess(),
  deletePlanEventError: makeSelectDeletePlanEventError(),
  addPlanEventSuccess: makeSelectAddPlanEventSuccess(),
  addPlanEventError: makeSelectAddPlanEventError(),

  activePlans: makeSelectPlans(),
  loadingPlans: makeSelectLoadingPlans(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withPlanEventReducer = injectReducer({
  key: 'PlanEvent',
  reducer: planEventReducer,
});
const withPlanEventSaga = injectSaga({ key: 'PlanEvent', saga: planEventSaga });

const withPlanReducer = injectReducer({
  key: 'Plan',
  reducer: planReducer,
});
const withPlanSaga = injectSaga({ key: 'Plan', saga: planSaga });

export default withRouter(
  compose(
    withPlanEventReducer,
    withPlanEventSaga,
    withPlanReducer,
    withPlanSaga,
    withConnect,
  )(injectIntl(PlanEventsPage)),
);
