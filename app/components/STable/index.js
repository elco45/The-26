import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { injectIntl, intlShape } from 'react-intl';

class STable extends React.Component {
  getTable() {
    const { columns, data, additionalProps, pageSize, intl } = this.props;
    const newColumns = [];
    columns.forEach(column => {
      const {
        headerText,
        headerStyle,
        accessor,
        cell,
        filterable,
        sortable,
        style,
      } = column;
      newColumns.push({
        Header: intl.formatMessage(headerText),
        accessor,
        Cell: cell,
        filterable,
        sortable,
        style,
        headerStyle: {
          background: '#212529',
          color: '#fff',
          ...headerStyle,
        },
      });
    });
    return (
      <ReactTable
        data={data}
        columns={newColumns}
        noDataText={intl.formatMessage({ id: 'app.model.empty' })}
        pageSize={pageSize}
        {...additionalProps}
      />
    );
  }

  render() {
    return this.getTable();
  }
}

STable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      headerText: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.string,
      ]),
      headerStyle: PropTypes.object,
      filterable: PropTypes.bool,
      sortable: PropTypes.bool,
      accessor: PropTypes.string,
      cell: PropTypes.func,
      style: PropTypes.object,
    }),
  ),
  additionalProps: PropTypes.object,
  pageSize: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  intl: intlShape.isRequired,
};

STable.defaultProps = {
  additionalProps: {
    showPagination: false,
    defaultPageSize: 1,
  },
  pageSize: 1,
};

export default injectIntl(STable);
