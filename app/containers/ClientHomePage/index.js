import React from 'react';
import PropTypes from 'prop-types';
import PlanEventsPage from '../PlanEventsPage';

const ClientHomePage = ({ clientId }) => <PlanEventsPage clientId={clientId} />;

ClientHomePage.propTypes = {
  clientId: PropTypes.string.isRequired,
};

export default ClientHomePage;
