import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Details.css'
import { useLocation } from 'react-router-dom';
import { FileUpload } from './FileUpload';
import Map from './Map'


const Details = () => {
    const location = useLocation();
    const task = location.state;
    

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
            </Accordion>
            <Button variant="warning" className='detailH1Button'>Edit</Button>{' '}
            <Button variant="danger" className='detailH1Button'>Delete</Button>{' '}
            <div><br></br></div>
            <FileUpload/>
        </Container>
    );
}
export default Details;

