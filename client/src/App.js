import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//Components 
import Home from './Pages/Home';
import Playground from './Pages/Playground';

import './App.less';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="playground/:id" element={<Playground />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
