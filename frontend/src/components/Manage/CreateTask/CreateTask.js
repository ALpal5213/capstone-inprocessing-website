import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Modal, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

import { GlobalContext } from '../../../App';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css'

export const CreateTask = () => {

    const navigate = useNavigate();

    const { reFetch, setReFetch, userLogin, modifyTableShow, setModifyTableShow, modifyTableQuery, setmodifyTableQuery, createTableShow, setCreateTableShow } = useContext(GlobalContext);
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
    const [taskPriority, setTaskPriority] = useState("low");
    const [mil_or_civ, setMilOrCiv] = useState("military");
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
    const [taskTypeTitle, setTaskTypeTitle] = useState("Add New Task Type");
    const [newTaskType, setNewTaskType] = useState("");
    const [allIds, setAllIds] = useState([{ "id": '' }, { "id": '' }]);
    const [userIDTitle, setuserIDTitle] = useState('Add an existing User ID');
    const [user_id, setuser_id] = useState('');
    const [oldTasks, setOldTasks] = useState({
        "due_date"
            :
            "2023-11-05T10:16:52.552-07:00",
        "has_download"
            :
            false,
        "has_upload"
            :
            false,
        "id"
            :
            1,
        "location_id"
            :
            4,
        mil_or_civ
            :
            "both",
        "priority"
            :
            "high",
        "status"
            :
            "complete",
        "task_description"
            :
            "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
        "task_name"
            :
            "Configuration",
        "task_type"
            :
            "unit",
        "task_url"
            :
            "https://stupendous-injury.info",
        "user_id"
            :
            61
    });


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
        setTaskPriority(e);
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
        if (e.target.checked) {
            //add
            setDays([...days, e.target.value]);
        } else {
            // //remove
            setDays(days.filter(day => day !== e.target.value));
        }
    }
    const handleLocURLChange = (e) => {
        setLocURL(e.target.value);
    }
    const handleLocNotesChange = (e) => {
        setLocNotes(e.target.value);
    }


    const handleCreateTableShow = (e) => {

        setCreateTableShow(true)

    }









    //var user_id = Cookies.get('user_id')











    useEffect(() => {
        fetch('http://localhost:3001/table/Locations')
            .then(res => res.json())
            .then(data => setLocations(data))
    }, [])


    useEffect(() => {
        fetch('http://localhost:3001/allids/Users')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllIds(data)

            })
    }, [])

    // useEffect(() => {
    //     fetch(`http://localhost:3001/table/Tasks/${modifyTableQuery}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data[0]);
    //             setOldTasks(data[0])
    //         })
    // }, [modifyTableQuery])


    // //add new location first
    // const submitRequest = () => {
    //     if (showNewLocation) { //user adding a new location to a task
    //         //create a new location first
    //         addLocation();
    //     } else { //user adding an existing location to a task
    //         addTask(loc);
    //     }
    //     handleClose();
    // }

    // const addLocation = () => {
    //     let hours = locAMHours + " A.M. to " + locPMHours + " P.M.";
    //     let daysOfWeek = "";
    //     if (days.includes("M") && days.includes("T") && days.includes("W") && days.includes("T") && days.includes("F")) {
    //         hours = hours + " M-F";
    //     } else if (days.length === 0) {
    //         hours = "";
    //     } else {
    //         for (let i = 0; i < days.length; i++) {
    //             const element = days[i];
    //             daysOfWeek += element + ", ";
    //         }
    //         daysOfWeek = daysOfWeek.slice(0, daysOfWeek.length - 2);
    //         hours = hours + " " + daysOfWeek;
    //     }

    //     const newLocation = {
    //         "building": locBuilding,
    //         "room": locRoom,
    //         "address": locAddress,
    //         "phone_number": locPhone,
    //         "hours": hours,
    //         "url": locURL,
    //         "notes": locNotes
    //     }

    //     if (newLocation.building === "" || newLocation.address === "") {
    //         //prompt user to enter details
    //     } else {
    //         fetch("http://localhost:3001/locations",
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     'Content-Type': "application/json",
    //                 },
    //                 body: JSON.stringify(newLocation)
    //             })
    //             .then((data) => console.log(data))
    //             .then(() => {
    //                 return fetch('http://localhost:3001/table/Locations')
    //                     .then(res => res.json())
    //                     .then(data => {
    //                         setLocations(data);
    //                         return data;
    //                     })
    //             })
    //             .then((data) => {
    //                 console.log(data.length);
    //                 addTask(data.length);
    //             })

    //     }

    // }

    // const addTask = (location_id) => {
    //     //console.log("Location ID: ")
    //     //console.log(location_id)
    //     let newTask = {
    //         "user_id": parseInt(user_id),
    //         "location_id": location_id,
    //         "task_name": taskName,
    //         "task_description": taskDesc,
    //         "priority": taskPriority,
    //         "task_type": "personal",
    //         "mil_or_civ": mil_or_civ,
    //         "due_date": taskDueDate,
    //         "status": "incomplete",
    //         "has_upload": taskUpload,
    //         "has_download": taskDownload
    //     }

    //     if (newTask.task_name === "" || newTask.task_description === "" || newTask.priority === "" || newTask.location_id === "") {
    //         //prompt user to enter details
    //     } else {
    //         fetch(`http://localhost:3001/tasks/${oldTasks.id}`,
    //             {
    //                 method: "PATCH",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(newTask)
    //             })
    //             //.then((res) => res.json())
    //             .then((data) => console.log(data))
    //     }
    // }


    //add new location first
    const submitRequest = () => {
        if (showNewLocation) { //user adding a new location to a task
            //create a new location first
            addLocation();
        } else { //user adding an existing location to a task
            addTask(loc);
        }
        handleClose();
    }

    const addLocation = () => {
        let hours = locAMHours + " A.M. to " + locPMHours + " P.M.";
        let daysOfWeek = "";
        if (days.includes("M") && days.includes("T") && days.includes("W") && days.includes("T") && days.includes("F")) {
            hours = hours + " M-F";
        } else if (days.length === 0) {
            hours = "";
        } else {
            for (let i = 0; i < days.length; i++) {
                const element = days[i];
                daysOfWeek += element + ", ";
            }
            daysOfWeek = daysOfWeek.slice(0, daysOfWeek.length - 2);
            hours = hours + " " + daysOfWeek;
        }

        const newLocation = {
            "building": locBuilding,
            "room": locRoom,
            "address": locAddress,
            "phone_number": locPhone,
            "hours": hours,
            "url": locURL,
            "notes": locNotes
        }

        if (newLocation.building === "" || newLocation.address === "") {
            //prompt user to enter details
        } else {
            fetch("http://localhost:3001/locations",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify(newLocation)
                })
                .then((data) => console.log(data))
                .then(() => {
                    return fetch('http://localhost:3001/table/Locations')
                        .then(res => res.json())
                        .then(data => {
                            setLocations(data);
                            return data;
                        })
                })
                .then((data) => {
                    addTask(data.length);
                })
        }
    }

    const addTask = (location_id) => {
        let newTask = {
            "user_id": parseInt(user_id),
            "location_id": location_id,
            "task_name": taskName,
            "task_description": taskDesc,
            "priority": taskPriority,
            "task_type": newTaskType,
            "mil_or_civ": mil_or_civ,
            "due_date": taskDueDate,
            "status": "incomplete",
            "has_upload": taskUpload,
            "has_download": taskDownload
        }

        if (newTask.task_name === "" || newTask.task_description === "" || newTask.priority === "" || newTask.location_id === "") {
            //prompt user to enter details
        } else {
            fetch("http://localhost:3001/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTask)
                })
                .then((data) => console.log(data))
        }
    }




    //states for the Modal
    const handleClose = () => {
        setTaskTypeTitle('Add New Task')
        setCreateTableShow(false)
        setReFetch(!reFetch);
        setDefaultCheck(true);
        setShowNewLocation(false);
        setLoc(1);
        setDays([]);
        setMilOrCiv("military");
        setLocAddress("");
        setLocBuilding("");
        setLocRoom("");
        setTaskPriority("low");
        setLocAMHours("8");
        setLocPMHours("5");
        setLocPhone("");
        setLocURL("");
        setLocNotes("");
        setTaskUpload(false);
        setTaskDownload(false);
        console.log("Before: " + reFetch)
        setShow(false);
    };








    const handleShow = () => setShow(true);

    const handleCloseNewLocation = (e) => {
        setLoc(e);
        if (e !== "Add a new location") {
            setShowNewLocation(false);
        } else {
            setShowNewLocation(true);
        }
    }
    const handleCloseNewTaskType = (e) => {
        setTaskTypeTitle(e)
        setNewTaskType(e)
    }


    const handleCloseNewUserID = (e) => {

        setuserIDTitle(e)
        setuser_id(e)
    }



    const taskType = ["Installation", "Unit", "Job"]




    return (
        <>
            <Button className="btn btn-primary" onClick={handleCreateTableShow}>+</Button>
            <Modal show={createTableShow} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><h3>Create Task </h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>User Id</Form.Label>
                    <br></br>
                    <Col>
                        <Dropdown>

                            <DropdownButton  variant="dark" id="newTaskUserID" title={userIDTitle} onSelect={handleCloseNewUserID}>
                                {
                                    allIds.map((object) => <Dropdown.Item className="userDrop" eventKey={object.id}>{object.id}</Dropdown.Item>)
                                }
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                    <br></br>
                    <Row className="form-group">
                        <Form.Label for="newTaskName">Task Name*:</Form.Label>
                        <input type="text" id="newTaskName" placeholder="New Task Name" onBlur={handleTaskNameChange}></input>
                    </Row>
                    <br></br>
                    <Row className="form-group">
                        <Form.Label for="newTaskDesc">Task Description*: </Form.Label>
                        <textarea id="newTaskDesc" rows="4" cols="50" placeholder="New Task Description" onBlur={handleTaskDescChange}></textarea>
                    </Row>
                    <br></br>
                    <Form.Label>Task Type</Form.Label>
                    <br></br>
                    <Col>
                        <Dropdown>
                            <DropdownButton variant="dark" id="newTaskType" title={taskTypeTitle} onSelect={handleCloseNewTaskType}>
                                {
                                    //FIX on select
                                    taskType.map((type) => <Dropdown.Item eventKey={type}>{type}</Dropdown.Item>)
                                }
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                    <br></br>
                    <Row className="form-group">
                        <Form.Label for="newTaskDueDate">Due Date*: </Form.Label>
                        <Form.Control type="date" className="form-control" id="newTaskDueDate" onChange={handleTaskDueDateChange}></Form.Control>
                    </Row>
                    <br></br>
                    <Row className="form-group">
                        <Row>
                            <Form.Label for="newTaskPriority">Priority*: </Form.Label>
                        </Row>
                        <Row>
                            <Col>
                                <Dropdown>
                                    <DropdownButton variant="dark" id="newTaskPriority" onSelect={handleTaskPriorityChange} title={taskPriority}>
                                        <Dropdown.Item eventKey="low">Low</Dropdown.Item>
                                        <Dropdown.Item eventKey="medium">Medium</Dropdown.Item>
                                        <Dropdown.Item eventKey="high">High</Dropdown.Item>
                                    </DropdownButton>
                                </Dropdown>
                                <br></br>
                            </Col>
                        </Row>
                        <Row>
                            <span>
                                <Form.Label for="mil">Military</Form.Label>
                                <Form.Check type="radio" name="mil_or_civ" id="mil" value="military" inline defaultChecked={defaultCheck} onChange={handleTaskMilOrCivChange}></Form.Check>
                                <Form.Label for="mil">Civilian</Form.Label>
                                <Form.Check type="radio" name="mil_or_civ" id="civ" value="civilian" inline onChange={handleTaskMilOrCivChange}></Form.Check>
                                <Form.Label for="mil">Both</Form.Label>
                                <Form.Check type="radio" name="mil_or_civ" id="both" value="both" inline onChange={handleTaskMilOrCivChange}></Form.Check>
                            </span>
                        </Row>
                    </Row>
                    <br></br>
                    <Row className="form-group">
                        <Form.Label>Location</Form.Label>
                        <br></br>
                        <Col>
                            <Dropdown>
                                <DropdownButton variant="dark" id="newTaskLocation" title={loc !== "Add a new location" ? locations[loc - 1].building : "Add a new location"} onSelect={handleCloseNewLocation}>
                                    {
                                        //FIX on select
                                        locations.map((location) => <Dropdown.Item eventKey={location.id}>{location.building}</Dropdown.Item>)
                                    }
                                    <Dropdown.Item id="newLocation" eventKey="Add a new location">Add Location</Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                        </Col>
                        <br></br>
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
                                            <select id="newLocAMHours" defaultValue={8} onChange={handleLocAMHoursChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            <Form.Label> A.M. to </Form.Label>
                                            <select id="newLocPMHours" defaultValue={5} onChange={handleLocPMHoursChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
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
                                            <input type="checkbox" className="dayOfWeek" id="Sunday" value="S" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Monday">M</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Monday" value="M" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Tuesday">T</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Tuesday" value="T" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Wednesday">W</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Wednesday" value="W" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Thursday">Th</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Thursday" value="Th" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Friday">F</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Friday" value="F" onChange={handleLocDaysChange}></input>
                                            <Form.Label for="Saturday">S</Form.Label>
                                            <input type="checkbox" className="dayOfWeek" id="Saturday" value="S" onChange={handleLocDaysChange}></input>
                                        </span>
                                    </Row>
                                    <Row>
                                        <textarea id="newTaskNotes" rows="4" cols="50" placeholder="Notes" onBlur={handleLocNotesChange}></textarea>

                                    </Row>
                                </>

                                : <></>
                        }
                    </div>
                    <br></br>
                    <Row className="form-group">
                        <br></br>
                        <Col>
                            <Form.Label style={{ marginLeft: '10px' }} for="newTaskUpload">File Upload?</Form.Label>
                            <input type="checkbox" id="newTaskUpload" onChange={handleTaskUploadChange}></input>
                        </Col>
                        <Col>
                            <Form.Label for="newTaskDownload">File Download?</Form.Label>
                            <input type="checkbox" id="newTaskDownload" onChange={handleTaskDownloadChange}></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="dark" onClick={submitRequest}>Submit</Button>
                        </Col>
                        <Col>
                            <Button variant="dark" onClick={handleClose}>Cancel</Button>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

