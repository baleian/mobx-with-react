import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

import GpsRefinerTable from './components/GpsRefinerTable';

import DevTools from 'mobx-react-devtools';

function App() {
  return (
    <div className="App">
      <GpsRefinerTable />
      {process.env.NODE_ENV === 'development' && <DevTools />}
    </div>
  );
}

export default App;
