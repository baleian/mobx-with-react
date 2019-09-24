import React from 'react';

import './App.css';

import SideBarTabs, { Tab, TabPannel } from './components/SideBarTabs';
import SideBarButtons from './components/SideBarButtons';

import GpsRefinerContainer from './containers/GpsRefinerContainer';
import StoreRefinerContainer from './containers/StoreRefinerContainer';
import AddressRefinerContainer from './containers/AddressRefinerContainer';

import DevTools from 'mobx-react-devtools';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>POI Store Refiner</h1>
      </div>
      <div className="sidebar">
        <SideBarTabs>
          <Tab index={0} label="GPS 정제" />
          <Tab index={1} label="Store 정제" />
          <Tab index={2} label="Address 정제" />
        </SideBarTabs>
        <SideBarButtons />
      </div>
      <div className="container-wrapper">
        <div className="container">
          <TabPannel index={0}>
            <GpsRefinerContainer />
          </TabPannel>
          <TabPannel index={1}>
            <StoreRefinerContainer />
          </TabPannel>
          <TabPannel index={2}>
            <AddressRefinerContainer />
          </TabPannel>
        </div>
      </div>
      {process.env.NODE_ENV === 'development' && <DevTools />}
    </div>
  );
}

export default App;
