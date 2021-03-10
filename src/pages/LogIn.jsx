//Importamos dependencias y componentes

import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { ColCien } from "./styles";
import { DataContext } from "../Context";
// Componente Loguin
export const Login = () => {
  // Variables para el manejo del formulario de logueo
  const [mail, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  //importamos variables globales de el context
  const aut = useContext(DataContext);
  //Metodo para formar el Json que pide la api
  const handleClik = async (e) => {
    // let es para declarar variables
    let user = {
      email: mail,
      password: pass,
    };
    try {
      //Configuracion de la peticion
      let config = {
        method: "POST", //Metodo de peticion
        headers: {
          //Los headers de la peticion que no cambian
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //Los datos en json que pide la API
        body: JSON.stringify(user),
      };
      //La llamada a la Api
      let res = await fetch(
        "http://35.167.62.109/storeutags/security/login",
        config
      );
      //Atrapamos la respuesta de la api
      let json = await res.json();

      if (json.status === "success") {
        //Imprimimos en consola el Json
        console.log(json);
        //Utilizamos las variables globales para autenticar al usuario
        // y guardar la sesion en sessionStorage
        aut.activateAuth(json.data.session_id);
        aut.activateName(json.data.customer.full_name);
        if (aut.IsChek) {
          window.location = "/";
        } else {
        }
      } else {
        //manda el mensaje de error con de la API
        swal({
          title: "Error",
          text: "An error has occurred!! - " + json.error_code,
          icon: "error",
          buttons: "Ok",
        });
      }
    } catch (error) {
      //Atrapamos los errores que no controla la api
      console.log(error);
    }
  };
  //Verificar si la cuenta debe ser recordada
  const chek0 = (e) => {
    aut.acticateChek(e.target.checked);
  };

  return (
    <React.Fragment>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="8"></MDBCol>

          <MDBCol md="4">
            <br />
            <br />
            <br />
            <br />
            <br />
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h5 text-center mb-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="custom-control custom-checkbox ">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="defaultChecked2"
                      checked={aut.IsChek}
                      onChange={chek0}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="defaultChecked2">
                      Remember Me
                    </label>
                  </div>
                  <br />
                  <br />
                  <br />

                  <div className="text-center">
                    <Link to="/recupera">
                      <p>Did you forget your password?</p>
                    </Link>
                  </div>
                  <div className="text-center">
                    <MDBBtn gradient="blue" onClick={handleClik}>
                      Login
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
};
