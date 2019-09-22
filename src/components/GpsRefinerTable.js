import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const defaultColDef = {
  sortable: true,
  resizable: true,
  editable: true,
  resizable: true,
  sortingOrder: ['asc', 'desc', null],
};

const columnDefs = [
  { 
    field: 'id', 
    headerName: 'ID', 
    editable: false, 
    lockPosition: true, 
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    checkboxSelection: true,
    cellStyle: ({ value }) => {
      return {
        backgroundColor: value ? null : '#FF000088'
      };
    }
  },
  { 
    field: 'merchant', 
    headerName: 'Merchant',
    cellStyle: ({ value }) => {
      return {
        backgroundColor: value ? null : '#FF000088'
      };
    }
  },
  { 
    field: 'store', 
    headerName: 'Store',
    cellStyle: ({ value }) => {
      return {
        backgroundColor: value ? null : '#FF880088'
      };
    }
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

const gridOptions = {
  defaultColDef,
  columnDefs,
  editType: 'fullRow',
  multiSortKey: 'ctrl',
  domLayout: 'autoHeight',
  rowSelection: 'multiple',
  singleClickEdit: true,
  // suppressRowClickSelection: true,
  stopEditingWhenGridLosesFocus: true,
  sideBar: true,
};

@observer
class DebugLine extends Component {
  render() {
    const { data } = this.props;
    return <div>{data.id}, {data.merchant}, {data.store}, {data.address}, {data.latitude}, {data.longitude}</div>;
  }
}

@inject('RefineDataStore')
@observer
class GpsRefinerTable extends Component {

  onGridReady = ({ api, columnApi }) => {
    this.gridApi = api;
    this.gridColumnApi = columnApi;
  };

  render() {
    const { datas } = this.props.RefineDataStore;

    return (
      <div>
        <h1>GPS Refiner</h1>
        <div className="ag-theme-balham" style={{height: '500px'}}>
          <AgGridReact
            {...gridOptions}
            rowData={datas}
            onGridReady={this.onGridReady}
          />
        </div>
        { datas.map(data => <DebugLine key={data.id} data={data} />) }
      </div>
    );
  }
}

export default GpsRefinerTable;
