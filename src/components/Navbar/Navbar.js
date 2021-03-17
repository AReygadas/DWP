import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer,
  MDBIcon,
} from "mdbreact";
import "./styles.css";
import { Logo, Home } from "./styles";
import { CounterCart } from "../counterCar/carCounter";
import { DataContext } from "../../Context";
import logo from "./Logo.png";
class Navbar extends Component {
  static contextType = DataContext;
  state = {
    collapseID: "",
  };
  toggleCollapse = (collapseID) => () =>
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));

  render() {
    const cont = this.context;
    return (
      <MDBNavbar
        color="bgdegrad"
        dark
        expand="md"
        fixed="top"
        scrolling
        transparent>
        <MDBNavbarBrand>
          <MDBNavLink className="waves-effect waves-dark" to="/">
            <Logo src={logo} />
            <Home>Inicio</Home>
          </MDBNavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav right>
            {cont.IsAuth ? (
              <React.Fragment>
                <MDBNavItem>
                  <MDBNavLink
                    className="waves-effect waves-light"
                    to="/products">
                    <CounterCart />
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" className="mr-1" />
                      {cont.name}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>
                      <MDBDropdownItem href="#!">Mi cuenta</MDBDropdownItem>
                      <MDBDropdownItem onClick={cont.removeAuth}>
                        Cerrar Sesion
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-darck" to="/login">
                    <MDBIcon icon="key" className="mr-1" />
                    Iniciar sesión
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-darck" to="/SingUp">
                    <MDBIcon icon="user-plus" className="mr-1" />
                    Regístrate
                  </MDBNavLink>
                </MDBNavItem>
              </React.Fragment>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}
export default Navbar;
