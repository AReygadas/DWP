import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import swal from 'sweetalert';

export default class contraseña extends React.Component{

    handleSubmit= async e => {
        let data = {
            email:this.props.formValues.n_cuenta,
            recovery_code:this.props.formValues.n_codigo,
            password:this.props.formValues.n_pass1,
            password_confirmation:this.props.formValues.n_pass2
        }
        e.preventDefault()
        try{
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'                    
                },
                body: JSON.stringify(data)
            }  
            let res = await fetch('http://35.167.62.109/storeutags/security/update_password',config)
            let json = await res.json()
            console.log(json)
            swal({ //
                title:"Actualizado",
                text: "Contraseña actualizada con exito!!",
                icon: "success",
                buttons: "Aceptar",
               }).then(respuesta=>{
                  window.location.href = "/login";
            })//
        }
        catch(error){
            console.log(error)
        }
        
    }
    render(){
        return(
           <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <p className="h5 text-center mb-4">Haz recibido un correo con un código de verificación revisa tu correo!!</p>
                        </div>
                        <MDBRow>
                        <MDBCol sm="4">
                        <div className="grey-text">
                            <MDBInput 
                                name="n_pass1"
                                label="Contraseña" 
                                icon="key" 
                                group 
                                type="password" 
                                validate error="wrong" 
                                success="right" 
                                onChange={this.props.onChange}
                            />
                            <MDBInput 
                                name="n_pass2"
                                label="Repite Contraseña" 
                                icon="key" 
                                group 
                                type="password" 
                                validate error="wrong" 
                                success="right" 
                                onChange={this.props.onChange}
                            />
                         </div>
                        </MDBCol>
                        </MDBRow>
                        <div className="text-center">
                        <MDBBtn type="submit" outline color="info" >
                            Enviar
                            <MDBIcon far icon="paper-plane" className="ml-1" />
                        </MDBBtn>
                        </div>
                    </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
