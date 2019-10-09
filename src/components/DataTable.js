import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { AgGridReact } from 'ag-grid-react';
import DataTransaction from '../stores/DataTransaction';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import { toJS, reaction } from 'mobx';

import './DataTable.css';


const rowNumHeader = {
  field: '_rownum',
  headerName: 'NO.',
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true,
  suppressMenu: true,
  suppressToolPanel: true,
  sortable: false,
  editable: false,
  filter: false,
  lockPosition: true,
  pinned: 'left',
  lockPinned: true,
  width: 100,
  maxWidth: 100,
};

const defaultGridOptions = {
  defaultColDef: {
    sortable: true,
    resizable: true,
    editable: true,
    filter: true,
    filterParams: {
      clearButton: true,
      applyButton: true,
    },
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
  deltaRowDataMode: true,
  getRowNodeId,
  getMainMenuItems,
  getContextMenuItems,
};

function getRowNodeId(row) {
  return row['_id'];
}

function getMainMenuItems(params) {
  const { isColumn, addColumn, renameColumn, deleteColumn } = params.context.props.DataStore;
  const { column } = params;
  params.defaultItems = [
    {
      name: 'Add Column',
      action: () => {
        const columnName = prompt('Add column');
        if (columnName) {
          addColumn(columnName);
        }
      }
    },
    {
      name: 'Delete Column',
      action: () => {
        deleteColumn(column.getColDef().field);
      }
    },
    {
      name: 'Hide Column',
      action: () => {
        params.columnApi.setColumnVisible(column.getColId(), false);
      }
    },
    {
      name: 'Rename Column',
      action: () => {
        const before = column.getColDef().field;
        const after = prompt(`Rename column ${before} to`);
        if (!isColumn(after)) {
          renameColumn(before, after);
        }
        else if (window.confirm(`${after} column is already exist.\nDo you really want to change the column name?`)) {
          renameColumn(before, after);
        }
      }
    },
    'separator',
    ...params.defaultItems
  ];
  return params.defaultItems;
}

function getContextMenuItems(params) {
  params.defaultItems = [ 'export' ];
  if (params.node) {
    const { addRows, deleteRows } = params.context.props.DataStore;
    params.defaultItems = [
      {
        name: params.node.isSelected() ? 'Unselect' : 'Select',
        icon: '<span class="ag-icon ag-icon-tick"></span>',
        action: () => {
          params.node.setSelected(!params.node.isSelected());
        }
      },
      {
        name: 'Add Row',
        icon: '<span class="ag-icon ag-icon-plus"></span>',
        action: () => {
          addRows([{}]);
        }
      },
      {
        name: 'Delete',
        icon: '<span class="ag-icon ag-icon-cross"></span>',
        action: () => {
          if (window.confirm(`Delete?\n${JSON.stringify(params.node.data)}`)) {
            deleteRows([params.node.data]);
          }
        }
      },
      {
        name: 'Delete (Selected Rows)',
        icon: '<span class="ag-icon ag-icon-cancel"></span>',
        action: () => {
          const rows = params.api.getSelectedRows();
          if (rows.length > 0 && window.confirm(`Delete ${rows.length} rows?`)) {
            deleteRows(rows);
          }
        }
      },
      'separator',
      ...params.defaultItems,
    ];
  }
  return params.defaultItems;
}


@inject('DataStore')
@observer
class DataTable extends Component {
  disposerReactionColumns = null;
  disposerReactionRows = null;
  transaction = new DataTransaction();
  prevent = false;

  getState = () => {
    return {
      rows: this.props.DataStore.currentRows,
      filterModel: this.api.getFilterModel(),
      sortModel: this.api.getSortModel(),
    };
  };

  setState = state => {
    if (!state) return;
    const { rows, filterModel, sortModel } = state;
    this.preventTransaction();
    this.props.DataStore.setRows(rows);
    this.api.setFilterModel(filterModel);
    this.api.setSortModel(sortModel);
    this.api.setFocusedCell(0, '_rownum');
    this.unPreventTransaction();
  };

  save = () => {
    if (this.prevent) return;
    this.preventTransaction();
    this.transaction.save(this.getState());
    this.unPreventTransaction();
  };

  preventTransaction = _ => {
    this.prevent = true;
  };

  unPreventTransaction = _ => {
    setTimeout(_ => {
      this.prevent = false;
    }, 0);
  };

  undo = () => {
    this.setState(this.transaction.undo());
  };

  redo = () => {
    this.setState(this.transaction.redo());
  };

  onGridReady = params => {
    this.api = params.api;
    this.columnApi = params.columnApi;

    const reactionColumns = () => {
      const { columns } = this.props.DataStore;
      const columnDefs = columns.map(c => ({ field: c, headerName: c }));
      params.api.setColumnDefs([]);
      params.api.setColumnDefs([ rowNumHeader, ...columnDefs]);
    };

    const reactionRows = () => {
      const { rows } = this.props.DataStore;
      params.api.setRowData(rows);
      this.save();
    };

    this.disposerReactionColumns = reaction(
      () => this.props.DataStore.columns,
      reactionColumns
    );

    this.disposerReactionRows = reaction(
      () => this.props.DataStore.rows,
      reactionRows
    );

    reactionColumns();
    reactionRows();
  };

  componentWillUnmount() {
    this.disposerReactionColumns();
    this.disposerReactionRows();
  }

  onRowEditingStarted = params => {
    this.rowEditBefore = toJS(params.data);
  };

  onRowEditingStopped = params => {
    const before = this.rowEditBefore;
    const after = toJS(params.data);
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      this.save();
    }
  };

  onPasteEnd = _ => {
    this.save();
  };

  onFilterChanged = _ => {
    this.save();
  };

  onSortChanged = _ => {
    this.save();
  };

  suppressKeyboardEvent = params => {
    const { event, api, columnApi } = params;
    // Delete
    if (event.which === 46) {
      const updates = [];
      api.getCellRanges().forEach(range => {
        for (var i = range.startRow.rowIndex; i <= range.endRow.rowIndex; i++) {
          const data = api.getModel().getRow(i).data;
          range.columns.forEach(column => {
            data[column.getColDef().field] = '';
          });
          updates.push(data);
        }
      });
      api.updateRowData(updates);
      this.save();
      return true;
    }
    if (event.ctrlKey) {
      // Ctrl + Z
      if (event.which === 90) {
        if (event.shiftKey) { 
          this.redo();
        } else { 
          this.undo();
        }
        return true;
      }
      // Ctrl + Y
      if (event.which === 89) {
        this.redo();
        return true;
      }
      // Ctrl + Q
      if (event.which === 81) {
        columnApi.autoSizeColumns(columnApi.getAllColumns().map(c => c.getColId()));
        return true;
      }
    }
  };

  render() {
    const { DataStore, ...gridOptions } = this.props;
    return (
      <div className="DataTable ag-theme-balham" style={{width: '100%', height: '100%'}}>
        <AgGridReact
          {...defaultGridOptions}
          {...gridOptions}
          context={{ transaction: this.transaction, props: this.props }}
          onGridReady={this.onGridReady}
          onRowEditingStarted={this.onRowEditingStarted}
          onRowEditingStopped={this.onRowEditingStopped}
          onPasteEnd={this.onPasteEnd}
          onFilterChanged={this.onFilterChanged}
          onSortChanged={this.onSortChanged}
          suppressKeyboardEvent={this.suppressKeyboardEvent}
        />
      </div>
    );
  }
}

export default DataTable;
