import React from "react";
import Cuenta from "../components/RecuperaCuenta/cuenta";
import Codigo from "../components/RecuperaCuenta/codigo";
import Contraseña from "../components/RecuperaCuenta/contraseña";
import { MDBBtn } from "mdbreact";

export default class recuperaCuenta extends React.Component {
  state = {
    xcu: false,
    xco: false,
    xps: false,
    n_cuenta: "",
    n_codigo: "",
    n_pass1: "",
    n_pass2: "",
  };
  handleX = (e) => {
    this.setState({
      ...this.state,
      xco: true,
      xcu: true,
    });
    console.log(this.state);
  };
  handleY = (e) => {
    this.setState({
      ...this.state,
      xps: true,
    });
    console.log(this.state);
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  render() {
    let contenido;

    if (this.state.xcu == false) {
      contenido = (
        <Cuenta
          onChange={this.handleChange}
          formValues={this.state}
          onClick={this.handleX}
        />
      );
    }
    if (this.state.xco == true) {
      contenido = (
        <Codigo
          onChange={this.handleChange}
          formValues={this.state}
          onClick={this.handleY}
        />
      );
      if (this.state.xps == true) {
        contenido = (
          <Contraseña
            onChange={this.handleChange}
            formValues={this.state}
            onClick={this.handleZ}
          />
        );
      }
    }

    return <React.Fragment>{contenido}</React.Fragment>;
  }
}
