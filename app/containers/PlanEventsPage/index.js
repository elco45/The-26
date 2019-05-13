import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

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

const localizer = BigCalendar.momentLocalizer(moment);

class PlanEventsPage extends React.Component {
  componentWillMount() {
    const { getPlanEventsByClientId, match } = this.props;
    getPlanEventsByClientId({ clientId: match.params.clientId });
  }

  render() {
    const { planEvents } = this.props;
    return (
      <Container>
        <div
          className="d-flex justify-content-center"
          style={{ height: '100vh' }}
        >
          <BigCalendar
            localizer={localizer}
            events={planEvents}
            startAccessor="start"
            endAccessor="end"
          />
        </div>
      </Container>
    );
  }
}

PlanEventsPage.propTypes = {
  planEvents: PropTypes.arrayOf(PropTypes.object),
  getPlanEventsByClientId: PropTypes.func,

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
