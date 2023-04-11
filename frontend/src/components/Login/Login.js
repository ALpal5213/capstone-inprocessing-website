import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react'
import './Login.css';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const Login = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([])
  const [passMatch, setPassMatch] = useState({id: Date.now(), match: undefined})
  const [failMessage, setFailMessage] = useState('')

  const failContent = (
    <span className='failMessage'>Login Failed!</span>
  )

  useEffect(() => {

      setUsers([
        {id: 1, username: 'user1', isAdmin: false, isSupervisor: false, isMilitary: true, jobId: 1, unitId: 1, password: '$2a$10$6T3/1KsQyejJNu/YIawiV.caLYGT2YZgS1CijJR6Ux1mDqhif/Xwq'},
        {id: 2, username: 'user2', isAdmin: false, isSupervisor: false, isMilitary: true, jobId: 1, unitId: 1, password: '$2a$10$aAl7OQLJeY.jTIUb/eHxr.NYgLBvo8y.d4bKl2/DaVXly3A4nYBta'},
        {id: 3, username: 'user3', isAdmin: false, isSupervisor: false, isMilitary: true, jobId: 1, unitId: 1, password: '$2a$10$mgXkzWKMaau8XNBnk2u7g.A4HsztuNsCWyq4kpZBmvUo/KdX0q5Yu'}
      ])
  },[])

  useEffect(() => {
    if (passMatch.match === false && username.length > 0) {
      setFailMessage(failContent)
    } else if (passMatch.match === true && username.length > 0) {
      console.log('login success')
      setFailMessage('')
    }
  },[passMatch])

  const findUser = () => {
    return users.find(user => user.username === username)
  }

  const passHashCk = () => {
    const validUser = findUser()
    if (!username) {
      setFailMessage(failContent)
    }
    if (validUser) {
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username})
      }).then(res => res.json())
      .then(data => {
        bcrypt.compare(document.getElementById('pass').value, data.password, function(err, result) {
          setPassMatch({id: Date.now(), match: result})
        })
      })
    } else {
      setPassMatch({id: Date.now(), match: false})
    }
  }

  const setUserCtl = (inputUser) => {
    setFailMessage('')
    setPassMatch({id: Date.now(), match: undefined})
    setUsername(inputUser)
  }


  return (
    <>
      <div className='backDiv' />
      <div className='loginDiv'>
        {<Form>
          <Form.Group className="mb-3 formGroupStyle" controlId="userBox">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Username" onChange={(event) => setUserCtl(event.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3 formGroupStyle" controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={() => setFailMessage('')}/>
          </Form.Group>
          <Button variant="primary formButtonStyle" onClick={() => passHashCk()}>Login</Button>{failMessage}
        </Form>}
      </div>
    </>
    
  )
}