import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Modal, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";

import { GlobalContext } from '../../../App';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './CreateTask.css'
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import DoneIcon from '@mui/icons-material/Done';
import NoteAddIcon from '@mui/icons-material/NoteAdd';



export const CreateTask = () => {

    const navigate = useNavigate();

    const { reFetch, setReFetch, userLogin, modifyTableShow, setModifyTableShow, modifyTableQuery, setmodifyTableQuery, createTableShow, setCreateTableShow, manageRoute, setManageRoute } = useContext(GlobalContext);
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
    const [snackopen, setSnackOpen] = useState(false);
    const [snack2open, setSnack2Open] = useState(false);
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
    const [taskTypeTitle, setTaskTypeTitle] = useState("Select  New Task Type");
    const [newTaskType, setNewTaskType] = useState("");
    const [allIds, setAllIds] = useState([{ "id": '' }, { "id": '' }]);
    const [userIDTitle, setuserIDTitle] = useState('Select a User fullname');
    const [user_id, setuser_id] = useState('');
    const [statusTitle, setStatusTitle] = useState("Add Status");
    const [status, setStatus] = useState("incomplete");

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
        " mil_or_civ"
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



    const handleSnackClose = (e) => {

        setSnackOpen(false);
    };




    const handleSnackOpen = (e) => {

        setSnackOpen(true);
    };




    const handleSnack2Close = (e) => {

        setSnack2Open(false);
    };




    const handleSnack2Open = (e) => {

        setSnack2Open(true);
    };





    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const action2 = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnack2Close}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );








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

                setAllIds(data)

            })
    }, [])


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
            "status": status,
            "has_upload": taskUpload,
            "has_download": taskDownload

        }

        if (newTask.task_name === "" || newTask.task_description === "" || newTask.priority === "" || newTask.location_id === "" || newTask.user_id === "" || newTask.task_type === "" || newTask.status === "") {
            //prompt user to enter details
            handleSnackOpen();
        } else {
            
            fetch("http://localhost:3001/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTask)
                })
                .then((data =>{ handleSnack2Open(); typeof(manageRoute) === 'string' ? (setManageRoute(3)) : (setManageRoute('a'))}))
       }
    }




    //states for the Modal
    const handleClose = async () => {
setuserIDTitle("Select a user fullname")
        setTaskPriority("")
        setNewTaskType("")
        setuser_id("")
        setStatus("")
        setTaskTypeTitle('Select a New Task')
        setCreateTableShow(false)
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
        let selectedUser = allIds.find(object => object.fullname === e)
        setuserIDTitle(e)
        console.log(selectedUser.id)
        setuser_id(selectedUser.id)
    }



    const taskType = ["installation", "unit", "job", "personal"]

    const handleStatusChange = (e) => {

        setStatusTitle(e)
        setStatus(e)

    }


    return (
        <>
            <Button className="create-table-show" variant="dark" onClick={handleCreateTableShow}>Create Task<NoteAddIcon /></Button>
            <Modal show={createTableShow} onHide={handleClose}>
                <Modal.Header>
                    <Row>
                        <Col>
                            <h3 id="modal-title">Create New Task</h3>
                        </Col>

                        <Col style={{ textAlign: 'end' }}>
                            <Dropdown>
                                <DropdownButton variant="info" id="newTaskStatus" onSelect={handleStatusChange} title={statusTitle}>
                                    <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
                                    <Dropdown.Item eventKey="incomplete">Incomplete</Dropdown.Item>
                                </DropdownButton>
                            </Dropdown>
                        </Col>
                    </Row>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>User Full Name</Form.Label>
                    <br></br>
                    <Col>
                        <Dropdown>

                            <DropdownButton variant="dark" id="newTaskUserID" title={userIDTitle} onSelect={handleCloseNewUserID}>
                                <div className="dropdownScrollBar">
                                    {
                                        allIds.map((object, i) => <div key={i} ><Dropdown.Item className="userDrop" eventKey={object.fullname}>{object.fullname} | {object.id}</Dropdown.Item></div>)
                                    }
                                </div>
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
                                    taskType.map((type, i) => <Dropdown.Item key={i} eventKey={type}>{type}</Dropdown.Item>)
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
                                        locations.map((location, i) => <Dropdown.Item key={i} eventKey={location.id}>{location.building}</Dropdown.Item>)
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
                            <Button variant="info" onClick={submitRequest}>Submit</Button>
                        </Col>
                        <Col>
                            <Button variant="dark" onClick={handleClose}>Cancel</Button>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
            <Snackbar
                open={snackopen}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                message={`!`}
                action={action}
                bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
            >
                <SnackbarContent style={{
                    backgroundColor: 'teal',
                }}
                    message={<span id="client-snackbar"><NotificationImportantIcon /> {`Please ensure all fields are filled in before submitting!`}</span>}
                />
            </Snackbar>
            <Snackbar
                open={snack2open}
                autoHideDuration={3000}
                onClose={handleSnack2Close}
                message={`!`}
                action={action2}
                bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
            >
                <SnackbarContent style={{
                    backgroundColor: 'teal',
                }}
                    message={<span id="client-snackbar"><DoneIcon/> {`Task Created!`}</span>}
                />
            </Snackbar>
        </>
    )
}

