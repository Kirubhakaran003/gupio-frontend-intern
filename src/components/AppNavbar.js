import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Gupio Store</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Products</Nav.Link>
          <Nav.Link as={Link} to="/favourites">Favourites</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
