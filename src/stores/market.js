import { observable, action, computed } from 'mobx';

class MarketStore {
  @observable selectedItems = [];

  constructor(root) {
    this.root = root;
  }

  @action put = (name, price) => {
    const { number } = this.root.CounterStore;
    const exists = this.selectedItems.find(item => item.name === name);
    if (exists) {
      exists.count += number;
      return;
    }
    this.selectedItems.push({
      name,
      price,
      count: number
    });
  };

  @action take = name => {
    const itemToTake = this.selectedItems.find(item => item.name === name);
    if (!itemToTake) return;
    itemToTake.count--;
    if (itemToTake.count === 0) {
      this.selectedItems.remove(itemToTake);
    }
  };

  @computed get total() {
    return this.selectedItems.reduce((prev, curr) => prev + curr.price * curr.count, 0);
  }
}

export default MarketStore;
