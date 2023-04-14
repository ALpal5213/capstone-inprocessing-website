import React, { useState, useEffect } from "react";
import { Col, Row, Modal } from "react-bootstrap";
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
    const [mil_or_civ, setMilOrCiv] = useState("");
    const [loc, setLoc] = useState(1);
    const [locAddress, setLocAddress] = useState("");
    const [locBuilding, setLocBuilding] = useState("");
    const [locRoom, setLocRoom] = useState("");
    const [locAMHours, setLocAMHours] = useState("8");
    const [locPMHours, setLocPMHours] = useState("5");
    const [locPhone, setLocPhone] = useState("");
    const [locURL, setLocURL] = useState("");
    const [locNotes, setLocNotes] = useState("");
    const [taskUpload, setTaskUpload] = useState(false);
    const [taskDownload, setTaskDownload] = useState(false);

    //Modal Show
    const [show, setShow] = useState(false);

    //New Location Show
    const [showNewLocation, setShowNewLocation] = useState(false);

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
    const handleLocChange = (e) => {
        console.log(e.target.value)
        setLoc(e.target.value);
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
                //addLocation() FIX after changing inputs
            //then create a new task with the location of the task being the new location id
            const last_loc = locations[locations.length - 1]
            addTask(last_loc.id + 1)
        } else { //user adding an existing location to a task
            addTask(loc)
        }
        setShow(false);
    }
    const addLocation = () => {
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
            "user_id": 103,
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
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseNewLocation = () => setShowNewLocation(false);
    const handleShowNewLocation = () => setShowNewLocation(true);

    return (
        <>
            <button type="button" className="btn btn-primary" onClick={handleShow}>Add Task</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><h2>Adding a New Task:</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row class="form-group">
                        <label for="newTaskName">Task Name*</label>
                        <input type="text" className="form-control" id="newTaskName" placeholder="Task Name" onBlur={handleTaskNameChange}></input>
                    </Row>
                    <Row class="form-group">
                        <label for="newTaskDesc">Task Description*</label>
                        <textarea id="newTaskDesc" rows="4" cols="50" placeholder="Task Description" onBlur={handleTaskDescChange}></textarea>
                    </Row>
                    <Row class="form-group">
                        <label for="newTaskDueDate">Due Date*</label>
                        <input type="date" className="form-control" id="newTaskDueDate" onChange={handleTaskDueDateChange}></input>
                    </Row>
                    <Row class="form-group">
                        <Row>
                            <label for="newTaskPriority">Priority*</label>
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
                                <label for="mil">Military</label>
                                <input type="radio" name="mil_or_civ" id="mil" value="mil" onChange={handleTaskMilOrCivChange}></input>
                                <label for="mil">Civilian</label>
                                <input type="radio" name="mil_or_civ" id="civ" value="civ" onChange={handleTaskMilOrCivChange}></input>
                                <label for="mil">Both</label>
                                <input type="radio" name="mil_or_civ" id="both" value="both" onChange={handleTaskMilOrCivChange}></input>
                            </span>
                        </Row>
                    </Row>
                    <Row class="form-group">
                        <label>Location</label>
                        <Col>
                            <select className="form-control" id="newTaskPriority">
                                {
                                    //FIX on change and on select
                                    locations.map((location) => <option value={location.id} onSelect={handleLocChange}>{location.building}</option>)
                                }
                                <option id="newLocation" value="newLocation" onSelect={handleShowNewLocation}>Add Location</option>
                            </select>
                        </Col>
                    </Row>
                    <div id="locationDiv">
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
                            <label>Hours</label>
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
                                <label> A.M. to </label>
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
                                <label for="Sunday">S</label>
                                <input type="checkbox" className="dayOfWeek" id="Sunday"></input>
                                <label for="Monday">M</label>
                                <input type="checkbox" className="dayOfWeek" id="Monday"></input>
                                <label for="Tuesday">T</label>
                                <input type="checkbox" className="dayOfWeek" id="Tuesday"></input>
                                <label for="Wednesday">W</label>
                                <input type="checkbox" className="dayOfWeek" id="Wednesday"></input>
                                <label for="Thursday">Th</label>
                                <input type="checkbox" className="dayOfWeek" id="Thursday"></input>
                                <label for="Friday">F</label>
                                <input type="checkbox" className="dayOfWeek" id="Friday"></input>
                                <label for="Saturday">S</label>
                                <input type="checkbox" className="dayOfWeek" id="Saturday"></input>
                            </span>
                        </Row>
                        <Row>
                            <textarea id="newTaskNotes" rows="4" cols="50" placeholder="Notes" onBlur={handleLocNotesChange}></textarea>
                        </Row>
                    </div>
                    <Row class="form-group">
                        <Col>
                            <label for="newTaskUpload">File Upload?</label>
                            <input type="checkbox" id="newTaskUpload" onChange={handleTaskUploadChange}></input>
                        </Col>
                        <Col>
                            <label for="newTaskDownload">File Download?</label>
                            <input type="checkbox" id="newTaskDownload" onChange={handleTaskDownloadChange}></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button className="form-control" onClick={submitRequest}>Submit</button>
                        </Col>
                        <Col>
                            <button className="form-control" onClick={handleClose}>Cancel</button>
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