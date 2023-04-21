import download from 'downloadjs';
import axios from 'axios';
import { Upload, Download } from "react-bootstrap-icons";
import { Progress } from '../Details/Progress';
import { Message } from '../Details/Message';
import { Accordion, Row, Col, Container, Button, Card } from "react-bootstrap";
import React, { useState, useCallback, useEffect, useContext } from 'react';
import "./FileUpload.css"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { GlobalContext } from '../../App';
import './FileDownload.css'
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import Pic from './guide.png'
import TablePic from './large-sample-csv.png'



export const FileDownload = () => {

    const { userLogin, PDF, setPDF, CSV, setCSV, IMAGE, setIMAGE, fileIO, setfileIO, workingFolder, setWorkingFolder, fileType, setFileType, checkAgain, setCheckAgain, reFetch, setReFetch } = useContext(GlobalContext)


    const [file, setFile] = useState([]);

    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('Greetings');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [show, setShow] = useState(false);
    const [imagesrc, setimagesrc] = useState('');
    const [fileURL, setFileURL] = useState();


    // const [fileType, setFileType] = useState('pdf');

    const [showCanvas, setShowCanvas] = useState(false);
    const handleCloseCanvas = () => setShowCanvas(false);
    const handleShowCanvas = () => setShowCanvas(true);








    const onDownloadFile = async e => {
        e.preventDefault();

        let index = e.target.id
        let filename = workingFolder.files[index]

        fetch(`http://localhost:3001/force-download/${userLogin.id}/${userLogin.file_id}/${fileType}/${filename}`).then(res => res.blob()).then(blob => download(blob))

    }


    //Get PDF Download files number
    useEffect(() => {
        if (userLogin.id && userLogin.file_id) {
            fetch(`http://localhost:3001/downloads/${userLogin.id}/${userLogin.file_id}/pdf`).then(data => { if (data.ok) { return data.json() } else { return null } }).then(json => {

                setPDF(json);
            })
        }

    }, [reFetch])

    //Get CSV Download files number
    useEffect(() => {
        if (userLogin.id && userLogin.file_id) {
            fetch(`http://localhost:3001/downloads/${userLogin.id}/${userLogin.file_id}/csv`).then(data => { if (data.ok) { return data.json() } else { return null } }).then(json => {

                setCSV(json);

            })
        }

    }, [reFetch])

    //Get IMAGE Download files number
    useEffect(() => {
        if (userLogin.id && userLogin.file_id) {
            fetch(`http://localhost:3001/downloads/${userLogin.id}/${userLogin.file_id}/image`).then(data => { if (data.ok) { return data.json() } else { return null } }).then(json => {

                setIMAGE(json);
            })
        }

    }, [reFetch])

    //Get FileURL
    useEffect(() => {
        if (userLogin.id && userLogin.file_id) {
            setFileURL(`http://localhost:3001/downloads/${userLogin.id}_${userLogin.file_id}/${fileType}`)
        }

    }, [workingFolder, reFetch])





    return (

        <>

            <br></br>
            <div style={{ textAlign: 'center' }}>
                <h5> Download {fileType.toUpperCase()}</h5>

            </div>
            <Container className='download-box'>

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
                                    <Button onClick={handleShowCanvas} variant="dark">
                                        <div className='file-up'>
                                            <label >
                                                {uploadedFile ? 'View All' : `Chosen File: ${uploadedFile.filename.slice(0, 20)}...`}
                                            </label>
                                        </div>
                                    </Button>

                                </form>
                            </Col>

                        </Row>


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
                    <Offcanvas show={showCanvas} placement={'end'} onHide={handleCloseCanvas}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title> {userLogin.fullname}'s {fileType.toUpperCase()}s</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {workingFolder.files.map((file, index) => {


                                return (
                                    < Card  >
                                        {fileType === 'pdf' ?
                                            <Card.Img variant="top" src={Pic} alt='' />
                                            :
                                            fileType === 'csv' ?
                                                <Card.Img variant="top" src={TablePic} alt='' />
                                                :
                                                fileType === 'image' ?
                                                    <Card.Img variant="top" src={`${fileURL}/${file}`} alt='' />
                                                    :
                                                    null
                                        }
                                        <Card.Body>
                                            <Card.Title>{file.slice(0, 15)}...`</Card.Title>

                                            <Button id={index} onClick={onDownloadFile} size="sm" variant="info">Download</Button>
                                        </Card.Body>
                                    </Card>)
                            }


                            )}

                        </Offcanvas.Body>
                    </Offcanvas>


                </Row>
            </Container >
        </>


    )
}


// className='custom-file-label' htmlFor='customFile'