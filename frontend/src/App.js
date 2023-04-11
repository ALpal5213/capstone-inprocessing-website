//Functional Imports
import Details from './Details.js';
import React from 'react';
//Styling Imports
import './App.css';

//Create Application Context
export const GlobalContext = createContext();

 //Create states to pass to components




function App() {
  return (
    <div>
      <Details />
    </div>
  );
}

export default App;
