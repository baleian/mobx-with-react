import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import { toJS } from 'mobx';

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
  history = [];
  redos = [];
  preventRedoBuffer = false;

  save = () => {
    if (!this.preventRedoBuffer) this.redos = [];
    this.preventRedoBuffer = false;
    let { rows } = this.props.DataTableStore;
    if (rows.length === 0) return;
    rows = toJS(rows);
    this.history.push(rows);
    if (this.history.length > 20) {
      this.history.shift();
    }
  }
  
  undo = () => {
    if (this.history.length >= 2) {
      this.redos.push(this.history.pop());
      const rows = this.history.pop();
      const { setRows } = this.props.DataTableStore;
      this.preventRedoBuffer = true;
      setRows(rows);
    }
  };

  redo = () => {
    if (this.redos.length > 0) {
      const rows = this.redos.pop();
      const { setRows } = this.props.DataTableStore;
      this.preventRedoBuffer = true;
      setRows(rows);
    }
  };

  onGridReady = ({ api }) => {
    this.gridApi = api;
  };

  onRowDataChanged = () => {
    this.save();
  }

  onCellValueChanged = ({ oldValue, newValue }) => {
    if (oldValue !== newValue) {
      this.save();
    }
  };

  onPasteEnd = () => {
    this.save();
  };

  suppressKeyboardEvent = ({ event }) => {
    if (event.ctrlKey) {
      if (event.which === 90) {
        event.preventDefault();
        if (event.shiftKey) { this.redo(); } else { this.undo(); }
      }
      if (event.which === 89) {
        event.preventDefault();
        this.redo();
      }
    }
  };

  // onRowClicked = ({ node }) => {
  //   const { onRowClick } = this.props.DataTableStore;
  //   onRowClick(node.data);
  // };

  render() {
    const { columns, rows, gridOptions } = this.props;
    console.log('DataTable render');
    return (
      <div className="DataTable ag-theme-balham" style={{width: '100%', height: '100%'}}>
        <AgGridReact
          columnDefs={columns}
          rowData={rows}
          {...defaultGridOptions}
          {...gridOptions}
          onGridReady={this.onGridReady}
          onRowDataChanged={this.onRowDataChanged}
          onCellValueChanged={this.onCellValueChanged}
          onPasteStart={this.onPasteStart}
          onPasteEnd={this.onPasteEnd}
          suppressKeyboardEvent={this.suppressKeyboardEvent}
          // onRowClicked={this.onRowClicked}
        />
      </div>
    );
  }
}

export default DataTable;
export { defaultGridOptions };
