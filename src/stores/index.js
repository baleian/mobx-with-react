import DataTableStore from './DataTableStore';
import TabStore from './TabStore';

class RootStore {
  constructor() {
    this.DataTableStore = new DataTableStore(this);
    this.TabStore = new TabStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
