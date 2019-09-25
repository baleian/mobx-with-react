import DataStore from './data';
import TabStore from './tab';

class RootStore {
  constructor() {
    this.DataStore = new DataStore(this);
    this.TabStore = new TabStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
