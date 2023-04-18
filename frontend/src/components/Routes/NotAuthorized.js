
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App";
import { Col, Row, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import './NotAuthorized.css'
import Cookies from 'js-cookie'





export const NotAuthorized = () => {
    const { userAuth } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 250);
    }, []);


    return (
        <>
            {!loading ?

                (<Col style={{ textAlign: 'center' }}>
                    <div className='authbackDiv' >
                        <div className='authmenuDiv loginDiv'>
                            <div className="error-Header">
                                <h1>401 Error / Unauthorized!</h1>
                            </div>
                            <div className="btn-goBack">
                                <Button onClick={() => navigate('/')} variant="success">
                                    Back To Home
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col >
                )

                :
                (<div className='authbackDiv' ></div>)

            }

        </>
    )

}