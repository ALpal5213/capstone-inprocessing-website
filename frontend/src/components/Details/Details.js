import React, { useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Details.css'
import { useLocation } from 'react-router-dom';
import { FileUpload } from './FileUpload';

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
            <Button variant="warning" className='detailH1Button'>Edit</Button>{' '}
            <Button variant="danger" className='detailH1Button'>Delete</Button>{' '}
        </Container>
    );
}
export default Details;

