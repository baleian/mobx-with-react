import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Grid from '@material-ui/core/Grid';

import StoreRefinerTable from '../components/StoreRefinerTable';

@observer
class StoreRefinerContainer extends Component {
  render() {
    return (
      <div className="StoreRefinerContainer">
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <StoreRefinerTable />
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default StoreRefinerContainer;
