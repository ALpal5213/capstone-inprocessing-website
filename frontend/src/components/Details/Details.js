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
    const { setReFetch, reFetch } = useContext(GlobalContext);
    const navigate = useNavigate();
    let editObj = {};
    let editButton = '';
    let delButton = '';


    if (task.task_type === 'personal') {
        editButton = <Button variant="dark" onClick={() => startEdit()} className='detailH1Button'>Edit Task</Button>
        delButton = <Button variant="dark" className='detailH1Button' onClick={() => { handleDelete(task) }}>Delete Task</Button>
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
                setReFetch(!reFetch)
                navigate('/home')
            });


    }

    const startEdit = () => {
        setEditable(true);
    }


    const handleDelete = () => {
        deleteTask(task)
        navigate('/home')
        setReFetch(!reFetch)
    }
    
    const deleteTask = () => {
        fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        })
            .then(data => {
                setReFetch(!reFetch)
                navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (

        <>
            <Container>
                <br></br>
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
                                {editButton}{' '}
                                {delButton}
                            </Col>
                            <Col>
                                <FileTabs />
                            </Col>
                        </Row>
                        <hr className="solid"></hr>
                        <br></br>
                        <Row>  
                        <Col>
                        <h3>{task.building && <div className='status-div'>{task.building}</div>}</h3>
                                {task.room && <p>Room: {task.room}</p>}
                                {task.address && <p>{task.address}</p>}
                                {task.hours && <p> {task.hours}</p>}
                                {task.phone_number && <p>{task.phone_number}</p>}
                                {task.notes && <p>Notes: {task.notes}</p>}
                                {task.url && <p>{task.url}</p>}
                        </Col>
                        </Row>
                        {task.latitude && task.longitude && <Map selectedLocation={task} />}
                        <br></br>
                    </Container>
                    :
                    <div>
                        <Container className='taskDescriptions'>
                            <div className='status-div'><h3>Edit Task</h3></div>
                            <Form>
                                <Form.Group className="mb-3" controlId="formTaskName">
                                    <Form.Label class="text-white">Task Name</Form.Label>
                                    <Form.Control type="text" defaultValue={task.task_name} onChange={(e) => editObj["task_name"] = e.target.value} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDueDate">
                                    <Form.Label class="text-white">Status</Form.Label>
                                    <Form.Select type="text" defaultValue={task.status} onChange={(e) => editObj["status"] = e.target.value}>
                                        <option>Status</option>
                                        <option value="incomplete" >Incomplete</option>
                                        <option value="pending">Pending</option>
                                        <option value="complete">Complete</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPriority">
                                    <Form.Label class="text-white">Priority</Form.Label>
                                    <Form.Control type="text" defaultValue={task.priority} onChange={(e) => editObj["priority"] = e.target.value} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formDueDate">
                                    <Form.Label class="text-white">Due Date</Form.Label>
                                    <Form.Control type="date" defaultValue={task.due_date} onChange={(e) => editObj["due_date"] = e.target.value} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDescription">
                                    <Form.Label class="text-white">Task Description</Form.Label>
                                    <Form.Control type="text" defaultValue={task.task_description} onChange={(e) => editObj["task_description"] = e.target.value} />
                                </Form.Group>
                                <Button variant="dark" onClick={() => handlePatch()}>Save</Button>
                                <Button variant="dark" onClick={() => setEditable(false)} className='detailH1Button'>Cancel</Button>
                            </Form>
                            <br></br>
                        </Container>
                    </div>
                }

            </Container>
        </>
    );
}
export default Details;

