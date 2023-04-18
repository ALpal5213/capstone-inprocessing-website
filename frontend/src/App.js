//Functional Imports
import Details from './components/Details/Details.js';
import React, { useState, createContext } from 'react';
import { AllRoutes } from './components/Routes/AllRoutes.js';
import { MDBSwitch } from 'mdb-react-ui-kit';

//Styling Imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

//Create Application Context
export const GlobalContext = createContext();

function App() {
  //Create states to pass to components
  const [selectedTask, setSelectedTask] = useState({ task_name: "complete details page", task_description: "this is a task.", user_id: "12345", priority: "high", location_id: "7", task_type: "Personal", due_date: "23 March 1970", status: "assigned" });
  const [selectedLocation, setSelectedLocation] = useState({ location_id: "7", building: "7000", room: "27A", phone_number: "3675309", address: "27 W Palm Street", hours: "1300-1500 M-F", url: "https:www.finishmyinprocessing.com", notes: "these are notes." });
  const [currentUser, setCurrentUser] = useState({ user_id: "12345", user_name: "Ricky" });
  const [userLogin, setUserLogin] = useState(false);
  const [userAuth, setUserAuth] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [reFetch, setReFetch] = useState(false);

  //Switches Theme when toggled and patches DB with preferred theme.
  const toggleTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark')
    fetch(`http://localhost:3001/table/Users/${userLogin.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ preferredTheme: theme }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => console.log(userLogin.preferredTheme))
  }

  return (
    <GlobalContext.Provider value={{ theme, selectedTask, setSelectedTask, selectedLocation, setSelectedLocation, currentUser, setCurrentUser, userLogin, setUserLogin, userAuth, setUserAuth, reFetch, setReFetch }}>
      <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
        <MDBSwitch defaultChecked id='flexSwitchCheckChecked' label='Switch Theme' onClick={toggleTheme} />
        <AllRoutes />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
