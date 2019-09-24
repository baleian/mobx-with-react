import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class TabStore {
  @observable selectedTabIndex = 0;

  @action
  setSelectedTabIndex = (newTabIndex) => {
    this.selectedTabIndex = newTabIndex;
  }
}

const store = new TabStore();

@observer
class TabPannel extends Component {
  render() {
    const { children, index, ...other } = this.props;
    return (
      <div
        hidden={store.selectedTabIndex !== index}
        {...other}
      >
        { store.selectedTabIndex !== index ? null : children }
      </div>
    );
  }
}

@observer
class SideBarTabs extends Component {
  handleOnChangeTab = (_, newTabIndex) => {
    store.setSelectedTabIndex(newTabIndex);
  };

  render() {
    const { children } = this.props;
    const tabs = children.filter(c => c.type === Tab).sort((a, b) => a.props.index < b.props.index ? -1 : 1);
    return (
      <div className="SideBarTabs">
        <Tabs
          orientation="vertical"
          value={store.selectedTabIndex}
          onChange={this.handleOnChangeTab}
        >
          {tabs}
        </Tabs>
      </div>
    );
  }
}

export default SideBarTabs;
export { Tab, TabPannel };
