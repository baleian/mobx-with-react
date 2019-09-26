import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class GpsRefinerContainer extends Component {
  render() {
    return (
      <div className="GpsRefinerContainer">
        <span>GpsRefinerContainer</span>
      </div>
    );
  }
}

export default GpsRefinerContainer;
