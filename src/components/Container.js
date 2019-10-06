import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

import DataTableContainer from './containers/datatable/DataTableContainer';
import StoreRefinerContainer from './containers/store_refiner/StoreRefinerContainer';
import DebugContainer from './containers/debug/DebugContainer';

import './Container.css';

@inject('TabStore')
@observer
class Container extends Component {
  @computed
  get container() {
    const { selectedTabIndex } = this.props.TabStore;
    switch (selectedTabIndex) {
      case 0: return <DataTableContainer />;
      case 1: return <StoreRefinerContainer />;
      case 2: return <DebugContainer />;
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
