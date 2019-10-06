import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import DataTable from '../../DataTable';
import './DataTableContainer.css';


function getMainMenuItems(params) {
  const { columns, addColumn, renameColumn, deleteColumn } = params.context.DataStore;
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
        const before = params.column.getColDef().field;
        const after = prompt(`Rename column ${before} to`);
        if (columns.indexOf(after) === -1) {
          return renameColumn(before, after);
        }
        if (window.confirm(`${after} column is already exist.\nDo you really want to change the column name?`)) {
          renameColumn(before, after);
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
        const column = params.column.getColDef().field;
        deleteColumn(column);
      }
    },
    'separator', 
    ...params.defaultItems
  ];
};


@inject('DataStore')
@observer
class DataTableContainer extends Component {
  gridApi = null;
  gridColumnApi = null;

  onGridReady = ({ api, columnApi }) => {
    this.gridApi = api;
    this.gridColumnApi = columnApi;
  };

  componentWillUnmount() {
    const columnState = this.gridColumnApi.getColumnState();
    const columns = this.gridColumnApi.getAllColumns().reduce((prev, curr) => {
      prev[curr.getColId()] = curr.getColDef().field;
      return prev;
    }, {});
    const columnNames = columnState.map(c => columns[c.colId]).filter(c => c !== '_');
    this.props.DataStore.setColumnOrder(columnNames);
  };

  render() {
    const { columns, rows } = this.props.DataStore;
    const columnDefs = columns.map(c => ({ field: c, headerName: c }));
    return (
      <div className="DataTableContainer">
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
