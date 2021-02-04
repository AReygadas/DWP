import React from 'react';
import {Link} from 'react-router-dom'

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';


export default class Login extends React.Component {
    render(){

        return(
            <React.Fragment>
               <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                        <form>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                            <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                success="right" />
                            <MDBInput label="Type your password" icon="lock" group type="password" validate />
                            </div>
                            <div className="text-center">
                                <Link to="/recupera"><h5>Olvidaste tu contraseña?</h5></Link>
                            </div>
                            <div className="text-center">
                            <MDBBtn>Login</MDBBtn>
                            </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
                    </MDBContainer>
            </React.Fragment>
        )
    }
}