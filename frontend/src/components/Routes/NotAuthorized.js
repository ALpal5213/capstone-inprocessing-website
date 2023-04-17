
import { Navigate } from "react-router-dom";
import { Col, Row, Container } from 'react-bootstrap'
import '../Login/Login-create.css'

export const NotAuthorized = () => {

    return (
        <Col style={{ textAlign: 'center' }}>
            <div className='backDiv' >
                <div className='menuDiv loginDiv'>
                    <h1>401 Error / Unauthorized!</h1>
                </div>
            </div>
        </Col >


    )

}