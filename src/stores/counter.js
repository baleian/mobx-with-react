import { observable, action } from 'mobx';

class CounterStore {
  @observable number = 1;

  constructor(root) {
    this.root = root;
  }

  @action increase = () => {
    this.number++;
  }

  @action decrease = () => {
    this.number--;
  }
}

export default CounterStore;
