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

export default class codigo extends React.Component {
  handleSubmit = async (e) => {
    let data = {
      email: this.props.formValues.n_cuenta,
      recovery_code: this.props.formValues.n_codigo,
    };
    e.preventDefault();
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
        "http://35.167.62.109/storeutags/security/validate_recovery_code",
        config
      );
      let json = await res.json();
      console.log(json);
      if (json.status === "success") {
        this.props.onClick();
      } else {
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
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <p className="h5 text-center mb-4">
                      Ha recibido un correo electrónico con un código de
                      verificación, verifique su correo electrónico
                    </p>
                  </div>
                  <MDBRow>
                    <MDBCol>
                      <div className="grey-text">
                        <MDBInput
                          name="n_codigo"
                          label="Code"
                          icon="key"
                          group
                          type="number"
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
