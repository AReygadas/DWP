import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { DataContext } from '../Context';

export const Login =()=> {

    const [mail, setEmail] = useState("")
    const [pass, setPassword] = useState("")
    const [checked, setChecked] = useState(false);
    const aut = useContext(DataContext)

    const handleClik = async e =>{
        let user ={
            'email': mail,
            'password': pass
        }
        try{
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'                    
                }, body: JSON.stringify(user)
            }  
            let res = await fetch('http://35.167.62.109/storeutags/security/login',config)
            let json = await res.json()
         
            if(json.status==="success"){
                 swal({
                    title:"Welcome!!",
                    text: json.data.customer.full_name,
                    icon: "success",
                    buttons: "Ok",
                   }).then(respuesta=>{

                    console.log(json)                          
                    aut.activateAuth(json.data.session_id)
                    aut.activateName(json.data.customer.full_name)
                    window.location.href = "/";
                })
            }else{
                swal({
                    title:"Error",
                    text: "An error has occurred!! - "+json.error_code,
                    icon: "error",
                    buttons: "Ok",
                })               
            }            
        }
        catch(error){
            console.log(error)
        }        
    }

    const chek0 = e =>{
        console.log(checked)
    }
        return(
            <React.Fragment>
               <MDBContainer>
                    <MDBRow>

                    <MDBCol size="8">

                    <br></br>   <br></br>
                    <br></br>   <br></br>
                   
 <button onClick={aut.activateAuth}>{aut.name}</button>
                    
                    
                    </MDBCol>
                    <MDBCol md="4">
                    <br></br>   <br></br>
                    <br></br>   <br></br>
                            <MDBCard>
                                <MDBCardBody>
                                    <form>
                                        <p className="h5 text-center mb-4">Sign in</p>
                                        <div className="grey-text">
                                        <MDBInput 
                                            label="Type your email" 
                                            icon="envelope" 
                                            group type="email" 
                                            validate error="wrong"
                                            success="right" 
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        <MDBInput 
                                            label="Type your password" 
                                            icon="lock" 
                                            group type="password" 
                                            validate
                                            onChange={e => setPassword(e.target.value)}    
                                        />
                                        </div>
                                        
                                        <div className="custom-control custom-checkbox ">
                                            <input 
                                                type="checkbox" className="custom-control-input" id="defaultChecked2" 
                                                defaultChecked={checked}
                                                onChange={() => setChecked(!checked)}
                                            />
                                            <label className="custom-control-label" htmlFor="defaultChecked2">Remember Me</label>
                                        </div>
                                        <br/><br/><br/>

                                        <div className="text-center">
                                            <Link to="/recupera"><p>Did you forget your password?</p></Link>
                                        </div>
                                        <div className="text-center">
                                            <MDBBtn gradient="blue" onClick={handleClik}>Login</MDBBtn>
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