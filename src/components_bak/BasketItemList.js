import React, { Component } from 'react';
import BasketItem from './BasketItem';
import { inject, observer } from 'mobx-react';

@inject('MarketStore')
@observer
class BasketItemList extends Component {
  render() {
    const { MarketStore } = this.props;

    const itemList = MarketStore.selectedItems.map(item => (
      <BasketItem
        item={item}
        key={item.name}
        onTake={MarketStore.take}
      />
    ));

    return (
      <div>
        {itemList}
      </div>
    );
  }
}

export default BasketItemList;
