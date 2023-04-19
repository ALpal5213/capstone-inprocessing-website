import React, { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Details.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { FileTabs } from '../FileManipulation/FileTabs'
import Map from './Map'
import { GlobalContext } from '../../App';
import Form from 'react-bootstrap/Form';



const Details = () => {
    const location = useLocation();
    const task = location.state;
    const splitDate = task.due_date.split('T');
    const formattedDate = splitDate[0];
    const [editable, setEditable] = useState(false);
    const { setReFetch } = useContext(GlobalContext);
    const navigate = useNavigate();
    let editObj = {};
    let editButton = '';
    let delButton = '';


    if (task.task_type === 'personal') {
        editButton = <Button variant="outline-warning" onClick={() => startEdit()} className='detailH1Button'>Edit Task</Button>
        delButton = <Button variant="outline-danger" className='detailH1Button' onClick={() => { handleDelete(task) }}>Delete Task</Button>
    }

    const handlePatch = () => {
        setEditable(false);

        fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify(editObj
            ),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((json) => {
                setReFetch(true)
                navigate('/home')
            });


    }

    const startEdit = () => {
        setEditable(true);
    }


    const handleDelete = () => {
        deleteTask(task)
        navigate('/home')
        setReFetch(true)
    }
    const deleteTask = () => {
        fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        })
            .then(data => {
                setReFetch(true)
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (

        <>
            <Container>
                <hr className="solid"></hr>
                <div><h2>{task.task_name}</h2>
                    <hr className="solid"></hr>
                </div>
                {(!editable) ?
                    <Container className='taskDescriptions'>

                        <Row>
                            <Col>
                                <div className='status-div'><h5> Status</h5><p>{task.status}</p></div>
                                <div className='status-div'><h5> Priority</h5><p>{task.priority}</p></div>
                                <div className='status-div'><h5> Due Date</h5><p>{formattedDate}</p></div>
                                <div className='status-div'><h5> Task Description</h5><p>{task.task_description}</p></div>
                                {editButton}
                                {delButton}
                                <br></br>
                                <FileTabs />

                            </Col>
                            <Col>
                                {task.building && <div className='status-div'><h5>{task.building}</h5></div>}
                                {task.room && <p>Room: {task.room}</p>}
                                {task.address && <p>{task.address}</p>}
                                {task.hours && <p> {task.hours}</p>}
                                {task.phone_number && <p>{task.phone_number}</p>}
                                {task.notes && <p>Notes: {task.notes}</p>}
                                {task.url && <p>{task.url}</p>}
                            </Col>
                        </Row>
                        <br></br>
                        <h2>Task Location</h2>
                        <hr className="solid"></hr>
                        {task.latitude && task.longitude && <Map selectedLocation={task} />}
                        <br></br>
                    </Container>
                    :
                    <div>
                        <Container className='taskDescriptions'>
                            <div className='status-div'><h3>Edit Task</h3></div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formTaskName">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text" defaultValue={task.task_name} onChange={(e) => editObj["task_name"] = e.target.value} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDueDate">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select type="text" defaultValue={task.status} onChange={(e) => editObj["status"] = e.target.value}>
                                        <option>Status</option>
                                        <option value="incomplete" >Incomplete</option>
                                        <option value="pending">Pending</option>
                                        <option value="complete">Complete</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPriority">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Control type="text" defaultValue={task.priority} onChange={(e) => editObj["priority"] = e.target.value} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDueDate">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control type="date" defaultValue={task.due_date} onChange={(e) => editObj["due_date"] = e.target.value} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDescription">
                                    <Form.Label>Task Description</Form.Label>
                                    <Form.Control type="text" defaultValue={task.task_description} onChange={(e) => editObj["task_description"] = e.target.value} />
                                </Form.Group>
                                <Button variant="outline-primary" onClick={() => handlePatch()}>Save</Button>
                                <Button variant="outline-warning" onClick={() => setEditable(false)} className='detailH1Button'>Cancel</Button>
                            </Form>
                        </Container>
                    </div>
                }

            </Container>
        </>
    );
}
export default Details;

