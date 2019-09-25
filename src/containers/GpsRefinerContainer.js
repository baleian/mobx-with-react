import React, { Component } from 'react';
import { observer } from 'mobx-react';

import GpsRefinerTable from '../components/GpsRefinerTable';

@observer
class GpsRefinerContainer extends Component {
  render() {
    return (
      <div className="GpsRefinerContainer">
        <GpsRefinerTable />
      </div>
    );
  }
}

export default GpsRefinerContainer;