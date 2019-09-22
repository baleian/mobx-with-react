import React from 'react';
import './App.css';

import Counter from './components/Counter';
import SuperMarket from './components/SuperMarket';
import DevTools from 'mobx-react-devtools';

function App() {
  return (
    <div className="App">
      <Counter />
      <hr />
      <SuperMarket />
      {process.env.NODE_ENV === 'development' && <DevTools />}
    </div>
  );
}

export default App;
