import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('CounterStore')
@observer
class Counter extends Component {
  render() {
    const { CounterStore } = this.props;
    return (
      <div>
        <h1>{CounterStore.number}</h1>
        <button onClick={CounterStore.increase}>+1</button>
        <button onClick={CounterStore.decrease}>-1</button>
      </div>
    );
  }
}

export default Counter;
