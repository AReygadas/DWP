import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import swal from "sweetalert";

export default class contraseña extends React.Component {
  validaPass = (e) => {
    console.log(e);
    e.preventDefault();
    if (this.props.formValues.n_pass1 === this.props.formValues.n_pass2) {
      this.handleSubmit();
    } else {
      swal({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "warning",
        buttons: "Ok",
      });
    }
  };

  handleSubmit = async (e) => {
    let data = {
      email: this.props.formValues.n_cuenta,
      recovery_code: this.props.formValues.n_codigo,
      password: this.props.formValues.n_pass1,
      password_confirmation: this.props.formValues.n_pass2,
    };

    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      let res = await fetch(
        "http://35.167.62.109/storeutags/security/update_password",
        config
      );
      let json = await res.json();
      console.log(json);
      if (json.status === "success") {
        swal({
          title: "Actualizar",
          text: "Tu contraseña se actualizo correctamente",
          icon: "success",
          buttons: "Continuar",
        }).then((respuesta) => {
          window.location.href = "/login";
        });
      } else {
        swal({
          title: "Error",
          text: "Ocurrio un error!! - " + json.error_code,
          icon: "error",
          buttons: "Continuar",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <MDBContainer>
        <br></br>
        <MDBRow center>
          <MDBCol md="4">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.validaPass}>
                  <div>
                    <p className="h5 text-center mb-4">
                      Ingresa tu contraseña!!
                    </p>
                  </div>
                  <MDBRow>
                    <MDBCol>
                      <div className="grey-text">
                        <MDBInput
                          name="n_pass1"
                          label="Contraseña"
                          icon="key"
                          group
                          type="password"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.props.onChange}
                        />
                        <MDBInput
                          name="n_pass2"
                          label="Confirma Contraseña"
                          icon="key"
                          group
                          type="password"
                          validate
                          error="wrong"
                          success="right"
                          onChange={this.props.onChange}
                        />
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <div className="text-center">
                    <MDBBtn type="submit" outline color="info">
                      Enviar
                      <MDBIcon far icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
