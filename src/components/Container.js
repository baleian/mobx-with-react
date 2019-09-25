import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import DataTableContainer from '../containers/DataTableContainer';
import GpsRefinerContainer from '../containers/GpsRefinerContainer';
import StoreRefinerContainer from '../containers/StoreRefinerContainer';
import AddressRefinerContainer from '../containers/AddressRefinerContainer';


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
