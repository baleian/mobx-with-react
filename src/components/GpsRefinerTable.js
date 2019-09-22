import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const columns = [
  { dataField: 'id', text: 'ID' },
  { dataField: 'merchant', text: 'Merchant' },
  { dataField: 'store', text: 'Store' },
  { dataField: 'address', text: 'Address' },
  { dataField: 'latitude', text: 'Latitude' },
  { dataField: 'longitude', text: 'Longitude' },
];

const cellEdit = cellEditFactory({
  mode: 'click',
  blurToSave: true
});

const DebugLine = ({data, merchant}) => {
  return <div key={data.id}>{JSON.stringify(data)}{merchant}</div>;
};

@inject('RefineDataStore')
@observer
class GpsRefinerTable extends Component {
  render() {
    const { datas } = this.props.RefineDataStore;

    return (
      <div>
        <h1>GPS Refiner</h1>
        <BootstrapTable 
          keyField="id" 
          columns={columns}
          data={datas}
          bootstrap4
          cellEdit={cellEdit}
        />
        { datas.map(data => <DebugLine data={data} merchant={data.merchant} />) }
      </div>
    );
  }
}

export default GpsRefinerTable;
