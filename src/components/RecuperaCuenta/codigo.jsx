import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

export default class codigo extends React.Component{

    handleSubmit= async e => {
        let data = {
            email:this.props.formValues.n_cuenta,
            recovery_code:this.props.formValues.n_codigo
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
            let res = await fetch('http://35.167.62.109/storeutags/security/validate_recovery_code',config)
            let json = await res.json()
            console.log(json)
            
            this.props.onClick()
        }
        catch(error){
            console.log(error)
        }
        console.log("Ya casi casi");
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
                                name="n_codigo"
                                label="Codigo" 
                                icon="key" 
                                group 
                                type="number" 
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
