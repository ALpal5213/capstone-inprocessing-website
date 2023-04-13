import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Details.css'
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const editRef = useRef({description: 'x', address: 'x', hours: 'x', building: 'x', room: 'x', phone_number: 'x', notes: 'x', url: 'x'});

const handlePatch = (e) => {
    e.preventDefault();
    //Patch state
}

const Details = () => {
    const location = useLocation();
    const task = location.state;
    const [ editable, setEdits ] = useState(false);

    const submitEdits = () => {

        setEdits(false);
    }

    return (
        <Container>
            <div>{task.task_name}
                <Button variant="warning" onClick={() => setEdits(true)} className='detailH1Button'>Edit</Button>{' '}
                <Button variant="danger" className='detailH1Button'>Delete</Button>{' '}
            </div>
            {(!editable) ?
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Task Description</Accordion.Header>
                    <Accordion.Body>
                        {task.task_description}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Location</Accordion.Header>
                    <Accordion.Body>
                        <p>{task.address}</p>
                        <p>{task.hours}</p>
                        <p>{task.building}</p>
                        <p>{task.room}</p>
                        <p>{task.phone_number}</p>
                        <p>{task.notes}</p>
                        <p>{task.url}</p>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            :
            //Form for Edits
            <Form>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text" defaultValue={task.task_description} onBlur={(e) => editRef.task.task_description = e.target.value}/>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" defaultValue={task.address} onBlur={(e) => editRef.task.address = e.target.value}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicHours">
                    <Form.Label>Hours</Form.Label>
                    <Form.Control type="text" defaultValue={task.hours} onBlur={(e) => editRef.task.hours = e.target.value} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBuilding">
                    <Form.Label>Building</Form.Label>
                    <Form.Control type="text" defaultValue={task.building} onBlur={(e) => editRef.task.building = e.target.value}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRoom">
                    <Form.Label>Room</Form.Label>
                    <Form.Control type="text" defaultValue={task.room} onBlur={(e) => editRef.task.room = e.target.value}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" defaultValue={task.phone_number} onBlur={(e) => editRef.task.phone_number = e.target.value}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control type="text" defaultValue={task.notes} onBlur={(e) => editRef.task.notes = e.target.value}/>
                </Form.Group>

                <Button variant="primary" onSubmit={() => submitEdits()} type="submit">
                Submit
                </Button>
            </Form>
            }
            </Container>
    );
}
export default Details;

