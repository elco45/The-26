import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Swal from 'sweetalert2';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getPlanEventsByClientIdRequest } from './actions';
import { makeSelectCurrentUser } from '../App/selectors';
import {
  makeSelectLoadingPlanEvents,
  makeSelectPlanEvents,
  makeSelectPlanEventsError,
} from './selectors';

import planEventReducer from './reducer';
import planEventSaga from './saga';
import messages from './messages';

import LoadingSpinner from '../../components/LoadingSpinner';
const localizer = BigCalendar.momentLocalizer(moment);

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
    this.selectEventAdmin = this.selectEventAdmin.bind(this);
    this.selectEventClient = this.selectEventClient.bind(this);
  }

  componentWillMount() {
    const { getPlanEventsByClientId, match } = this.props;
    getPlanEventsByClientId({
      clientId: match.params.clientId,
      startDate: moment()
        .startOf('month')
        .toDate(),
      endDate: moment()
        .endOf('month')
        .toDate(),
    });
  }

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
    const { intl } = this.props;
    const { title, start } = event;
    Swal.fire({
      title,
      html: `<p><b>${intl.formatMessage(
        messages.action.scannedAt,
      )}: </b> ${moment(start).format('LLLL')}</p>`,
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
            // delete
          }
        });
      }
    });
  }

  selectEventClient(event) {
    const { intl } = this.props;
    const { title, start } = event;
    Swal.fire({
      title,
      html: `<p><b>${intl.formatMessage(
        messages.action.scannedAt,
      )}: </b> ${moment(start).format('LLLL')}</p>`,
      confirmButtonText: intl.formatMessage(messages.action.accept),
    });
  }

  render() {
    const { planEvents, loadingPlanEvents, user } = this.props;
    const { currentStartDate } = this.state;
    return (
      <div>
        <div className="d-flex justify-content-center">
          <h3>
            <FormattedMessage {...messages.model.mealPlan} />
          </h3>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ height: '90vh' }}
        >
          {!loadingPlanEvents ? (
            <BigCalendar
              style={{ width: '80%' }}
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
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    );
  }
}

PlanEventsPage.propTypes = {
  planEvents: PropTypes.arrayOf(PropTypes.object),
  getPlanEventsByClientId: PropTypes.func,
  loadingPlanEvents: PropTypes.bool,
  user: PropTypes.object,

  intl: intlShape.isRequired,
  match: PropTypes.object,
};

const mapDispatchToProps = {
  getPlanEventsByClientId: getPlanEventsByClientIdRequest,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loadingPlanEvents: makeSelectLoadingPlanEvents(),
  planEvents: makeSelectPlanEvents(),
  planEventsError: makeSelectPlanEventsError(),
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

export default withRouter(
  compose(
    withPlanEventReducer,
    withPlanEventSaga,
    withConnect,
  )(injectIntl(PlanEventsPage)),
);
