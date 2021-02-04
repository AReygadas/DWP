import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

export default class cuenta extends React.Component{

    handleSubmit= async e => {
        let data = {email:this.props.formValues.n_cuenta}
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
            let json = await res.json()
            console.log(json)
            this.props.onClick()
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
                        <p className="h5 text-center mb-4">Subscribe</p>
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