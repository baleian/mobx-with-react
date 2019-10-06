import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


@inject('DataStore')
@observer
class DebugContainer extends Component {
  render() {
    const { columns, rows } = this.props.DataStore;
    const columnDefs = columns.map(c => ({ field: c, headerName: c }));
    return (
      <div className="DebugContainer" style={{width: '100%', height: '100%'}}>
        <div className="ag-theme-balham" style={{width: '100%', height: '100%'}}>
          <AgGridReact 
            columnDefs={columnDefs}
            rowData={rows}
          />
        </div>
      </div>
    );
  }
}

export default DebugContainer;
