import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import { toJS } from 'mobx';

import './DataTable.css';

function getDefaultContextMenuItems(params) {
  if (!params.node) {
    return [ 'export' ];
  }
  return [
    {
      name: params.node.isSelected() ? 'Unselect' : 'Select',
      icon: '<span class="ag-icon ag-icon-tick"></span>',
      action: () => {
        params.node.setSelected(!params.node.isSelected());
      }
    },
    {
      name: 'Delete',
      icon: '<span class="ag-icon ag-icon-cross"></span>',
      action: () => {
        if (window.confirm(`Delete?\n${JSON.stringify(params.node.data)}`)) {
          params.context.DataStore.deleteRow(params.node.data);
        }
      }
    },
    {
      name: 'Delete Selected Rows',
      icon: '<span class="ag-icon ag-icon-cancel"></span>',
      action: () => {
        const rows = params.api.getSelectedRows();
        if (rows.length > 0 && window.confirm(`Delete ${rows.length} rows?`)) {
          params.context.DataStore.deleteRows(rows);
        }
      }
    },
    'separator',
    'export',
  ];
}

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
  deltaRowDataMode: true,
  getRowNodeId: r => r['_id'],
  sideBar: {
    toolPanels: ['columns', 'filters']
  },
  getContextMenuItems: getDefaultContextMenuItems,
  statusBar: {
    statusPanels: [
      { 
        statusPanel: 'agTotalAndFilteredRowCountComponent', 
        align: 'left' 
      }
    ]
  },
};

const idHeader = {
  field: '_id', 
  headerName: '',
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true,
  suppressMenu: true,
  suppressToolPanel: true,
  sortable: false,
  editable: false,
  filter: false,
  lockPosition: true,
};


@inject('DataStore')
@observer
class DataTable extends Component {
  gridApi = null;
  gridColumnApi = null;
  history = [];
  redos = [];
  preventRedoBuffer = false;
  bufferSize = 20;

  save = () => {
    if (!this.preventRedoBuffer) this.redos = [];
    this.preventRedoBuffer = false;
    let { rows } = this.props.DataStore;
    if (rows.length === 0) return;
    rows = toJS(rows);
    this.history.push(rows);
    if (this.history.length > this.bufferSize) {
      this.history.shift();
    }
  }
  
  undo = () => {
    if (this.history.length >= 2) {
      this.redos.push(this.history.pop());
      const rows = this.history.pop();
      const { setRows } = this.props.DataStore;
      this.preventRedoBuffer = true;
      setRows(rows);
      this.gridApi.refreshClientSideRowModel('filter');
    }
  };

  redo = () => {
    if (this.redos.length > 0) {
      const rows = this.redos.pop();
      const { setRows } = this.props.DataStore;
      this.preventRedoBuffer = true;
      setRows(rows);
      this.gridApi.refreshClientSideRowModel('filter');
    }
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const { onGridReady } = this.props.gridOptions;
    if (onGridReady) {
      onGridReady(params);
    }
  };

  onRowDataChanged = ({ columnApi }) => {
    columnApi.autoSizeColumns(columnApi.getAllColumns().map(c => c.getColId()));
    this.save();
  };

  onRowDataUpdated = ({ columnApi }) => {
    columnApi.autoSizeColumns(columnApi.getAllColumns().map(c => c.getColId()));
    this.save();
  };

  onCellValueChanged = params => {
    const { oldValue, newValue } = params;
    if (oldValue !== undefined && oldValue !== newValue) {
      this.save();
    }
  };

  onPasteEnd = () => {
    this.save();
  };

  suppressKeyboardEvent = params => {
    const { event } = params;
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

  render() {
    const { columnDefs, rowData, gridOptions, DataStore } = this.props;
    return (
      <div className="DataTable ag-theme-balham" style={{width: '100%', height: '100%'}}>
        <AgGridReact
          columnDefs={[ idHeader, ...columnDefs ]}
          rowData={rowData}
          {...defaultGridOptions}
          {...gridOptions}
          onGridReady={this.onGridReady}
          onRowDataChanged={this.onRowDataChanged}
          onRowDataUpdated={this.onRowDataUpdated}
          onCellValueChanged={this.onCellValueChanged}
          onPasteStart={this.onPasteStart}
          onPasteEnd={this.onPasteEnd}
          suppressKeyboardEvent={this.suppressKeyboardEvent}
          context={{ DataStore }}
        />
      </div>
    );
  }
}

export default DataTable;
export { getDefaultContextMenuItems };
