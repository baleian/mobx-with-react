import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import DataTableContainer from '../container/DataTableContainer';
import GpsRefinerContainer from '../container/GpsRefinerContainer';
import StoreRefinerContainer from '../container/StoreRefinerContainer';
import AddressRefinerContainer from '../container/AddressRefinerContainer';

import './Container.css';

@inject('TabStore')
@observer
class Container extends Component {
  @computed
  get container() {
    const { selectedTabIndex } = this.props.TabStore;
    switch (selectedTabIndex) {
      case 0: return <DataTableContainer />;
      case 1: return <GpsRefinerContainer />;
      case 2: return <StoreRefinerContainer />;
      case 3: return <AddressRefinerContainer />;
      default: return null;
    }
  }

  render() {
    return (
      <div className="Container">
        {this.container}
      </div>
    )
  }
}

export default Container;
