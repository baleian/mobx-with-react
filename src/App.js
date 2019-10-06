import React from 'react';
import DevTools from 'mobx-react-devtools';

import './App.css';

import Header from './components/Header';
import SideBar from './components/SideBar';
import Container from './components/Container';

function App() {
  return (
    <div className="App">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="sidebar-wrapper">
        <SideBar />
      </div>
      <div className="container-wrapper">
        <Container />
      </div>
      {process.env.NODE_ENV === 'development' && <DevTools />}
    </div>
  );
}

export default App;
