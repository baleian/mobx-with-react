import CounterStore from './counter';
import MarketStore from './market';

class RootStore {
  constructor() {
    this.CounterStore = new CounterStore(this);
    this.MarketStore = new MarketStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
