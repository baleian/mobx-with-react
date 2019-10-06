import DataStore from './DataStore';
import TabStore from './TabStore';

class RootStore {
  constructor() {
    this.DataStore = new DataStore(this);
    this.TabStore = new TabStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
