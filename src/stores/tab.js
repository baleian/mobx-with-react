import { observable, action } from 'mobx';

class TabStore {
  @observable selectedTabIndex = 0;

  constructor(root) {
    this.root = root;
  }

  @action
  setSelectedTabIndex = newTabIndex => {
    this.selectedTabIndex = newTabIndex;
  };
}

export default TabStore;
