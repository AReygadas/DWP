import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import ReCAPTCHA from "react-google-recaptcha";

const FormPage = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Registro</p>
                <div className="grey-text">
                  <MDBInput
                    label="Nombre Completo"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Telefono"
                    icon="mobile-alt"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Estado"
                    icon="map"
                    group
                    type="Text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Ciudad"
                    icon="map-marker-alt"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Contraseña"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                  <MDBInput
                    label="Confirma tu Contraseña"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />

                  <ReCAPTCHA sitekey="6LfUcjgaAAAAABlubDD75wuxfBUeiV9SS44JdZdF" />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Enviar
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;
