import React, { useState, useRef, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
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
    const [editable, setEditable] = useState(false);
    const editRef = useRef({ task_description: task.task_description, address: task.address, hours: task.hours, building: task.building, room: task.room, phone_number: task.phone_number, notes: task.notes, url: task.url });
    const { setReFetch } = useContext(GlobalContext);
    const navigate = useNavigate();
    let editObj = {};

    const handlePatch = () => {
        setEditable(false);
        console.log(task.id);
        console.log(editObj);

        fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify(editObj
            ),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((json) => {
                console.log(editObj)
                setReFetch(true)
                navigate('/home')
            });


    }

    const startEdit = () => {
        setEditable(true);
        console.log('made it')

    }

    const deleteTask = () => {
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
            <Container>
                <div><h2>{task.task_name}</h2>
                    <Button variant="warning" onClick={() => startEdit()} className='detailH1Button'>Edit</Button>{' '}
                    <Button variant="danger" className='detailH1Button' onClick={() => { deleteTask(task) }}>Delete</Button>

                </div>
                {(!editable) ?
                    <Container>
                        <Row>
                            <Col>
                        <div className='status-div'><h5> Status</h5><p>{task.status}</p></div>
                        <div className='status-div'><h5> Due Date</h5><p>{formattedDate}</p></div>
                        <div className='status-div'><h5> Task Description</h5><p>{task.task_description}</p></div>
                            </Col>
                            <Col>
                        <div className='status-div'><h5> Location</h5></div>
                                    {task.building && <p>{task.building}</p>}
                                    {task.room && <p>Room: {task.room}</p>}
                                    {task.address && <p>Address: {task.address}</p>}
                                    {task.hours && <p>Hours: {task.hours}</p>}
                                    {task.phone_number && <p>Phone Number: {task.phone_number}</p>}
                                    {task.notes && <p>Notes: {task.notes}</p>}
                                    {task.url && <p>Website: {task.url}</p>}
                            </Col>       
                        </Row>
                        {task.latitude && task.longitude && <Map selectedLocation={task} />}
                    </Container>
                    :
                    <div>
                        <Container>
                            <Form>
                            <Form.Group className="mb-3" controlId="formDueDate">
                            <Form.Label>Status</Form.Label>
                                    <Form.Select type="text" defaultValue={task.status} onChange={(e) => editObj["status"] = e.target.value}>
                                        <option>Status</option>
                                        <option value="incomplete" >Incomplete</option>
                                        <option value="pending">Pending</option> 
                                        <option value="complete">Complete</option> 
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDueDate">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control type="date" defaultValue={task.due_date} onChange={(e) => editObj["due_date"] = e.target.value} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Task Description</Form.Label>
                                    <Form.Control type="text" defaultValue={task.task_description} onChange={(e) => editObj["task_description"] = e.target.value} />
                            
                                </Form.Group>
                                <Button variant="primary" onClick={() => handlePatch()}>Save</Button>
                                <Button variant="warning" onClick={() => setEditable(false)} className='detailH1Button'>Cancel</Button>
                            </Form>
                        </Container>
                    </div>
                }
                <FileUpload />
            </Container>
        </>
    );
}
export default Details;

