import axios from 'axios';
import { Upload, Download } from "react-bootstrap-icons";
import { Progress } from '../Details/Progress';
import { Message } from '../Details/Message';
import { Accordion, Row, Col, Container, Button } from "react-bootstrap";
import React, { useState, useCallback, useEffect, useContext } from 'react';
import "./FileUpload.css"
import { GlobalContext } from '../../App';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';









export const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState();
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [show, setShow] = useState(false);
    const [imagesrc, setimagesrc] = useState('');
    const { userLogin, PDF, setPDF, CSV, setCSV, IMAGE, setIMAGE, fileIO, setfileIO, workingFolder, setWorkingFolder, fileType, setFileType, checkAgain, setCheckAgain, reFetch, setReFetch } = useContext(GlobalContext)
    const [open, setOpen] = useState(false);




    const handleClick = (e) => {
        setOpen(true);
    };

    const handleClose = (e) => {

        setOpen(false);
    };






    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );




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
            const res = await axios.post(`http://localhost:3001/upload/${userLogin.id}/${userLogin.file_id}/${fileType}/${filename}`, formData, {
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
            //Update Downloads
            setReFetch(!reFetch);
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
            console.log(res.data)
            const { fileName, filePath } = res.data;
            setCheckAgain(!checkAgain)
            setUploadedFile({ fileName, filePath });
            setOpen(true)
            setimagesrc({ filePath, fileName })
            setTimeout(() => setimagesrc(), 10000);

        } catch (err) {
            console.log(err)

            if (err) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
            setUploadPercentage(0)
        }
    };




    return (

        <>
            <br></br>
            <div style={{ textAlign: 'center' }}>
                <h5> Upload {fileType.toUpperCase()}</h5>

            </div>
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
                                    <Button variant="dark">
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
                        <Button onClick={onSubmitFile} variant="info">
                            <label className='custom-file-label' htmlFor='customFile'>
                                {filename ? (<><Upload /> {filename.slice(0, 15)}</>) : (`Upload File`)}
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
                                <div className='col-md-6 m-auto' style={{textAlign:'center'}}>
                                    <img style={{ width: '100%' }} src={imagesrc.filePath} alt='' />
                                    <h9 className='text-center'>{imagesrc.fileName}</h9>
                                </div>
                            </div>
                        ) : null}
                    </Col>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={`Uploaded ${filename}! `}
                        action={action}
                        bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
                    >
                        <SnackbarContent style={{
                            backgroundColor: 'teal',
                        }}
                            message={<span id="client-snackbar">{`Uploaded ${filename} to ${userLogin.fullname}'s personal folder!`}</span>}
                        />
                    </Snackbar>


                </Row>
            </Container >
        </>


    )




}
