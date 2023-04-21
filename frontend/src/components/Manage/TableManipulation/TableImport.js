import React, { useContext, useEffect, useState } from 'react';
import { Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import Cookies from 'js-cookie';
import download from 'downloadjs';
import axios from 'axios';




import "./TableImport.css"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { GlobalContext } from '../../../App';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import DoneIcon from '@mui/icons-material/Done';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import TableViewIcon from '@mui/icons-material/TableView';














export const TableImport = () => {



    const { userLogin, PDF, setPDF, CSV, setCSV, IMAGE, setIMAGE, fileIO, setfileIO, workingFolder, setWorkingFolder, fileType, setFileType, checkAgain, setCheckAgain, reFetch, setReFetch } = useContext(GlobalContext)

    const [tableQuery, setTableQuery] = useState()

    const [snackopen, setSnackOpen] = useState(false);
    const [snack2open, setSnack2Open] = useState(false);
    const [queryTrigger, setQueryTrigger] = useState(false);
    const [show, setShow] = useState(false);



    const [tableButtonTitle, setTableButtonTitle] = useState(<>Import Table <TableViewIcon /></>)

    const [allTables, setAllTables] = useState([{}]);
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState([]);
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [imagesrc, setimagesrc] = useState('');

    const [Announcements, setAnnouncements] = useState(false);
    const [Tasks, setTasks] = useState(false);
    const [Users, setUsers] = useState(false);
    const [Locations, setLocations] = useState(false);
    const [Role, setRole] = useState(false);
    const [Manage, setManage] = useState(false);
    const [Units, setUnits] = useState(false);
    const [Jobs, setJobs] = useState([]);
    const [workingTable, setWorkingTable] = useState([])





    //File Upload
    const onChangeFile = async e => {
        e.preventDefault();
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setShow(true)
        setUploadedFile(true)

    }

    const onSubmitFile = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);



        try {
            const res = await axios.post(`http://localhost:3001/import-table/${userLogin.id}/${userLogin.file_id}/${filename}/${tableQuery}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            });

            setReFetch(!reFetch);
            handleSnackOpen();
            handleClose();

        } catch (err) {
            handleSnack2Open();
        }

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







    const handleClose = () => { setTableQuery(); setUploadedFile(false); setShow(false) };
    const handleShow = () => setShow(true);

    const seedtables = ["Jobs", "Units", "Manage", "Role", "Locations", "Users", "Tasks", "Announcements"]







    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Users`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setUsers(data)

        })



    }, [reFetch])


    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Jobs`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setJobs(data)

        })



    }, [reFetch])
    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Units`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setUnits(data)

        })



    }, [reFetch])



    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Manage`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setManage(data)

        })



    }, [reFetch])



    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Role`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setRole(data)

        })



    }, [reFetch])

    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Locations`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setLocations(data)

        })



    }, [reFetch])

    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Announcements`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setAnnouncements(data)

        })



    }, [reFetch])
    useEffect(() => {

        // seedtables.map((table) => {

        fetch(`http://localhost:3001/uberids/Tasks`).catch(() => setTableQuery()).then(data => data.json()).then(data => {
            console.log(data)
            return setTasks(data)

        })



    }, [reFetch])






    const handleTableTitle = (e) => {
        console.log(e)
        if (e === "Jobs") {
            setWorkingFolder(Jobs)
            setTableQuery(e)
            setShow(true)
        } else if (e === "Units") {
            setWorkingFolder(Units)
            setTableQuery(e)
            setShow(true)
        } else if (e === "Manage") {
            setWorkingFolder(Manage)
            setTableQuery(e)
            setShow(true)
        } else if (e === "Role") {
            setWorkingFolder(Role)
            setTableQuery(e)
            setShow(true)
        } else if (e === "Locations") {
            setWorkingFolder(Locations)
            setTableQuery(e)
            setShow(true)
        } else if (e === "Users") {
            setWorkingFolder(Users)
            setTableQuery(e)
            setShow(true)
        } else if (e === "Tasks") {
            setWorkingFolder(Tasks)
            setTableQuery(e)
            setShow(true)
        } else if (e === "Announcements") {
            setWorkingFolder(Announcements)
            setTableQuery(e)
            setShow(true)
        }



    }




    return (
        <>
            <DropdownButton id="table-import" variant="dark" title={tableButtonTitle} onSelect={handleTableTitle}>
                {

                    seedtables.map((table, i) => <Dropdown.Item key={i} eventKey={table}>{table}</Dropdown.Item>)
                }
            </DropdownButton>
            <Modal id="import-table" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Import To Table: "{tableQuery}" </Modal.Title>
                </Modal.Header>
                <Modal.Body>Your new table must start with ID {workingFolder.length + 1} and must completely omit the header row for a successful import. Continue?</Modal.Body>
                <Modal.Footer>
                    {!uploadedFile ? <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                        :
                        <Button variant="info" onClick={onSubmitFile}>
                            Submit
                        </Button>}

                    <Button variant="dark">
                        <div className='file-up'>
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChangeFile}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                {uploadedFile ? `Chosen File: ${filename.slice(0, 15)}...` : 'Choose File'}
                            </label>
                        </div>
                    </Button>
                </Modal.Footer>
            </Modal>


            <Snackbar
                open={snack2open}
                autoHideDuration={6000}
                onClose={handleSnack2Close}
                message={`!`}
                action={action2}
                bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
            >
                <SnackbarContent style={{
                    backgroundColor: 'teal',
                }}
                    message={<span id="client-snackbar"><NotificationImportantIcon /> {`The import was unsuccessful! Please check your csv file.`}</span>}
                />
            </Snackbar>
            <Snackbar
                open={snackopen}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                message={`!`}
                action={action}
                bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
            >
                <SnackbarContent style={{
                    backgroundColor: 'teal',
                }}
                    message={<span id="client-snackbar"><DoneIcon /> {`The import was successful! Please check the database to verify.`}</span>}
                />
            </Snackbar>


        </>

    )
}