import Container from 'react-bootstrap/Container';
import { useContext, useState, useEffect } from 'react'
import { Bootstrap } from 'react-bootstrap-icons';
import { StyleHTMLAttributes } from 'react';
import './Profile.css'
import Nav from 'react-bootstrap/Nav';
import { GlobalContext } from '../../App';

const Profile = () => {
    const { userLogin, currentUser } = useContext(GlobalContext);
    const [unit, setUnit] = useState({ unit_name: "" });
    const [job, setJob] = useState({ job_name: "" });

    useEffect(() => {

        fetch(`http://localhost:3001/table/Units/${userLogin.unit_id}`)
            .then(res => res.json())
            .then(data => {
                setUnit(data[0])
            })

        fetch(`http://localhost:3001/table/Jobs/${userLogin.job_id}`)
            .then(res => res.json())
            .then(data => {
                setJob(data[0])
                console.log(data)
            })

    }, [userLogin])

    return (
        <div className="container">
            <div className="panel-body inf-content">
                <div className="row">
                    <div className="col-md-4">
                        <img alt="" className="img-circle img-thumbnail isTooltip" src="https://bootdey.com/img/Content/avatar/avatar7.png" data-original-title="Usuario"></img>
                    </div>
                    <div className="col-md-6">
                        <strong>Information</strong><br></br><br></br>
                        <div className="table-responsive">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>ID </strong>
                                        </td>
                                        <td>
                                            <div> {userLogin.id} </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Full Name</strong>
                                        </td>
                                        <td>
                                            <div>{userLogin.fullname} </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Username</strong>
                                        </td>
                                        <td>
                                            <div>{userLogin.username}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Admin</strong>
                                        </td>
                                        <td>
                                            <div>{`${userLogin.is_admin}`}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Supervisor</strong>
                                        </td>
                                        <td>
                                            <div>{`${userLogin.is_supervisor}`}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Is Military</strong>
                                        </td>
                                        <td>
                                            <div>{`${userLogin.is_military}`}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Job Name: </strong>
                                        </td>
                                        <td>
                                            <div>{job.job_name}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Unit Name: </strong>
                                        </td>
                                        <td>
                                            <div>{unit.unit_name}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Email</strong>
                                        </td>
                                        <td>
                                            <div> {userLogin.username}@gmail.com</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;