
 import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, 
MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";
import {DataContext} from '../../Context'


class Navbar extends Component {
  static contextType = DataContext
  state = {
    collapseID: ""
  };

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

render() {
  const cont = this.context
  return (
      <MDBNavbar color="primary-color"
      dark
      expand="md"
      fixed="top"
      scrolling
      transparent>
        <MDBNavbarBrand>
          <MDBNavLink className="waves-effect waves-light" to="/">
            <strong className="white-text">Home</strong></MDBNavLink>
         
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
          <MDBNavbarNav right>
          {cont.IsAuth ?
           <React.Fragment>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" className="mr-1" />{cont.name}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>
                      <MDBDropdownItem href="#!">Mi cuenta</MDBDropdownItem>
                      <MDBDropdownItem onClick={cont.removeAuth}>Cerrar Sesion</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </React.Fragment>
              : 
              <React.Fragment>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/login">
                  <MDBIcon icon="key" className="mr-1" />LogIn</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="/SingUp">
                  <MDBIcon icon="user-plus" className="mr-1" />SingUp</MDBNavLink>
                </MDBNavItem>
              </React.Fragment> 
              }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navbar;