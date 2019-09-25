import { observable, action } from 'mobx';

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
