import React from "react";
import { Container, Image, Navbar, NavbarBrand, Nav,NavbarText } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" expand="md">
      <Container>
        <NavbarBrand as={Link} to="/">
          <Image
            src="./images/verizon-red-icon-black.png"
            alt="Verizon Icon"
            width="40"
            height="60"
            fluid
          />
          <Image
            src="./images/DQaaSlogo.png"
            alt="DQaaS Logo"
            width="60"
            height="60"
            fluid
          />
        </NavbarBrand>

        <Navbar.Toggle aria-controls="main-navbar" className="d-none" />
        <Navbar.Collapse id="main-navbar">
        <Nav className="mx-auto">
          <Nav.Item> 
            <h5 className="text-white fw-bolder">Data Quality As a Service</h5>
          </Nav.Item>
        </Nav>

        <Nav>
          <Nav.Item> 
            <Image src="./images/beta3.png" alt="Beta" width="40" height="50" />
          </Nav.Item> 
        </Nav>
        
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
