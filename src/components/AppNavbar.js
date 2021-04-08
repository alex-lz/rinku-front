import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/employee">Empleados</NavbarBrand>
      <NavbarBrand tag={Link} to="/movement">Movimientos</NavbarBrand>
      <NavbarBrand tag={Link} to="/sueldo">Sueldo</NavbarBrand>
      <NavbarToggler onClick={this.toggle}/>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="http://gitlab.coppel.io/alex">GitLabCoppel</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>;
  }
}