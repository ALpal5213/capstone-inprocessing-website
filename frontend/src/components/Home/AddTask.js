import React, { useState, useEffect } from "react";
import { Col, Row, Modal, Button, Form } from "react-bootstrap";
import './AddTask.css';

const AddTask = () => {

    const [locations, setLocations] = useState([{
        "id": "",
        "building": "",
        "room": "",
        "address": "",
        "phone_number": "",
        "hours": "",
        "url": "",
        "notes": ""
    }]);
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskPriority, setTaskPriority] = useState("Low");
    const [mil_or_civ, setMilOrCiv] = useState("Military");
    const [loc, setLoc] = useState(1);
    const [locAddress, setLocAddress] = useState("");
    const [locBuilding, setLocBuilding] = useState("");
    const [locRoom, setLocRoom] = useState("");
    const [locAMHours, setLocAMHours] = useState("8");
    const [locPMHours, setLocPMHours] = useState("5");
    const [locPhone, setLocPhone] = useState("");
    const [locURL, setLocURL] = useState("");
    const [days, setDays] = useState([]);
    const [locNotes, setLocNotes] = useState("");
    const [taskUpload, setTaskUpload] = useState(false);
    const [taskDownload, setTaskDownload] = useState(false);

    //Modal Show
    const [show, setShow] = useState(false);

    //New Location Show
    const [showNewLocation, setShowNewLocation] = useState(false);

    //default check state
    const [defaultCheck, setDefaultCheck] = useState(true);

    //Functions to handle input changes
    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    }
    const handleTaskDescChange = (e) => {
        setTaskDesc(e.target.value);
    }
    const handleTaskPriorityChange = (e) => {
        setTaskPriority(e.target.value);
    }
    const handleTaskMilOrCivChange = (e) => {
        setDefaultCheck(false);
        setMilOrCiv(e.target.value);
    }
    const handleTaskDueDateChange = (e) => {
        setTaskDueDate(e.target.value);
    }
    const handleTaskUploadChange = (e) => {
        setTaskUpload(e.target.checked);
    }
    const handleTaskDownloadChange = (e) => {
        setTaskDownload(e.target.checked);
    }
    const handleLocBuildingChange = (e) => {
        setLocBuilding(e.target.value);
    }
    const handleLocRoomChange = (e) => {
        setLocRoom(e.target.value);
    }
    const handleLocAddressChange = (e) => {
        setLocAddress(e.target.value);
    }
    const handleLocPhoneChange = (e) => {
        setLocPhone(e.target.value);
    }
    const handleLocAMHoursChange = (e) => {
        setLocAMHours(e.target.value);
    }
    const handleLocPMHoursChange = (e) => {
        setLocPMHours(e.target.value);
    }
    const handleLocDaysChange = (e) => {
        setDays(...e.target.value);
    }
    const handleLocURLChange = (e) => {
        setLocURL(e.target.value);
    }
    const handleLocNotesChange = (e) => {
        setLocNotes(e.target.value);
    }

    useEffect(() => {
        fetch('http://localhost:3001/table/Locations')
            .then(res => res.json())
            .then(data => setLocations(data))
    }, [])

    //add new location first
    const submitRequest = () => {
        if (showNewLocation) { //user adding a new location to a task
            //create a new location first
            addLocation()
            //then create a new task with the location of the task being the new location id
            const last_loc = locations[locations.length - 1]
            addTask(last_loc.id + 1)
        } else { //user adding an existing location to a task
            addTask(loc)
        }
        handleClose();
    }
    const addLocation = () => {
        console.log(locAMHours + " A.M. to " + locPMHours + " P.M.")
        const newLocation = {
            "building": locBuilding,
            "room": locRoom,
            "address": locAddress,
            "phone_number": locPhone,
            "hours": locAMHours + " A.M. to " + locPMHours + " P.M.",
            "url": locURL,
            "notes": locNotes
        }

        fetch("http://localhost:3001/locations",
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(newLocation)
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
    }
    const addTask = (location_id) => {
        const newTask = {
            "user_id": 1,
            "location_id": location_id,
            "task_name": taskName,
            "task_description": taskDesc,
            "priority": taskPriority,
            "task_type": "personal",
            "mil_or_civ": mil_or_civ,
            "due_date": taskDueDate,
            "status": "incomplete",
            "has_upload": taskUpload,
            "has_download": taskDownload
        }

        fetch("http://localhost:3001/tasks",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask)
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    //states for the Modal
    const handleClose = () => {
        setDefaultCheck(true);
        setShowNewLocation(false);
        setLoc(1);
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleCloseNewLocation = (e) => {
        setLoc(e.target.value);
        if (e.target.value !== "newLocation") {
            setShowNewLocation(false);
        } else {
            setShowNewLocation(true);
        }
    }

    return (
        <>
            <Button className="btn btn-primary" onClick={handleShow}>Add task</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><h3 id="modal-title">Add a New Task</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="form-group">
                        <Form.Label for="newTaskName">Task Name*</Form.Label>
                        <input type="text" id="newTaskName" placeholder="Task Name" onBlur={handleTaskNameChange}></input>
                    </Row>
                    <Row className="form-group">
                        <Form.Label for="newTaskDesc">Task Description*</Form.Label>
                        <textarea id="newTaskDesc" rows="4" cols="50" placeholder="Task Description" onBlur={handleTaskDescChange}></textarea>
                    </Row>
                    <Row className="form-group">
                        <Form.Label for="newTaskDueDate">Due Date*</Form.Label>
                        <input type="date" className="form-control" id="newTaskDueDate" onChange={handleTaskDueDateChange}></input>
                    </Row>
                    <Row className="form-group">
                        <Row>
                            <Form.Label for="newTaskPriority">Priority*</Form.Label>
                        </Row>
                        <Row>
                            <Col>
                                <select className="form-control" id="newTaskPriority" onChange={handleTaskPriorityChange}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </Col>
                        </Row>
                        <Row>
                            <span>
                                <Form.Label for="mil">Military</Form.Label>
                                <Form.Check type="radio" name="mil_or_civ" id="mil" value="mil" inline defaultChecked={defaultCheck} onChange={handleTaskMilOrCivChange}></Form.Check>
                                <Form.Label for="mil">Civilian</Form.Label>
                                <Form.Check type="radio" name="mil_or_civ" id="civ" value="civ" inline onChange={handleTaskMilOrCivChange}></Form.Check>
                                <Form.Label for="mil">Both</Form.Label>
                                <Form.Check type="radio" name="mil_or_civ" id="both" value="both" inline onChange={handleTaskMilOrCivChange}></Form.Check>
                            </span>
                        </Row>
                    </Row>
                    <Row className="form-group">
                        <Form.Label>Location</Form.Label>
                        <Col>
                            <select className="form-control" id="newTaskPriority" onChange={handleCloseNewLocation}>
                                {
                                    //FIX on change and on select
                                    locations.map((location) => <option value={location.id}>{location.building}</option>)
                                }
                                <option id="newLocation" value="newLocation">Add Location</option>
                            </select>
                        </Col>
                    </Row>
                    <div id="locationDiv">
                        {
                            showNewLocation ?
                                <>
                                    <Row>
                                        <input type="text" className="form-control" id="newLocAddress" placeholder="Address" onBlur={handleLocAddressChange}></input>
                                        <Col>
                                            <input type="text" className="form-control" id="newLocBuilding" placeholder="Building" onBlur={handleLocBuildingChange}></input>
                                            <input type="text" className="form-control" id="newLocPhone" placeholder="Phone number" onBlur={handleLocPhoneChange}></input>
                                        </Col>
                                        <Col>
                                            <input type="text" className="form-control" id="newLocRoom" placeholder="Room" onBlur={handleLocRoomChange}></input>
                                            <input type="text" className="form-control" id="newLocURL" placeholder="URL" onBlur={handleLocURLChange}></input>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Label>Hours</Form.Label>
                                        <span>
                                            <select id="newLocAMHours" onChange={handleLocAMHoursChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8" selected>8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            <Form.Label> A.M. to </Form.Label>
                                            <select id="newLocPMHours" onChange={handleLocPMHoursChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5" selected>5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            <label> P.M.</label>
                                        </span>
                                        <span>
                                            <Form.Label for="Sunday">S</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Sunday" value="Sunday" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Monday">M</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Monday" value="Monday" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Tuesday">T</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Tuesday" value="Tuesday" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Wednesday">W</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Wednesday" value="Wednesday" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Thursday">Th</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Thursday" value="Thursday" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Friday">F</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Friday" value="Friday" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Saturday">S</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Saturday" value="Saturday" onChange={handleLocDaysChange}></input>
                                        </span>
                                    </Row>
                                    <Row>
                                        <textarea id="newTaskNotes" rows="4" cols="50" placeholder="Notes" onBlur={handleLocNotesChange}></textarea>
                                    </Row>
                                </>

                                : <></>
                        }
                    </div>
                    <Row className="form-group">
                        <Col>
                            <Form.Label for="newTaskUpload">File Upload?</Form.Label>
                            <input type="checkbox" id="newTaskUpload" onChange={handleTaskUploadChange}></input>
                        </Col>
                        <Col>
                            <Form.Label for="newTaskDownload">File Download?</Form.Label>
                            <input type="checkbox" id="newTaskDownload" onChange={handleTaskDownloadChange}></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={submitRequest}>Submit</Button>
                        </Col>
                        <Col>
                            <Button onClick={handleClose}>Cancel</Button>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTask;