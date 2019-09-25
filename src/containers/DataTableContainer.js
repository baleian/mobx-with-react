import React, { Component } from 'react';
import { observer } from 'mobx-react';

import DataTable from '../components/DataTable';

@observer
class GpsRefinerContainer extends Component {
  render() {
    return (
      <div className="GpsRefinerContainer">
        <DataTable />
      </div>
    );
  }
}

export default GpsRefinerContainer;
