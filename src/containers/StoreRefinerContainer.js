import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class StoreRefinerContainer extends Component {
  render() {
    return (
      <div className="StoreRefinerContainer">
        <span>StoreRefinerContainer</span>
      </div>
    );
  }
}

export default StoreRefinerContainer;
