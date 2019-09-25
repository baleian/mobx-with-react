import React, { Component } from 'react';
import { observer } from 'mobx-react';

import StoreRefinerTable from '../components/StoreRefinerTable';

@observer
class StoreRefinerContainer extends Component {
  render() {
    return (
      <div className="StoreRefinerContainer">
        <StoreRefinerTable />
      </div>
    );
  }
}

export default StoreRefinerContainer;
