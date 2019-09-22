import RefineDataStore from './refine-data';

class RootStore {
  constructor() {
    this.RefineDataStore = new RefineDataStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
