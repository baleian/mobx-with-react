import { observable, action } from 'mobx';

import * as CsvFileReader from '../utils/CsvFileReader';

class DataStore {
  @observable rows = [];

  constructor(root) {
    this.root = root;
  }

  @action
  setRows = (rows) => {
    this.rows = rows;
  };
}

export default DataStore;
