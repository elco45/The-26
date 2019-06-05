import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { toast } from 'react-toastify';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import SForm from '../../components/SForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import NotFoundPage from '../NotFoundPage';

import {
  getPlanTypeRequest,
  updatePlanTypeRequest,
} from '../PlanTypesPage/actions';
import {
  makeSelectSelectedPlanType,
  makeSelectLoadingSelectedPlanType,
  makeSelectSelectedPlanTypeError,
  makeSelectUpdatePlanTypeSuccess,
} from '../PlanTypesPage/selectors';

import reducer from '../PlanTypesPage/reducer';
import saga from '../PlanTypesPage/saga';

import messages from './messages';

class PlanTypePage extends React.Component {
  componentWillMount() {
    const { getPlanType, match } = this.props;
    getPlanType({ id: match.params.id });
  }

  componentWillReceiveProps(nextProps) {
    const { updatePlanTypeSuccess } = nextProps;
    if (
      this.props.updatePlanTypeSuccess !== updatePlanTypeSuccess &&
      updatePlanTypeSuccess
    ) {
      this.notifyUpdateSuccess();
    }
  }

  notifyUpdateSuccess = () => {
    const { intl } = this.props;
    return toast.success(
      `${intl.formatMessage(messages.action.update)} ${intl.formatMessage(
        messages.action.success,
      )}`,
    );
  };

  renderPlanTypeEditForm() {
    const {
      selectedPlanType,
      loadingSelectedPlanType,
      updatePlanType,
      match,
    } = this.props;
    const schema = [
      {
        name: 'name',
      },
      {
        name: 'description',
        uiWidget: 'textarea',
      },
      {
        name: 'price',
      },
      {
        name: 'durationDays',
      },
      {
        name: 'dailyFoodCount',
      },
    ];
    const {
      name,
      description,
      price,
      durationDays,
      dailyFoodCount,
    } = selectedPlanType;
    return (
      <SForm
        idPrefix="editP"
        submitFunc={updatePlanType}
        loading={loadingSelectedPlanType}
        showUiLabels
        showPlaceHolder={false}
        requiredSchema={['name', 'price', 'durationDays', 'dailyFoodCount']}
        schema={schema}
        submitBtnText="action.edit"
        defaultValues={{
          name,
          description,
          price,
          durationDays,
          dailyFoodCount,
        }}
        hiddenFormData={{
          id: match.params.id,
        }}
      />
    );
  }

  render() {
    const {
      selectedPlanType,
      loadingSelectedPlanType,
      selectedPlanTypeError,
    } = this.props;
    return !loadingSelectedPlanType ? (
      <div>
        {!selectedPlanTypeError && selectedPlanType ? (
          <Row>
            <Col>
              <h2>
                <FormattedMessage {...messages.model.planType} />
              </h2>
              {this.renderPlanTypeEditForm()}
            </Col>
          </Row>
        ) : (
          <NotFoundPage />
        )}
      </div>
    ) : (
      <LoadingSpinner />
    );
  }
}

PlanTypePage.propTypes = {
  loadingSelectedPlanType: PropTypes.bool,
  selectedPlanType: PropTypes.object,
  selectedPlanTypeError: PropTypes.object,
  getPlanType: PropTypes.func,
  updatePlanType: PropTypes.func,
  updatePlanTypeSuccess: PropTypes.bool,
  intl: intlShape.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
};

const mapDispatchToProps = {
  getPlanType: getPlanTypeRequest,
  updatePlanType: updatePlanTypeRequest,
};

const mapStateToProps = createStructuredSelector({
  loadingSelectedPlanType: makeSelectLoadingSelectedPlanType(),
  selectedPlanType: makeSelectSelectedPlanType(),
  selectedPlanTypeError: makeSelectSelectedPlanTypeError(),
  updatePlanTypeSuccess: makeSelectUpdatePlanTypeSuccess(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'PlanType', reducer });
const withSaga = injectSaga({ key: 'PlanType', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(injectIntl(PlanTypePage)),
);
