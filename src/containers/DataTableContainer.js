import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import DataTable from '../components/DataTable';

import './DataTableContainer.css';

@inject('DataTableStore')
@observer
class FunctionToolPannel extends Component {
  constructor(props) {
    super(props);
    this.tempId = 'temp-' + new Date().getTime();
    this.props.reactContainer.id = this.tempId;
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById(this.tempId).parentElement.setAttribute('style', 'width: 300px;');
    }, 0);
  }

  handleOnClickNewColumn = _ => {
    const { addColumn } = this.props.DataTableStore;
    addColumn(this.refNewColumnName.value);
    this.props.api.setColumnDefs(this.props.DataTableStore.columns);
  };

  handleOnClickRenameColumn = _ => {
    const { renameColumn } = this.props.DataTableStore;
    renameColumn(this.refRenameColumnBefore.value, this.refRenameColumnAfter.value);
    this.props.api.setColumnDefs(this.props.DataTableStore.columns);
  };

  render() {
    console.log('FunctionToolPannel render');
    const { columns } = this.props.DataTableStore;
    return (
      <>
        <hr />
        <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
          <input ref={ref => this.refNewColumnName = ref} type="text" placeholder="New Column" />
          <button onClick={this.handleOnClickNewColumn}>Add</button>
        </div>
        <hr />
        <div style={{paddingLeft: '20px', paddingRight: '20px'}}>
          <select ref={ref => this.refRenameColumnBefore = ref}>
            {
              columns.map((c, i) => (<option key={i} value={c.field}>{c.headerName || c.field}</option>))
            }
          </select>
          <input ref={ref => this.refRenameColumnAfter = ref} type="text" placeholder="Rename Column" />
          <button onClick={this.handleOnClickRenameColumn}>Rename</button>
        </div>
        <hr />
      </>
    );
  }
}

const gridOptions = {
  icons: { 'aggregation': '<span class="ag-icon ag-icon-aggregation"></span>' },
  frameworkComponents: { FunctionToolPannel },
  sideBar: {
    toolPanels: [
      'columns', 'filters',
      {
        id: 'functions',
        labelDefault: 'Functions',
        labelKey: 'functions',
        iconKey: 'aggregation',
        toolPanel: "FunctionToolPannel"
      }
    ]
  },
};


@inject('DataTableStore')
@observer
class DataTableContainer extends Component {
  render() {
    console.log('DataTableContainer render');
    const { columns, rows } = this.props.DataTableStore;
    return (
      <div className="DataTableContainer">
        <DataTable 
          columns={columns} 
          rows={rows}
          gridOptions={gridOptions} 
        />
      </div>
    );
  }
}

export default DataTableContainer;
