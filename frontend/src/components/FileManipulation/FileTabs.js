
import React, { useState, useEffect, useContext } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FileUpload } from "./FileUpload";
import { GlobalContext } from '../../App';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { FileDownload } from './FileDownload';
//Stlying Imports
import "./file-arrow.css"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import "./FileTabs.css"
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import TableViewIcon from '@mui/icons-material/TableView';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Switch from '@mui/material/Switch';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';




export const FileTabs = () => {
    const [key, setKey] = useState('uploads');
    const [key2, setKey2] = useState('pdf');
    const [key3, setKey3] = useState('');
    const [key4, setKey4] = useState('imports');
    const [key5, setKey5] = useState('csv');
    const [key6, setKey6] = useState('');
    const [slideShow, setslideShow] = useState('');
    const [checked, setChecked] = useState(true);
    const [switchHeader, setSwitchHeader] = useState("File Management");


    const { userLogin, PDF, setPDF, CSV, setCSV, IMAGE, setIMAGE, fileIO, setfileIO, workingFolder, setWorkingFolder, setFileType, fileType } = useContext(GlobalContext)


    const handleChange = (event) => {
        console.log(event.target.checked)
        if (event.target.checked === false) {
            setSwitchHeader("Table Manipulation")
            setChecked(event.target.checked);
        } else if (event.target.checked === true) {
            setSwitchHeader("File Management")
            setChecked(event.target.checked);
        }
    };



    //Get PDF files
    useEffect(() => {
        if (userLogin.id && userLogin.file_id) {
            fetch(`http://localhost:3001/${fileIO}/${userLogin.id}/${userLogin.file_id}/pdf`)
                .then(data => { if (data.ok) { return data.json() } else { return null } })
                .then(json => {
                    setPDF(json);
                })
        }

    }, [userLogin])

    //Get CSV files
    useEffect(() => {
        if (userLogin.id && userLogin.file_id) {
            fetch(`http://localhost:3001/${fileIO}/${userLogin.id}/${userLogin.file_id}/csv`)
                .then(data => { if (data.ok) { return data.json() } else { return null } })
                .then(json => {
                    setCSV(json);
                })
        }

    }, [userLogin])

    //Get IMAGE files
    useEffect(() => {
        if (userLogin.id && userLogin.file_id) {
            fetch(`http://localhost:3001/${fileIO}/${userLogin.id}/${userLogin.file_id}/image`)
                .then(data => { if (data.ok) { return data.json() } else { return null } })
                .then(json => {
                    setIMAGE(json);
                })
        }

    }, [userLogin])

    return (
        <>


            <Container className='tabs'>
                <h5>{switchHeader} <Switch
                    checked={checked}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color='default'
                    onChange={handleChange}
                /></h5>
                <hr className="solid"></hr>
                {CSV && PDF && IMAGE ?

                    (<>{
                        checked ?

                            (
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => { setfileIO(k); setKey(k) }}
                                    className="mb-3"
                                >
                                    <Tab eventKey="uploads" title={<span><FileUploadIcon />{"Upload"}</span>}>
                                        <Tabs
                                            id="controlled-tab-Upload"
                                            activeKey={key2}
                                            onSelect={(k) => {
                                                if (k === 'pdf') {
                                                    setWorkingFolder(PDF); setFileType(k);
                                                } else if (k === 'csv') {
                                                    setWorkingFolder(CSV); setFileType(k);
                                                } else if (k === 'image') { setWorkingFolder(IMAGE); setFileType(k); }
                                            }}
                                            className="mb-3"
                                        >
                                            <Tab className="upload-PDF" eventKey="pdf" title={<span><ArticleIcon />{"PDF"}</span>}>
                                                <FileUpload />
                                            </Tab>
                                            <Tab className="upload-CSV" eventKey="csv" title={<span><TableViewIcon />{"CSV"}</span>}>

                                            </Tab>
                                            <Tab className="upload-IMAGE" eventKey="image" title={<span><ImageIcon />{"IMAGE"}</span>}>

                                            </Tab>

                                        </Tabs>
                                    </Tab>
                                    <Tab eventKey="downloads" title={<span>{"Download"}<Badge badgeContent={5} variant="dot" color="success">
                                        <DownloadIcon />
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
                                            <Tab className="PDF" eventKey="pdf"
                                                title={<span><Badge badgeContent={PDF.files.length} anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }} color="success">
                                                    <ArticleIcon />
                                                </Badge>{"PDF"}</span>}>
                                                <FileDownload />
                                            </Tab>


                                            <Tab className="CSV" eventKey="csv"
                                                title={<span><Badge badgeContent={CSV.files.length} anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }} color="success">
                                                    <TableViewIcon />
                                                </Badge>{"CSV"}</span>}>
                                                <FileDownload />
                                            </Tab>

                                            <Tab className="IMAGE" eventKey="image"
                                                title={<span><Badge badgeContent={IMAGE.files.length} anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }} color="success">
                                                    <ImageIcon />
                                                </Badge>{"IMAGE"}</span>}>
                                                <FileDownload />
                                            </Tab>

                                        </Tabs>
                                    </Tab>


                                </Tabs>



                            )

                            :

                            (
                                <Tabs
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


                                </Tabs>)}</>)
                    :
                    (null)
                }


            </Container >

        </>
    )

}