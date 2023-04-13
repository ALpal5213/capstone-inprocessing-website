import React, { useState, useCallback, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Accordion, Row, Col, } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Upload, Download } from "react-bootstrap-icons";
import { Progress } from './Progress';
import { Message } from './Message';
import axios from 'axios';
import './Details.css'

const Details = () => {
    const [taskList, setTaskList] = useState([{ task_name: 'x', task_description: 'x', address: 'x', hours: 'x', building: 'x', room: 'x', phone_number: 'x', notes: 'x', url: 'x' }]);

    const [file, setFile] = useState('');
    const [filename, setFilename] = useState();
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [show, setShow] = useState(false);
    const [imagesrc, setimagesrc] = useState('');
    const selected = 0;
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
    // const selectedTask =[{task_name: "complete details page", task_description: "this is a task.", user_id: "12345", priority: "high", location_id: "7", task_type: "Personal", due_date: "23 March 1970", status: "assigned"}];
    // const selectedLocation =[{location_id: "7", building: "7000", room: "27A", phone_number: "3675309", address: "27 W Palm Street", hours: "1300-1500 M-F", url: "https:www.finishmyinprocessing.com", notes: "these are notes."}]
    // {console.log(selectedTask)};




    //File Upload
    const onChangeFile = async e => {
        e.preventDefault();
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setShow(true)

    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);



        try {
            const res = await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }
            });

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            setMessage('File Uploaded: ');
            setTimeout(() => setMessage(), 10000);
            setimagesrc({ filePath, fileName })
            setTimeout(() => setimagesrc(), 10000);

        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
            setUploadPercentage(0)
        }
    };



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

            <>
                <br></br>
                <Container className='upload-box'>

                    <Row >
                        <Col>
                            <Progress percentage={uploadPercentage} />
                        </Col>
                    </Row>
                    <Row className='mt-4'>

                        <Col>
                            <Row>
                                <Col>
                                    <form>
                                        <Button variant="primary">
                                            <div className='file-up'>
                                                <input
                                                    type='file'
                                                    className='custom-file-input'
                                                    id='customFile'
                                                    onChange={onChangeFile}
                                                />
                                                <label className='custom-file-label' htmlFor='customFile'>
                                                    {uploadedFile ? 'Choose File' : `Chosen File: ${uploadedFile.filename.slice(0, 20)}...`}
                                                </label>
                                            </div>
                                        </Button>

                                    </form>
                                </Col>

                            </Row>


                        </Col>

                        <Col>{show ?
                            <Button onClick={onSubmitFile} variant="success">
                                <label className='custom-file-label' htmlFor='customFile'>
                                    {filename? (<><Upload/> {filename.slice(0,15)}</>)    : (`Upload File`)}
                                </label></Button> : null}

                        </Col>
                    </Row>
                    <Row>
                        <Col className='mt-3' style={{ textAlign: 'center' }}>
                            {message ? <Message msg={[message, uploadedFile.fileName]} /> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {imagesrc ? (

                                <div className='row mt-5'>
                                    <div className='col-md-6 m-auto'>
                                        <img style={{ width: '100%' }} src={imagesrc.filePath} alt='' />
                                        <h9 className='text-center'>{imagesrc.fileName}</h9>
                                    </div>
                                </div>
                            ) : null}
                        </Col>
                    </Row>
                </Container>




            </>


        </Container>
    );
}


export default Details;

