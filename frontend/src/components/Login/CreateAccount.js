import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './Login-create.css';
import bcrypt from 'bcryptjs';
const saltRounds = 10;

export const CreateAccount = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState()
  const [username, setUsername] = useState()
  const [admin, setAdmin] = useState(false)
  const [supervisor, setSupervisor] = useState(false)
  const [military, setMilitary] = useState(false)
  const [jobId, setJobId] = useState()
  const [unitId, setUnitId] = useState()
  const [jobs, setJobs] = useState([])
  const [units, setUnits] = useState([])
  const textItems = ['First_~Name', 'Last_~Name', 'Username_~']
  const checkBoxes = ['Admin', 'Supervisor', 'Military']
  const comboBoxes = [{name: 'Job', list: jobs, props: ['id', 'job_name']}, {name: 'Unit', list: units, props: ['id', 'unit_name']}]

  useEffect(() => {
    fetch(`http://localhost:3001/Table/Jobs`)
      .then(res => res.json())
      .then(jobList => {
        setJobs(jobList)
      })
    fetch(`http://localhost:3001/Table/Units`)
      .then(res => res.json())
      .then(unitList => {
        setUnits(unitList)
      })
  },[])

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            variant="dark"
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(event) => {
              setValue(event.target.value)
            }}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  const dropdownControl = (event) => {
    let idDataArr = event.target.id.split('~')
    if (idDataArr[2] === 'Job') {
      setJobId(idDataArr[0])
    }
    if (idDataArr[2] === 'Unit') {
      setUnitId(idDataArr[0])
    }
    document.getElementById(idDataArr[2]).innerHTML = idDataArr[1].length < 19 ? idDataArr[1] : `${idDataArr[1].substring(0,19)}...`
  }

  const checkBoxControl = (event) => {
    if (event.target.id === 'AdminCheckbox') {
      setAdmin(event.target.checked)
    }
    if (event.target.id === 'SupervisorCheckbox') {
      setSupervisor(event.target.checked)
    }
    if (event.target.id === 'MilitaryCheckbox') {
      setMilitary(event.target.checked)
    }
  }

  const textBoxControl = (event) => {
    if (event.target.id === 'First') {
      setFirstName(event.target.value)
    }
    if (event.target.id === 'Last') {
      setLastName(event.target.value)
    }
    if (event.target.id === 'Username') {
      setUsername(event.target.value)
    }
  }

  const createUser = async () => {
    var errCount = 0;
    var fullName = '';

    if (!jobId || !unitId) {
      errCount++
      document.getElementById('dropdownErr').innerHTML = '!! Missing Job or Unit !!'
    } else {
      document.getElementById('dropdownErr').innerHTML = ''
    }

    if (!username) {
      errCount++
      document.getElementById('UsernameErr').innerHTML = '!! Missing Username !!'
    } else {      
      await fetch("http://localhost:3001/username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"username": username})
      }).then(res => res.json())
      .then(data => {
        if (data.found) {
          errCount++
          document.getElementById('UsernameErr').innerHTML = '!! Username Not Avaliable !!'
        } else {
          document.getElementById('UsernameErr').innerHTML = ''
        }
      })
      document.getElementById('LastErr').innerHTML = ''
    }
    if (!lastName) {
      errCount++
      document.getElementById('LastErr').innerHTML = '!! Missing Last Name !!'
    } else {
      fullName = firstName.length > 0 ? `${firstName} ${lastName}` : lastName
      document.getElementById('LastErr').innerHTML = ''
    }
    
    if (document.getElementById('pass').value === '') {
      errCount++
      document.getElementById('passErr').innerHTML = '!! Missing Password !!'
    } else {
      document.getElementById('passErr').innerHTML = ''
    }

    if (document.getElementById('passConfirm').value === '') {
      errCount++
      document.getElementById('passConfirmErr').innerHTML = '!! Missing Confirmation Password !!'
    } else {
      if (document.getElementById('passConfirm').value !== document.getElementById('pass').value) {
        errCount++
        document.getElementById('passErr').innerHTML = '!! Password Mismatch !!'
        document.getElementById('passConfirmErr').innerHTML = '!! Password Mismatch !!'
      } else {
        document.getElementById('passErr').innerHTML = ''
        document.getElementById('passConfirmErr').innerHTML = ''
      }
    }

    if (errCount < 1) {
      await bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(document.getElementById('pass').value, salt, (err, hash) => {
          fetch("http://localhost:3001/Users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({fullname: fullName, username: username, password: hash, is_admin: admin, is_supervisor: supervisor, is_military: military, job_id: jobId, unit_id: unitId})
          })
        })
      })
      navigate('/login')
    }
  }

  return (
    <>
      <div className='backDiv' />
      <div className='menuDiv createDiv'>
        <h1 className='divItem'>Create Account</h1>
        {jobs ?
          <Form>
            <div className='errDiv'>
            </div>
            <div className='formRowDiv'>
              {checkBoxes.map((checkBox, index) => {
                return(
                  <React.Fragment key={index}>
                    <Form.Group className="mb-3 formRowItem" controlId={`${checkBox}Checkbox`} onChange={(event) => checkBoxControl(event)}>
                      <Form.Check type="checkbox" label={checkBox} />
                    </Form.Group>
                    {index < checkBoxes.length - 1 ? <div className="vr colSplit"></div> : ''}
                  </React.Fragment>
                )
              })}
            </div>
            <div className='errDiv'>
              <span id='dropdownErr' className='errMsg'></span>
            </div>
            <div className='formRowDiv'>
              {comboBoxes.map((comboBoxData, index) => {
                return (
                  <React.Fragment key={index}>
                    <Dropdown>
                    <span style={{'marginLeft': '10px'}}>{comboBoxData.name}</span><br/>
                    <Dropdown.Toggle className="dropdownMenu formRowItem" variant="dark" id={`${comboBoxData.name}`}>
                      {comboBoxData.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark" as={CustomMenu} className='dropdownDiv'>
                      {comboBoxData.list.map((listItem,i) => {
                        return(<Dropdown.Item id={`${listItem[comboBoxData.props[0]]}~${listItem[comboBoxData.props[1]]}~${comboBoxData.name}`} className="dropdownItem" key={i} onClick={((event) => dropdownControl(event))}>{listItem[comboBoxData.props[1]]}</Dropdown.Item>)
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  {index < comboBoxes.length - 1 ? <div className="vr colSplit"></div> : ''}
                </React.Fragment>
                )
              })}
            </div>
            {textItems.map((textItem, index) => {
              var textArr = textItem.split('_~')
              return(
                <Form.Group key={index} className="mb-3 divItem" controlId={`${textArr[0]}`}>
                  <Form.Label>{textArr.length > 1 ? `${textArr[0]} ${textArr[1]}` : textArr[0] }</Form.Label><span id={`${textArr[0]}Err`} className='errMsg'></span>
                  <Form.Control type="text" placeholder={textArr.length > 1 ? `${textArr[0]} ${textArr[1]}` : textArr[0]} onChange={(event) => textBoxControl(event)}/>
                </Form.Group>
              )
            })}
            <Form.Group className="mb-3 divItem" controlId="pass">
              <Form.Label>Password</Form.Label><span id='passErr' className='errMsg'></span>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3 divItem" controlId="passConfirm">
              <Form.Label>Password Confirmation</Form.Label><span id='passConfirmErr' className='errMsg'></span>
              <Form.Control type="password" placeholder="Password Confirmation" />
            </Form.Group>
            <Button variant="dark formButtonStyle" onClick={() => createUser()}>Create</Button>
            <Button variant="dark formButtonStyle" onClick={() => navigate('/login')}>Cancel</Button>
          </Form> : ''
        }
      </div>
    </>
    
  )
}