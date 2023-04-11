import './App.css';
import { TaskTabs } from './TaskTabs';

import Details from './Details.js';
import React from 'react';

function App() {
  return (
    <div>
      <Details />    
        <TaskTabs/>
    </div>
   
  );
}

export default App;
