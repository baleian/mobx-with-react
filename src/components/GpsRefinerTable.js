import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import DataTable from './DataTable';

const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    editable: false, 
    lockPosition: true, 
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
  },
  { 
    field: 'merchant', 
    headerName: 'Merchant',
  },
  { 
    field: 'store', 
    headerName: 'Store',
  },
  { 
    field: 'address', 
    headerName: 'Address',
    cellStyle: ({ value }) => {
      return {
        backgroundColor: value ? null : '#FF000088'
      };
    }
  },
  { 
    field: 'latitude', 
    headerName: 'Latitude', 
    cellStyle: ({ value }) => {
      return {
        backgroundColor: Number(value) ? null : '#FF000088'
      };
    }
  },
  { 
    field: 'longitude', 
    headerName: 'Longitude', 
    cellStyle: ({ value }) => {
      return {
        backgroundColor: Number(value) ? null : '#FF000088'
      };
    }
  },
];

@inject('DataStore')
@observer
class GpsRefinerTable extends Component {
  render() {
    console.log('render GpsRefinerTable');
    const { rows } = this.props.DataStore;
    return (
      <DataTable
        columns={columns}
        rows={rows}
      />
    );
  }
}

export default GpsRefinerTable;
