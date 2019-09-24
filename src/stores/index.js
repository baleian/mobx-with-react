import DataStore from './data';

class RootStore {
  constructor() {
    this.DataStore = new DataStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
