import React, { createContext, useState, Redirect } from 'react'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const sessionValidate = async e =>{
        let status = false
        let id = {'session_id':window.sessionStorage.getItem('session_id')}
        try{
            let config = {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'                    
                }, body: JSON.stringify(id)
            }  
            let res = await fetch('http://35.167.62.109/storeutags/security/ping',config)
            let json = await res.json()
         console.log(json)
            if(json.status==="success"){
                status = true
                    console.log(status+'-uno')   
                 swal({
                    title:"Welcome!!",
                    text: json.data.customer.full_name,
                    icon: "info",
                    buttons: "Ok",
                   }).then(respuesta=>{
                            
                    
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
        console.log(status)  
        setIsAuth(status)
    }
   
    const [ IsAuth, setIsAuth] = useState( () => {
           
          return sessionValidate()
        //hasta aqui me quedo hay que verificar si el id esta vigente.
    })
    const [ name, setName ] = useState(() => {
        return window.sessionStorage.getItem('full_name')
    })

    const value ={
        name,
        activateName:nam => {
            setName(nam)
            return window.sessionStorage.setItem('full_name', nam)
        },
        IsAuth,
        activateAuth:session_id => {
            setIsAuth(true)
            window.sessionStorage.setItem('session_id', session_id)
        },        
        removeAuth:()=> {
            setIsAuth(false)
            window.sessionStorage.removeItem('session_id')
            window.sessionStorage.removeItem('full_name')
        }
    }

    return(
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    )
}


