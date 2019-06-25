import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import * as moment from 'moment/moment';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import SButton from '../../components/SButton';
import STable from '../../components/STable';

import { addPlanTypeRequest, getPlanTypesRequest } from './actions';
import {
  makeSelectPlanTypes,
  makeSelectAddPlanTypeSuccess,
  makeSelectAddPlanTypeError,
  makeSelectLoadingSelectedPlanType,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import messages from './messages';

class PlantTypesPage extends React.Component {
  constructor(props) {
    super(props);

    this.renderAddButton = this.renderAddButton.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentWillMount() {
    this.props.getPlanTypes();
  }

  renderAddButton() {
    const {
      addPlanTypeSuccess,
      addPlanTypeError,
      addPlanType,
      syncing,
      loadingSelectedPlanType,
    } = this.props;
    const addPlantTypeSchema = [
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

    return (
      <SButton
        showUiLabels
        syncing={syncing}
        loading={loadingSelectedPlanType}
        buttonTextId="app.action.add"
        functionSuccess={addPlanTypeSuccess}
        functionError={addPlanTypeError}
        func={addPlanType}
        validateFunc={this.validateCreateUser}
        modalTitleTextId="app.model.planType"
        modalButtonTextId="action.add"
        requiredSchema={['name', 'price', 'durationDays', 'dailyFoodCount']}
        schema={addPlantTypeSchema}
        defaultValues={{ price: 0, durationDays: 30, dailyFoodCount: 3 }}
      />
    );
  }

  renderTable() {
    const { planTypes, history } = this.props;
    const columns = [
      {
        headerText: messages.model.name,
        accessor: 'name',
      },
      {
        headerText: messages.model.description,
        accessor: 'description',
      },
      {
        headerText: messages.model.price,
        accessor: 'price',
      },
      {
        headerText: messages.model.durationDays,
        accessor: 'durationDays',
      },
      {
        headerText: messages.model.dailyFoodCount,
        accessor: 'dailyFoodCount',
      },
      {
        headerText: messages.model.createdAt,
        accessor: 'createdAt',
        cell: row =>
          moment(row.original.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        headerText: messages.model.updatedAt,
        accessor: 'updatedAt',
        cell: row =>
          moment(row.original.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        headerText: messages.action.edit,
        accessor: '_id',
        filterable: false,
        sortable: false,
        cell: row => (
          <Button
            // eslint-disable-next-line no-underscore-dangle
            onClick={() => history.push(`/plan-type/${row.original._id}`)}
          >
            <i className="fa fa-pencil" />
          </Button>
        ),
      },
    ];
    const additionalProps = {
      keyField: '_id',
      showPagination: false,
      pageSize: planTypes && planTypes.length,
      defaultSorted: [
        {
          id: 'name',
          desc: false,
        },
      ],
    };
    return planTypes ? (
      <STable
        data={planTypes}
        columns={columns}
        additionalProps={additionalProps}
      />
    ) : (
      <div>asdasd</div>
    );
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h2>
              <FormattedMessage {...{ id: 'app.model.planType' }} />
            </h2>
          </Col>
          <Col md="auto">{this.renderAddButton()}</Col>
        </Row>
        <Row>
          <Col>{this.renderTable()}</Col>
        </Row>
      </div>
    );
  }
}

PlantTypesPage.propTypes = {
  addPlanType: PropTypes.func.isRequired,
  addPlanTypeSuccess: PropTypes.bool,
  addPlanTypeError: PropTypes.object,
  planTypes: PropTypes.arrayOf(PropTypes.object),
  syncing: PropTypes.bool,
  loadingSelectedPlanType: PropTypes.bool,
  getPlanTypes: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  history: PropTypes.object,
};

const mapDispatchToProps = {
  addPlanType: addPlanTypeRequest,
  getPlanTypes: getPlanTypesRequest,
};

const mapStateToProps = createStructuredSelector({
  planTypes: makeSelectPlanTypes(),
  addPlanTypeSuccess: makeSelectAddPlanTypeSuccess(),
  addPlanTypeError: makeSelectAddPlanTypeError(),
  loadingSelectedPlanType: makeSelectLoadingSelectedPlanType(),
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
  )(injectIntl(PlantTypesPage)),
);
