import React, { useContext, useEffect, useState } from 'react';
import {Container, Nav, Navbar, Dropdown, NavDropdown} from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../App';
import './AppNavBar.css'
import Cookies from 'js-cookie'
import { ThemeHandler } from '../ThemeHandler';

const AppNavBar = () => {
  const navigate = useNavigate();
  const { userLogin, setUserLogin, reFetch, manageRoute, setManageRoute } = useContext(GlobalContext);
  const [taskList, setTaskList] = useState([]);
  const [notification, setNotification] = useState(false);
  const DATE_RANGE = 15;

  useEffect(() => {
    var user_id = Cookies.get('user_id')
    var session_id = Cookies.get('session_id')

    fetch(`http://localhost:3001/table/Users/${user_id}`)
      .then(res => res.json())
      .then(data => setUserLogin(data[0]))
  }, [])

  useEffect(() => {
    if (userLogin) {
      fetch(`http://localhost:3001/tasks-locations/${userLogin.id}`)
      .then(res => res.json())
      .then(data => {
        let tasks = data.filter((task) => {
          let today = Math.floor(Date.now() / 86400000);
          let dueDate = Math.floor(Date.parse(task.due_date) / 86400000);
          return dueDate < today + DATE_RANGE && (task.status === "incomplete" || task.status === "pending");
        })
        setTaskList(tasks)
        tasks.length > 0 ? setNotification(true) : setNotification(false);
      })
    }
  }, [userLogin, reFetch])

  const userLogout = () => {
    setUserLogin(false)
    Cookies.remove('session_id')
    Cookies.remove('user_id')
    Cookies.remove('is_admin')
    navigate('/login')
  }

  const manageAll = () => {
    navigate('/manage-all')
    setManageRoute('all')
  }

  const manageSub = () => {
    navigate('/manage/subordinates')
    setManageRoute('sub')
  }

  const manageUnit = () => {
    navigate('/manage/unit')
    setManageRoute('unit')
  }

  const navBarContent = () => {
    if (userLogin === false) {
      return ''
    } else {
      return (
        <>
        <Navbar bg="dark" variant='dark' export="lg" textcolor="white">
          <Container>
            <div className='brand'>
              <img src="./inpro-h.png" className="me-3 logo-h" onClick={() => navigate('/home')}/>
              {/* <Navbar.Brand className='linkTextDiv brandLink' onClick={() => navigate('/home')}>Welcome {userLogin.fullName} to Wright-Patterson AFB</Navbar.Brand> */}
            </div>
            <Nav>
              <Nav.Item >
                <Nav.Link>
                  <Dropdown>
                    <Dropdown.Toggle variant="dark" className="icon-style">
                      {notification && <div className="notification-badge"></div>}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-bell icon" viewBox="0 0 18 18">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      {taskList.map((task, id) => {
                        return <Dropdown.Item 
                          key={`${id}`}
                          onClick={() => navigate('/details', {state: task})}
                        >Due Soon: {task.task_name}</Dropdown.Item>
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item >
                <Nav.Link>
                  <Dropdown  className="bi icon">
                    <Dropdown.Toggle variant="dark" className="icon-style">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-list icon" viewBox="0 0 13 13">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      {userLogin.is_supervisor || userLogin.is_commander || userLogin.is_admin ? 
                        <Nav.Item >
                          <Nav.Link>
                            <Dropdown>
                              <Dropdown.Toggle variant="dark" className="icon-style manage-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="blue" className="bi bi-pencil-square icon" viewBox="0 0 16 16">
                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                                <span>Manage</span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu variant="dark" className="manage-list">
                                {userLogin.is_admin ? <Dropdown.Item onClick={() => manageAll()}>Manage Tasks</Dropdown.Item> : ''}
                                {userLogin.is_supervisor ? <Dropdown.Item onClick={() => manageSub()}>Manage Subordinates</Dropdown.Item> : ''}
                                {userLogin.is_leadership ? <Dropdown.Item onClick={() => manageUnit()}>Manage Unit</Dropdown.Item> : ''}
                              </Dropdown.Menu>
                            </Dropdown> 
                          </Nav.Link>
                        </Nav.Item> : ''
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
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
        <div className='borderSpan2'></div>
        <div className='borderSpan1'></div>
        </>
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