import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import DataTable, { getDefaultContextMenuItems } from '../../DataTable';
import './StoreRefinerContainer.css';


const columnDefs = [
  { 
    field: 'storeId', headerName: 'storeId',
  },
  { 
    field: 'brandId', headerName: 'brandId',
  },
  { 
    field: 'merchant', headerName: 'merchant',
  },
  { 
    field: 'store', headerName: 'store',
  },
  { 
    field: 'address', headerName: 'address',
    filter: 'agTextColumnFilter'
  },
  { 
    field: 'latitude', headerName: 'latitude',
  },
  { 
    field: 'longitude', headerName: 'longitude',
  },
];

function getContextMenuItems(params) {
  const defaultMenuItems = getDefaultContextMenuItems(params);
  let columnName = null;
  if (params.column) {
    columnName = params.column.getColDef().field;
  }
  let menuItems = null;
  switch (columnName) {
    case 'storeId':
      menuItems = [
        {
          name: 'New storeId',
          action: () => {

          }
        },
        {
          name: 'New storeId Selected Rows',
          action: () => {

          }
        },
      ];
      break;
    default:
      break;
  }
  if (!menuItems) {
    return defaultMenuItems;
  }
  return [...menuItems, 'separator', ...defaultMenuItems];
}

@inject('DataStore')
@observer
class StoreRefinerContainer extends Component {
  constructor(props) {
    super(props);
    const { setColumnsValue } = props.DataStore;
    setColumnsValue(columnDefs.map(c => c.field));
  }

  render() {
    const { rows } = this.props.DataStore;
    return (
      <div className="StoreRefinerContainer">
        <DataTable 
          columnDefs={columnDefs}
          rowData={rows}
          gridOptions={{
            getContextMenuItems,
            onGridReady: this.onGridReady,
          }}
        />
      </div>
    );
  }
}

export default StoreRefinerContainer;
