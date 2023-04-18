import React, {  useContext } from 'react';
import { MDBSwitch } from 'mdb-react-ui-kit';
import { GlobalContext } from '../App';

export const ThemeHandler =()=> {

    const { theme, setTheme, userLogin } = useContext(GlobalContext);

//Switches Theme when toggled and patches DB with preferred theme.
  const toggleTheme = () => {
    console.log('user theme after toggle ', userLogin.preferredTheme)
    console.log('theme state after toggle ', theme)
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

    return(
        <>
                <MDBSwitch defaultChecked id='flexSwitchCheckChecked' label='Switch Theme' onClick={toggleTheme} />
        </>
    )
}