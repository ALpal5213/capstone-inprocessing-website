import React, {useState, useCallback, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Accordion } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Upload, Download } from "react-bootstrap-icons";



const Details = () => {

    const selected = 0;

    const [ taskList, setTaskList ] = useState([]);
    // const { currentUser, setCurrentUser } = useContext({Global Task List XXXX});

    //Fetch users and locations
    const fetchData = useCallback(async () => {
        const data = await fetch('http://localhost:3001/tasks-locations');
        const json = await data.json();

        const newTaskList = [...json];
        console.log(newTaskList);
        setTaskList(newTaskList);  

    }, [])

    console.log(taskList[selected]);

    //handle on page load
    useEffect(() => {
    
        fetchData()
        .catch(console.error);;

    }, []);

    // Test Data
    const selectedTask =[{task_name: "complete details page", task_description: "this is a task.", user_id: "12345", priority: "high", location_id: "7", task_type: "Personal", due_date: "23 March 1970", status: "assigned"}];
    const selectedLocation =[{location_id: "7", building: "7000", room: "27A", phone_number: "3675309", address: "27 W Palm Street", hours: "1300-1500 M-F", url: "https:www.finishmyinprocessing.com", notes: "these are notes."}]
    // {console.log(selectedTask)};

    return (
        <Container>
           
                <div>{taskList[selected].task_name}
                <Button variant="warning" className='detailH1Button'>Edit</Button>{' '}
                <Button variant="danger" className='detailH1Button'>Delete</Button>{' '}
                </div>
            
            <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Task Description</Accordion.Header>
                <Accordion.Body>
                {taskList[selected].task_description}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Location</Accordion.Header>
                <Accordion.Body>
                        <div>{taskList[selected].address}</div>
                        <div>{taskList[selected].hours}</div>
                        <div>{taskList[selected].building}</div>
                        <div>{taskList[selected].room}</div>
                        <div>{taskList[selected].phone_number}</div>
                        <div>{taskList[selected].notes}</div>
                        <div>{taskList[selected].url}</div>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
       
            <Button variant="primary">Upload <Upload /></Button>{' '}
            <Button variant="secondary">Download <Download /></Button>{' '}
       
        </Container>
    );
}

export default Details;
