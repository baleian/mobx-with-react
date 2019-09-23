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

@observer
class DebugLine extends Component {
  render() {
    const { data } = this.props;
    return <div>{JSON.stringify(data)}</div>;
  }
}

@inject('RefineDataStore')
@observer
class GpsRefinerTable extends Component {
  onGridReady = ({ api, columnApi }) => {
    this.gridApi = api;
    this.gridColumnApi = columnApi;
    this.gridColumnApi.autoSizeColumns(columns.map(c => c.field));
  };

  handleDataLoad = () => {
    const { loadFromFile } = this.props.RefineDataStore;
    const that = this;
    loadFromFile().then((datas) => {
      that.gridApi.setRowData(datas);
      that.gridColumnApi.autoSizeColumns(columns.map(c => c.field));
    });
  };

  handleGetAddress = () => {
    const { getGpsByAddressFromWeb } = this.props.RefineDataStore;
    let nodes = this.gridApi.getSelectedNodes();
    nodes.forEach(n => {
      getGpsByAddressFromWeb(n.data)
        .then(d => n.setData(d));
    });
  };

  render() {
    const { datas, loadFromFile } = this.props.RefineDataStore;
    return (
      <div>
        <h1>GPS Refiner</h1>
        <button onClick={this.handleDataLoad}>loadData</button>
        <button onClick={this.handleGetAddress}>getGpsByAddressFromWeb</button>
        <DataTable
          columns={columns}
          datas={[]}
          onGridReady={this.onGridReady}
        />
        { datas.map(data => <DebugLine key={data.id} data={data} />) }
      </div>
    );
  }
}

export default GpsRefinerTable;
