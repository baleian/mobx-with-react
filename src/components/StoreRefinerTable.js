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
  },
  { 
    field: 'latitude', 
    headerName: 'Latitude', 
  },
  { 
    field: 'longitude', 
    headerName: 'Longitude', 
  },
];

@inject('DataStore')
@observer
class StoreRefinerTable extends Component {
  render() {
    const { rows } = this.props.DataStore;
    return (
      <div>
        <DataTable
          columns={columns}
          rows={rows}
        />
      </div>
    );
  }
}

export default StoreRefinerTable;
