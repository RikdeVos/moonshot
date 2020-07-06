import React from 'react';
import './App.css';

import Layout from './containers/Layout/Layout';
import Launches from './containers/Launches/Launches';

function App() {
  return (
    <Layout>
      <Launches></Launches>
    </Layout>
  );
}

export default App;
