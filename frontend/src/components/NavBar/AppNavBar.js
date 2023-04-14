import Container from 'react-bootstrap/Container';
import React, { useContext, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './AppNavBar.css'
import Cookies from 'js-cookie'

const AppNavBar = () => {
  const navigate = useNavigate();
  const { userLogin, setUserLogin } = useContext(GlobalContext);

  useEffect(() => {
    var user_id = Cookies.get('user_id')
    console.log(user_id)
    var session_id = Cookies.get('session_id')
    console.log(session_id)

    fetch(`http://localhost:3001/Table/Users/${user_id}`)
      .then(res => res.json())
      .then(data => {
        setUserLogin(data[0])
      })


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
            <Navbar.Brand onClick={() => navigate('/home')} className='brandLink'>Welcome to Wright-Patterson AFB</Navbar.Brand>
            <Nav>
              <Nav.Item >
                <Nav.Link>
                  <div className='linkTextDiv' onClick={() => navigate('/support')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-info-circle icon" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    <span className='navLinkText'>Support</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <div className='linkTextDiv' onClick={() => navigate('/profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-person-fill icon" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                    <span className='navLinkText'>Profile</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <div className='linkTextDiv' onClick={() => userLogout()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-box-arrow-right icon" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                    <span className='navLinkText'>Logout</span>
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