//Functional Imports
import Details from './components/Details/Details.js';
import React, { useState, createContext } from 'react';
import { AllRoutes } from './components/Routes/AllRoutes.js';
//Styling Imports
import './App.css';

//Create Application Context
export const GlobalContext = createContext();

function App() {
  //Create states to pass to components
  const [ selectedTask, setSelectedTask ] = useState({ task_name: "complete details page", task_description: "this is a task.", user_id: "12345", priority: "high", location_id: "7", task_type: "Personal", due_date: "23 March 1970", status: "assigned" });
  const [ selectedLocation, setSelectedLocation ] = useState({ location_id: "7", building: "7000", room: "27A", phone_number: "3675309", address: "27 W Palm Street", hours: "1300-1500 M-F", url: "https:www.finishmyinprocessing.com", notes: "these are notes." });
  const [ currentUser, setCurrentUser ] = useState({ user_id: "12345", user_name: "Ricky" });
  const [ userLogin, setUserLogin ] = useState(true);
  const [userAuth, setUserAuth] = useState(false)
  
  return (
    <GlobalContext.Provider value={{ selectedTask, setSelectedTask, selectedLocation, setSelectedLocation, currentUser, setCurrentUser, userLogin, setUserLogin, userAuth, setUserAuth }}>
      <AllRoutes />
    </GlobalContext.Provider>
  );
}

export default App;
