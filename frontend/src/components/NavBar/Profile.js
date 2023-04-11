import Container from 'react-bootstrap/Container';
import React from 'react';
import { Bootstrap } from 'react-bootstrap-icons';
import { StyleHTMLAttributes } from 'react';
import Nav from 'react-bootstrap/Nav';
const Profile = () => {
    return (
        <div class="container bootstrap snippets bootdey">
            <div class="panel-body inf-content">
                <div class="row">
                    <div class="col-md-4">
                        <img alt="" class="img-circle img-thumbnail isTooltip" src="https://bootdey.com/img/Content/avatar/avatar7.png" data-original-title="Usuario"></img>
                    </div>
                    <div class="col-md-6">
                        <strong>Information</strong><br></br><br></br>
                        <div class="table-responsive">
                            <table class="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span class="glyphicon glyphicon-asterisk text-primary"></span>
                                                Identificacion
                                            </strong>
                                        </td>
                                        <td>
                                            <span class="text-primary"></span>
                                            123456789
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span class="text-primary"></span>
                                                Name
                                            </strong>
                                        </td>
                                        <td class="text-primary">
                                            Bootdey
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span class="glyphicon glyphicon-cloud text-primary"></span>
                                                Lastname
                                            </strong>
                                        </td>
                                        <td class="text-primary">
                                            Bootstrap
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span class="glyphicon glyphicon-bookmark text-primary"></span>
                                                Username
                                            </strong>
                                        </td>
                                        <td class="text-primary">
                                            bootnipets
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span class="glyphicon glyphicon-eye-open text-primary"></span>
                                                Role
                                            </strong>
                                        </td>
                                        <td class="text-primary">
                                            Admin
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>
                                                <span class="glyphicon glyphicon-envelope text-primary"></span>
                                                Email
                                            </strong>
                                        </td>
                                        <td class="text-primary">
                                            noreply@email.com
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <table>
        //     <tbody>
        //         <tr>
        //             <td>First Name</td>
        //             {/* <td>${name1}</td> */}
        //         </tr>
        //         <tr>
        //             <td>Last Name</td>
        //             {/* <td>${name2}</td> */}
        //         </tr>
        //         <tr>
        //             <td>Role</td>
        //             {/* <td>${name2}</td> */}
        //         </tr>
        //         <tr>
        //             <td>Email</td>
        //             {/* <td>${email}</td> */}
        //         </tr>
        //         <tr>
        //             <td>Password</td>
        //             {/* <td>${pswrd}</td> */}
        //         </tr>
        //     </tbody>
        // </table>
    )
}
export default Profile;