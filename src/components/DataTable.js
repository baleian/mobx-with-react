import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

import './DataTable.css';

const defaultGridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    editable: true,
    filter: true,
    sortingOrder: ['asc', 'desc', null],
  },
  editType: 'fullRow',
  multiSortKey: 'ctrl',
  rowSelection: 'multiple',
  suppressRowClickSelection: true,
  stopEditingWhenGridLosesFocus: true,
  enableRangeSelection: true,
  sideBar: {
    toolPanels: ['columns', 'filters']
  },
  statusBar: {
    statusPanels: [
      { 
        statusPanel: 'agTotalAndFilteredRowCountComponent', 
        align: 'left' 
      }
    ]
  },
};

@inject('DataTableStore')
@observer
class DataTable extends Component {
  render() {
    console.log('DataTable render');
    const { columns, rows, gridOptions } = this.props;
    return (
      <div className="DataTable ag-theme-balham" style={{width: '100%', height: '100%'}}>
        <AgGridReact
          columnDefs={columns}
          rowData={rows}
          {...defaultGridOptions}
          {...gridOptions}
        />
      </div>
    );
  }
}

export default DataTable;
export { defaultGridOptions };
