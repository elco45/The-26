import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import Swal from 'sweetalert2';
import QrReader from 'react-qr-reader'; // comment everything in node_modules\webrtc-adapter\src\js\adapter_core5.js
import Measure from 'react-measure';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { addPlanEventRequest } from '../PlanEventsPage/actions';
import { makeSelectCurrentUser } from '../App/selectors';
import {
  makeSelectLoadingSelectedPlanEvent,
  makeSelectAddPlanEventSuccess,
  makeSelectAddPlanEventError,
  makeSelectPlanEventClientId,
} from '../PlanEventsPage/selectors';

import messages from './messages';

import planEventReducer from '../PlanEventsPage/reducer';
import planEventSaga from '../PlanEventsPage/saga';

class QrScannerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: {
        width: -1,
        height: -1,
      },
      errorSwalIsOpened: false,
    };

    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { addPlanEventSuccess, addPlanEventError } = this.props;
    if (
      addPlanEventSuccess !== nextProps.addPlanEventSuccess &&
      nextProps.addPlanEventSuccess
    ) {
      this.showSuccess(nextProps.planEventClientId);
    }
    if (
      addPlanEventError !== nextProps.addPlanEventError &&
      nextProps.addPlanEventError
    ) {
      this.showError(nextProps.addPlanEventError);
    }
  }

  showSuccess(planEventClientId) {
    const { intl, history } = this.props;
    Swal.fire({
      title: intl.formatMessage(messages.action.success),
      type: 'success',
      confirmButtonText: intl.formatMessage(messages.action.accept),
    });
    history.push(`/calendar/${planEventClientId}`);
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
      message = intl.formatMessage(messages.error.invalidQr);
    }
    Swal.fire({
      title: intl.formatMessage(messages.action.error),
      text: message,
      type: 'error',
      confirmButtonText: intl.formatMessage(messages.action.accept),
    }).then(result => {
      if (result.value) {
        this.setState({
          errorSwalIsOpened: false,
        });
      }
    });
  }

  handleScan(data) {
    const { addPlanEvent, user, loadingSelectedPlan } = this.props;
    const { errorSwalIsOpened } = this.state;
    if (data && !errorSwalIsOpened) {
      if (data.includes('plan-') && !loadingSelectedPlan) {
        const planId = data.replace('plan-', '');
        addPlanEvent({
          planId,
          adminId: user.uid,
        });
      } else {
        this.setState({
          errorSwalIsOpened: true,
        });
        this.showError({ code: 'invalid/no-such-plan' });
      }
    }
  }

  handleError() {
    const { intl } = this.props;
    Swal.fire({
      title: intl.formatMessage(messages.action.error),
      text: intl.formatMessage(messages.error.enableCamera),
      type: 'error',
      confirmButtonText: intl.formatMessage(messages.action.accept),
    });
  }

  render() {
    const { width } = this.state.dimensions;

    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <Container ref={measureRef}>
            <div className="d-flex justify-content-center">
              <QrReader
                delay={1000}
                onError={data => this.handleError(data)}
                onScan={data => this.handleScan(data)}
                style={{ width: width < 768 ? '100%' : '40%' }}
              />
            </div>
          </Container>
        )}
      </Measure>
    );
  }
}

QrScannerPage.propTypes = {
  user: PropTypes.object,
  loadingSelectedPlan: PropTypes.bool,

  addPlanEvent: PropTypes.func,
  addPlanEventSuccess: PropTypes.bool,
  addPlanEventError: PropTypes.object,

  planEventClientId: PropTypes.string,

  intl: intlShape.isRequired,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  addPlanEvent: addPlanEventRequest,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
  loadingSelectedPlan: makeSelectLoadingSelectedPlanEvent(),
  addPlanEventSuccess: makeSelectAddPlanEventSuccess(),
  addPlanEventError: makeSelectAddPlanEventError(),
  planEventClientId: makeSelectPlanEventClientId(),
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
  )(injectIntl(QrScannerPage)),
);
