import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import swal from 'sweetalert';
import ReCAPTCHA from "react-google-recaptcha";

export default class Home extends React.Component {

    state = {
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        address: {
            city: "",
            state: ""
        },
        email: "",
        password: "",
        password_confirmation: ""
    };
    
    handleSubmit= async e => {
        e.preventDefault()
        try{
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'                    
                },
                body: JSON.stringify(this.state)
            }  
            let res = await fetch('http://35.167.62.109/storeutags/security/create_account',config)
            let json = await res.json()
          swal({
              title:"Usuario Registrado",
              text: "Recibirás un correo con la confirmación del registro",
              icon: "success",
              buttons: "Aceptar",
             }).then(respuesta=>{
                window.location.href = "/";
          })
          console.log(json)
        }
        catch(error){
            console.log(error)
        }
        console.log(this.state);
      }

    
      handleChange2 = e => {
        this.setState({
            address: {
            ...this.state.address,
            [e.target.name]: e.target.value,
          },
        });
    };

    handleChange = e => {
        this.setState({
        
            ...this.state,
            [e.target.name]: e.target.value,
        
        });
    };
  
      render(){
        
        return(
            <React.Fragment>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={this.handleSubmit}>
                                    <p className="h4 text-center py-4">Registro</p>
                                    <div className="grey-text">
                                    <MDBInput
                                        onChange={this.handleChange}
                                        value={this.state.first_name}
                                        name="first_name"
                                        label="Nombre Completo"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        required
                                    />
                                    <MDBInput
                                        onChange={this.handleChange}
                                        value={this.state.middle_name}
                                        name="middle_name"
                                        label="Apellido Paterno"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        required
                                    />
                                    <MDBInput
                                        onChange={this.handleChange}
                                        value={this.state.last_name}
                                        name="last_name"
                                        label="Apellido Materno"
                                        icon="user"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        required
                                    />

                                    <MDBInput
                                        onChange={this.handleChange}
                                        value={this.state.phone_number}
                                        name="phone_number"
                                        label="Telefono"
                                        icon="mobile-alt"
                                        group
                                        type="number"
                                        validate
                                        error="wrong"
                                        success="right"
                                        required
                                    />

                                    <MDBInput
                                        onChange={this.handleChange2}
                                        value={this.state.address.city}
                                        name="city"
                                        label="Ciudad"
                                        icon="map"
                                        group
                                        type="Text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        required
                                    />
                                    <MDBInput
                                        onChange={this.handleChange2}
                                        value={this.state.address.state}
                                        name="state"
                                        label="Estado"
                                        icon="map-marker-alt"
                                        group
                                        type="text"
                                        validate
                                        error="wrong"
                                        success="right"
                                        required
                                    />

                                    <MDBInput
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        name="email"
                                        label="email"
                                        icon="envelope"
                                        group
                                        type="email"
                                        validate
                                        error="wrong"
                                        success="right"
                                        required
                                    />
                                    <MDBInput
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        name="password"
                                        label="Contraseña"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                        required
                                    />

                                    <MDBInput
                                        onChange={this.handleChange}
                                        value={this.state.password_confirmation}
                                        name="password_confirmation"
                                        label="Confirma tu Contraseña"
                                        icon="lock"
                                        group
                                        type="password"
                                        validate
                                        required
                                    />
                                     <ReCAPTCHA
                                        sitekey="6LfUcjgaAAAAABlubDD75wuxfBUeiV9SS44JdZdF"
                                        
                                    />,
                            </div>
                        <div className="text-center py-4 mt-3">
                        <MDBBtn type="submit" color="cyan" >
                            Register 
                        </MDBBtn>
                        </div>
                    </form>
                    </MDBCardBody>
                </MDBCard>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
            </React.Fragment>
        )
    }

}