import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import DataTable from '../../components/DataTable';

import './GpsRefinerContainer.css';

@observer
class DetailCellRenderer extends Component {
  render() {
    console.log('DetailCellRenderer render');
    const { data } = this.props;
    return (
      <div className="DetailCellRenderer">
        { JSON.stringify(data) }
      </div>
    );
  }
}

const columns = [
  {
    field: 'id',
    headerName: 'id',
    editable: false,
    cellRenderer: 'agGroupCellRenderer'
  },
  { 
    field: 'merchant', 
    headerName: 'merchant'
  },
  { 
    field: 'store', 
    headerName: 'store' 
  },
  { 
    field: 'address', 
    headerName: 'address' 
  },
  { 
    field: 'latitude', 
    headerName: 'latitude',
    cellClass: params => {
      return Number(params.value) ? null : 'error';
    }
  },
  { 
    field: 'longitude', 
    headerName: 'longitude',
    cellClass: params => {
      return Number(params.value) ? null : 'error';
    }
  },
];

const gridOptions = {
  masterDetail: true,
  detailCellRenderer: 'myDetailCellRenderer',
  frameworkComponents: { myDetailCellRenderer: DetailCellRenderer }
};


@inject('DataTableStore')
@observer
class GpsRefinerContainer extends Component {
  render() {
    console.log('GpsRefinerContainer render');
    const { rows } = this.props.DataTableStore;
    return (
      <div className="GpsRefinerContainer">
        <DataTable 
          columns={columns}
          rows={rows}
          gridOptions={gridOptions} 
        />
      </div>
    );
  }
}

export default GpsRefinerContainer;
