import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ImportModalButton } from './ImportModal';

import './SideBar.css';

@inject('TabStore')
@observer
class SideBarTabs extends Component {
  handleOnChangeTab = (_, newTabIndex) => {
    const { setSelectedTabIndex } = this.props.TabStore;
    setSelectedTabIndex(newTabIndex);
  };

  render() {
    const { selectedTabIndex } = this.props.TabStore;
    return (
      <Tabs
          orientation="vertical"
          value={selectedTabIndex}
          onChange={this.handleOnChangeTab}
      >
        <Tab label="Data Table" />
        <Tab label="Debug" />
      </Tabs>
    );
  }
}

class SideBar extends Component {
  render() {
    return (
      <div className="SideBar">
        <div className="sidebar-tabs">
          <SideBarTabs />
        </div>
        <div className="sidebar-footer">
          <ImportModalButton 
            className="center-center"
            variant="contained" color="primary" label="CSV Import"
          />
        </div>
      </div>
    );
  }
}

export default SideBar;
