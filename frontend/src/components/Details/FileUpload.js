import axios from 'axios';
import { Upload, Download } from "react-bootstrap-icons";
import { Progress } from './Progress';
import { Message } from './Message';
import { Accordion, Row, Col, Container, Button } from "react-bootstrap";
import React, { useState, useCallback, useEffect } from 'react';





 export const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState();
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [show, setShow] = useState(false);
    const [imagesrc, setimagesrc] = useState('');

 
 
 
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


    <>
    <br></br>
    <h5> Upload Documents</h5>
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




)




 }
