/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Container } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import moment from 'moment/moment';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getActivePlansByClientIdRequest } from '../PlansPage/actions';
import {
  makeSelectPlans,
  makeSelectLoadingPlans,
} from '../PlansPage/selectors';

import reducer from '../PlansPage/reducer';
import saga from '../PlansPage/saga';

import messages from './messages';

class ClientHomePage extends React.Component {
  componentWillMount() {
    const { getActivePlansByClientId, clientId } = this.props;
    getActivePlansByClientId({ clientId });
  }

  render() {
    const { activePlans, loadingPlans } = this.props;
    if (loadingPlans) {
      return 'Loading';
    }
    return activePlans && activePlans.length > 0 ? (
      <Container style={{ marginTop: '4%' }}>
        <div className="d-flex justify-content-center">
          <h3>
            <FormattedMessage {...messages.model.mealPlan} />
          </h3>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            <b>
              <FormattedMessage {...messages.model.startDate} />:{' '}
            </b>
            {moment.utc(activePlans[0].startDate).format('YYYY-MM-DD')}
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <p>
            <b>
              <FormattedMessage {...messages.model.endDate} />:{' '}
            </b>
            {moment.utc(activePlans[0].endDate).format('YYYY-MM-DD')}
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <QRCode value={`plan-${activePlans[0]._id}`} />
        </div>
      </Container>
    ) : (
      <h2>
        <FormattedMessage {...messages.error.noActivePlan} />
      </h2>
    );
  }
}

ClientHomePage.propTypes = {
  clientId: PropTypes.string.isRequired,
  loadingPlans: PropTypes.bool,
  getActivePlansByClientId: PropTypes.func.isRequired,
  activePlans: PropTypes.arrayOf(PropTypes.object),
  intl: intlShape.isRequired,
};

const mapDispatchToProps = {
  getActivePlansByClientId: getActivePlansByClientIdRequest,
};

const mapStateToProps = createStructuredSelector({
  activePlans: makeSelectPlans(),
  loadingPlans: makeSelectLoadingPlans(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'Plan', reducer });
const withSaga = injectSaga({ key: 'Plan', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(injectIntl(ClientHomePage)),
);
