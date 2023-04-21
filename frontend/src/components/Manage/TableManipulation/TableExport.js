import React, { useContext, useEffect, useState } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Cookies from 'js-cookie';
import download from 'downloadjs';


import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import TableViewIcon from '@mui/icons-material/TableView';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./TableExport.css"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { GlobalContext } from '../../../App';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import DoneIcon from '@mui/icons-material/Done';















export const TableExport = () => {



    const { userLogin } = useContext(GlobalContext)

    const [tableQuery, setTableQuery] = useState()
    const [tableButtonTitle, setTableButtonTitle] = useState(<>Export Table <FileDownloadIcon /></>)
    const [snack2open, setSnack2Open] = useState(false);
    const [queryTrigger, setQueryTrigger] = useState(false);

    useEffect(() => {
        if (userLogin.file_id && userLogin.session_id) {
            let session_id = Cookies.get("session_id")

            fetch(`http://localhost:3001/force-export/${userLogin.id}/${userLogin.file_id}/${userLogin.session_id}/${tableQuery}`)
                .catch(() => console.log('Server Error')).then(data => data.blob()).then(blob => { handleSnack2Open(); download(blob) })

        }
    }, [queryTrigger])






    const handleTableTitle = (e) => {
        console.log(e)
        setQueryTrigger(!queryTrigger)
        setTableQuery(e)

    }




    const handleSnack2Close = (e) => {

        setSnack2Open(false);
    };




    const handleSnack2Open = (e) => {

        setSnack2Open(true);
    };




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







    ;

    const seedtables = ["Jobs", "Units", "Manage", "Role", "Locations", "Users", "Tasks", "Announcements"]




    return (
        <>
            <DropdownButton id="table-export" variant="dark" title={tableButtonTitle} onSelect={handleTableTitle}>
                {

                    seedtables.map((table, i) => <Dropdown.Item key={i} eventKey={table}>{table}</Dropdown.Item>)
                }
            </DropdownButton>



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
                    message={<span id="client-snackbar"><DoneIcon /> {`${tableQuery} Exported!`}</span>}
                />
            </Snackbar>
            {/* <Tabs
                id="controlled-tab-example"
                activeKey={key4}
                onSelect={(k) => { setfileIO(k); setKey4(k) }}
                className="mb-3"
            >
                <Tab eventKey="imports" title={<span><AddCircleIcon /> {"Import"}</span>}>
                    <Tabs
                        id="controlled-tab-Imports"
                        activeKey={key5}
                        onSelect={(k) => {

                            setWorkingFolder(CSV); setFileType(k);

                        }}
                        className="mb-3"
                    >

                        <Tab className="import-CSV" eventKey="csv" title={<span><TableViewIcon />{"CSV"}</span>}>
                            <FileUpload />
                        </Tab>


                    </Tabs>
                </Tab>
                <Tab eventKey="exports" title={<span>{"Export"} <Badge badgeContent={8} variant='dot' color="success">
                    <ExitToAppIcon />
                </Badge></span>}>

                    <Tabs
                        id="controlled-tab-Download"
                        activeKey={key3}
                        onSelect={(k) => {
                            if (k === 'pdf') {
                                setWorkingFolder(PDF); setFileType(k); setKey3(k);
                            } else if (k === 'csv') {
                                setWorkingFolder(CSV); setFileType(k); setKey3(k)
                            } else if (k === 'image') { setWorkingFolder(IMAGE); setFileType(k); setKey3(k) }
                        }

                        }
                        className="mb-3"
                    >



                        <Tab className="TABLES" eventKey="tables"
                            title={<span><Badge badgeContent={8} anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }} color="success">
                                <TableViewIcon />
                            </Badge>{"Tables"}</span>}>
                            <FileDownload />
                        </Tab>
                    </Tabs>
                </Tab>


            </Tabs> */}

        </>

    )
}