import Container from 'react-bootstrap/Container';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const AppNavBar = () => {
  return (
    <Navbar bg="dark" variant='dark' export="lg">
      <Container>
        <Navbar.Brand href="#home">Welcome to Wright-Patterson AFB</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Nav.Link href="#home">support</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#map">Map</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#Logout">Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}



export default AppNavBar;