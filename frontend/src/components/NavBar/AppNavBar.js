import Container from 'react-bootstrap/Container';
import React, { useContext, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './AppNavBar.css'
import Cookies from 'js-cookie'

const AppNavBar = () => {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(GlobalContext);

  useEffect(() => {
    var user_id = Cookies.get('user_id')
    var session_id = Cookies.get('session_id')
    if (userLogin) {
      fetch(`http://localhost:3001/Table/Users/${user_id}`)
      .then(res => res.json())
      .then(data => {
        setUserLogin(data[0])
      })
    }
  }, [])

  const userLogout = () => {
    setUserLogin(false)
    Cookies.remove('session_id')
    Cookies.remove('user_id')
    navigate('/login')
  }

  const navBarContent = () => {
    if (userLogin === false) {
      return ''
    } else {
      return (
        <Navbar bg="dark" variant='dark' export="lg" textcolor="white">
          <Container>
            <div className='brand'>
            <Navbar.Brand onClick={() => window.open("https://www.wpafb.af.mil")} className='brandLink linkTextDiv'>Welcome to Wright-Patterson AFB</Navbar.Brand>
            </div>
            <Nav>

              {userLogin.is_supervisor || userLogin.is_commander || userLogin.is_admin ? 
                <>
                  <Nav.Item>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square dropdownIcon" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                  </Nav.Item>
                  <Nav.Item >
                    <div className='linkTextDiv'>
                      <NavDropdown title="Manage" id="basic-nav-dropdown" color='white'>
                        {userLogin.is_admin ?
                          <NavDropdown.Item>Create Task</NavDropdown.Item> :
                          ''
                        }
                        {userLogin.is_supervisor ? 
                          <NavDropdown.Item>Manage Subordinates</NavDropdown.Item> :
                          ''
                        }
                        {userLogin.is_leadership ? 
                          <NavDropdown.Item>Manage Unit</NavDropdown.Item> :
                          ''
                        }
                      </NavDropdown>
                    </div>
                  </Nav.Item>
                </> :
                ''
              }
              



              <Nav.Item >
                <Nav.Link>
                  <div className='linkTextDiv' onClick={() => navigate('/home')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className="bi bi-house-door icon" viewBox="0 0 16 16">
                      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z" />
                    </svg>
                    <span>My Tasks</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <div className='linkTextDiv' onClick={() => navigate('/profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-fill icon" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                    <span>Profile</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <div className='linkTextDiv' onClick={() => userLogout()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-box-arrow-right icon" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                    <span>Logout</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      )
    }
  }

  return (
    <>
      {navBarContent()}
    </>
  );
}



export default AppNavBar;