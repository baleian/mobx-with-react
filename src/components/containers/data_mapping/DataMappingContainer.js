import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import DataTable from '../../DataTable';
import './DataMappingContainer.css';


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
  }
];

function getMainMenuItems(params) {
  const { columns, addColumn, renameColumn, deleteColumn } = params.context.DataStore;
  const column = params.column.getColDef().field;
  return [
    {
      name: 'Add Column',
      action: () => {
        const columnName = prompt('Add column');
        addColumn(columnName);
      }
    },
    {
      name: 'Rename Column',
      action: () => {
        const after = prompt(`Rename column ${column} to`);
        if (columns.indexOf(after) === -1) {
          return renameColumn(column, after);
        }
        if (window.confirm(`${after} column is already exist.\nDo you really want to change the column name?`)) {
          renameColumn(column, after);
        }
      }
    },
    {
      name: 'Hide Column',
      action: () => {
        params.columnApi.setColumnVisible(params.column.getColId(), false);
      }
    },
    {
      name: 'Delete Column',
      action: () => {
        deleteColumn(column);
      }
    },
    'separator',
    {
      name: 'Rename Column to merchant',
      action: () => renameColumn(column, 'merchant')
    },
    {
      name: 'Rename Column to store',
      action: () => renameColumn(column, 'store')
    },
    {
      name: 'Rename Column to address',
      action: () => renameColumn(column, 'address')
    },
    'separator',
    ...params.defaultItems
  ];
};


@inject('DataStore')
@observer
class DataTableContainer extends Component {
  render() {
    const { columns, rows } = this.props.DataStore;
    const columnDefs = columns.map(c => ({ field: c, headerName: c }));
    return (
      <div className="DataMappingContainer">
        <DataTable 
          columnDefs={columnDefs}
          rowData={rows}
          gridOptions={{
            getMainMenuItems,
            onGridReady: this.onGridReady
          }}
        />
      </div>
    );
  }
}

export default DataTableContainer;