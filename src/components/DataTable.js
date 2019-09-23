import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const defaultColDef = {
  sortable: true,
  resizable: true,
  editable: true,
  sortingOrder: ['asc', 'desc', null],
};

const gridOptions = {
  defaultColDef,
  editType: 'fullRow',
  multiSortKey: 'ctrl',
  domLayout: 'autoHeight',
  rowSelection: 'multiple',
  singleClickEdit: true,
  suppressRowClickSelection: true,
  stopEditingWhenGridLosesFocus: true,
};

@observer
class DataTable extends Component {
  render() {
    const { columns, datas, onGridReady } = this.props;
    return (
      <div className="DataTable">
        <div className="ag-theme-balham">
          <AgGridReact
            {...gridOptions}
            columnDefs={columns}
            rowData={datas}
            onRowClicked={() => console.log('row clicked!!')}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    );
  }
}

export default DataTable;
