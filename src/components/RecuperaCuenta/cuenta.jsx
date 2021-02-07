import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput,MDBCard,MDBCardBody} from 'mdbreact';
import swal from 'sweetalert';

export default class cuenta extends React.Component{
//Peticion al servidor, envia correo y regresa el success
    handleSubmit= async e => {
        let data = {email:this.props.formValues.n_cuenta} //JSON 
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
            let res = await fetch('http://35.167.62.109/storeutags/security/request_recovery_code',config)
            let json = await res.json()//Validar si es exitoso
        
            console.log(json)
        if(json.status==="success"){
            this.props.onClick()

        }else{
            swal({ 
                title:"Error",
                text: "Password did'nt update correctly, try again " + json.error_code,
                icon: "error",
                buttons: "OK",
               }).then(respuesta=>{
                  
            })
        }
             
            
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        return(
           <MDBContainer>
               <br></br>
               <br></br>
                <MDBRow center>
                    <MDBCol md="4">
                        <MDBCard>
                            <MDBCardBody>
                                <form onSubmit={this.handleSubmit}>
                                    <p className="h5 text-center mb-4">Account</p>
                                    <div className="grey-text">
                                        <MDBInput 
                                            name="n_cuenta"
                                            label="Your email" 
                                            icon="envelope" 
                                            group type="email" 
                                            validate error="wrong" 
                                            success="right" 
                                            onChange={this.props.onChange}
                                        />
                                    </div>
                                    <div className="text-center">
                                    <MDBBtn type="submit" outline color="info" >
                                        Send
                                        <MDBIcon far icon="paper-plane" className="ml-1" />
                                    </MDBBtn>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}