import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Details.css'
import { useLocation } from 'react-router-dom';
import { FileUpload } from './FileUpload';


const Details = () => {
    const location = useLocation();
    const task = location.state;
    console.log(task);

    return (
        <Container>
            <div><h3>{task.task_name}</h3> </div>
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
            <div><br></br></div>
            <FileUpload/>
        </Container>
    );
}
export default Details;

