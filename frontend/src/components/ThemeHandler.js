import React, { useContext, useEffect } from 'react';
import { MDBSwitch } from 'mdb-react-ui-kit';
import { GlobalContext } from '../App';
import Button from 'react-bootstrap/Button';

export const ThemeHandler =()=> {
  const { theme, setTheme, userLogin, reFetch, setReFetch} = useContext(GlobalContext);

  useEffect(() => {
    fetch(`http://localhost:3001/table/Users/${userLogin.id}`)
      .then(res => res.json())
      .then(data => {
        setTheme(data[0].preferredTheme)
      })
  }, [userLogin, reFetch])


  //Switches Theme when toggled and patches DB with preferred theme.
  const toggleTheme = () => {
    fetch(`http://localhost:3001/table/Users/${userLogin.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ preferredTheme: theme === 'dark' ? 'light' : 'dark' }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(res => {
        setReFetch(!reFetch);
      })
  }

  return (
      <>
      {theme === 'dark' && userLogin ? 
         <Button className = 'theme-button' variant ='light' onClick={toggleTheme} >Light Theme</Button>
         :
         <Button className = 'theme-button' variant ='dark' onClick={toggleTheme} >Dark Theme</Button>
  }
      </>
  )
}