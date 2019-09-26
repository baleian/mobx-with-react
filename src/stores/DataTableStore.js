import { observable, action } from 'mobx';

class DataTableStore {
  @observable columns = [];
  @observable rows = [];
  // @observable lastClickedRow = null;

  constructor(root) {
    this.root = root;
  }

  @action
  _rowdata_formatted_to_columns() {
    this.rows = this.rows.map(r => {
      this.columns.forEach(c => {
        if (!r[c.field]) r[c.field] = '';
      });
      return r;
    });
  }

  @action
  load = (rows) => {
    this.setRows(rows);
    this.history = [];
    let columns = new Set();
    rows.forEach(row => {
      for (var k in row) columns.add(k);
    });
    this.columns = [...columns].map(c => ({ field: c, headerName: c }));
  };

  @action
  setRows = (rows) => {
    this.rows = rows;
    this._rowdata_formatted_to_columns();
    // this.lastClickedRow = null;
  };

  @action
  addColumn = (c) => {
    if (this.columns.map(c => c.field).indexOf(c) > -1) return;
    this.columns.push({ field: c, headerName: c });
    this._rowdata_formatted_to_columns();
  };

  @action
  renameColumn = (before, after) => {
    if (before === after) return;
    if (this.columns.map(c => c.field).indexOf(before) === -1) return;
    this.columns = this.columns.map(c => {
      if (c.field === before) {
        c.field = after;
        c.headerName = after;
      }
      return c;
    });
    this.rows = this.rows.map(r => {
      r[after] = r[before];
      delete r[before];
      return r;
    });
  };

  // @action
  // onRowClick = (row) => {
  //   this.lastClickedRow = row;
  // };
}

export default DataTableStore;
