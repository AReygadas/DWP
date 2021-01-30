import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, 
MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";

class Navbar extends Component {
state = {
  collapseID: ""
};

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

render() {
  return (
    <MDBContainer>
      <MDBNavbar color="info-color" dark expand="md" style={{ marginTop: "20px" }}>
        <MDBNavbarBrand>
          <strong className="white-text">MDBNavbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/login">
                <MDBIcon icon="key" className="mr-1" />LogIn</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/SingUp">
                <MDBIcon icon="user-plus" className="mr-1" />SingUp</MDBNavLink>
            </MDBNavItem>
           {/*  <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="mr-1" />Perfil
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBDropdownItem href="#!">Mi cuenta</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Cerrar Sesion</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>*/}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      </MDBContainer>
    );
  }
}

export default Navbar;