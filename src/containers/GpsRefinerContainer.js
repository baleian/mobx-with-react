import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';

import GpsRefinerTable from '../components/GpsRefinerTable';

@observer
class GpsRefinerContainer extends Component {
  render() {
    return (
      <div className="GpsRefinerContainer">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <GpsRefinerTable />
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default GpsRefinerContainer;
