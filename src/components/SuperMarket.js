import React from 'react';
import SuperMarketTemplate from './SuperMarketTemplate';
import ShopItemList from './ShopItemList';
import BasketItemList from './BasketItemList';
import TotalPrice from './TotalPrice';

const SuperMarket = () => {
  return (
    <div className="SuperMarket">
      <SuperMarketTemplate 
        items={<ShopItemList />} 
        basket={<BasketItemList />} 
        total={<TotalPrice />}
      />
    </div>
  );
};

export default SuperMarket;
