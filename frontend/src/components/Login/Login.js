import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './Login.css';
import bcrypt from 'bcryptjs';
import { GlobalContext } from '../../App';
const saltRounds = 10;



export const Login = () => {
  const navigate = useNavigate();
  const { setUserLogin } = useContext(GlobalContext);

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(-1);
  const [passMatch, setPassMatch] = useState({id: Date.now(), match: undefined})
  const [failMessage, setFailMessage] = useState('')

  const failContent = (
    <span className='failMessage'>Login Failed!</span>
  )

  useEffect(() => {
    if (passMatch.match === false && username.length > 0) {
      setFailMessage(failContent)
    } else if (passMatch.match === true && username.length > 0) {
      fetch("http://localhost:3001/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"authenticated": true})
      }).then(res => res.json())
      .then(data => console.log(data))

      fetch(`http://localhost:3001/Table/Users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUserLogin(data[0])
      })
      setFailMessage('')
      navigate('/Home')
    }
  },[passMatch])

  const findUser = () => {
    return fetch("http://localhost:3001/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username})
      }).then(res => res.json())
      .then(data => {
        return data.found ? true : false
      })
  }

  const passHashCk = async () => {
    const validUser = await findUser()
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
        setUserId(data.id)
        setUserLogin('')
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