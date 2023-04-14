import React, { useState, useRef, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Details.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { FileUpload } from './FileUpload';
import Map from './Map'
import { GlobalContext } from '../../App';
import Form from 'react-bootstrap/Form';



const Details = () => {
    const location = useLocation();
    const task = location.state;
    const splitDate = task.due_date.split('T');
    const formattedDate = splitDate[0];
    const [ editable, setEdits ] = useState(false);
    const editRef = useRef({description: 'x', address: 'x', hours: 'x', building: 'x', room: 'x', phone_number: 'x', notes: 'x', url: 'x'});
  const { userLogin,reFetch,setReFetch } = useContext(GlobalContext);
  const navigate = useNavigate();

    const handlePatch = (e) => {
        e.preventDefault();
        //Patch state
    }

    const submitEdits = () => {
        setEdits(false);
    }

    const deleteTask=()=>{
        fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => {
        setReFetch(true)
        navigate('/home')
      })
      .catch(err => console.log(err))
    }
    
    return (

        <>
        <Container className='details-container'>
            <div><h2>{task.task_name}</h2>
                <Button variant="warning" onClick={() => setEdits(true)} className='detailH1Button'>Edit</Button>{' '}
                <Button variant="danger" className='detailH1Button' onClick ={()=> {deleteTask(task)}}>Delete</Button>
                <div className= 'status-div'><h5> Status</h5><p>{task.status}</p></div>
                <div className= 'status-div'><h5> Due Date</h5><p>{formattedDate}</p></div>
            </div>
            {!editable && <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Task Description</Accordion.Header>
                    <Accordion.Body>
                        {task.task_description}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                        {task.building && <p>Building: {task.building}</p>}
                        {task.room && <p>Room: {task.room}</p>}
                        {task.address && <p>Address: {task.address}</p>}
                        {task.hours && <p>Hours: {task.hours}</p>}
                        {task.phone_number && <p>Phone Number: {task.phone_number}</p>}
                        {task.notes && <p>Notes: {task.notes}</p>}
                        {task.url && <p>Website: {task.url}</p>}
                        {task.latitude && task.longitude && <Map selectedLocation={task}/>}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>}
        </Container>
        <FileUpload/>
        </> 
    );
}
export default Details;

