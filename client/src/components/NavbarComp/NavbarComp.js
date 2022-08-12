import React from "react";
import styles from "./NavbarComp.module.css";

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../action/auth.action";
const NavbarComp = ({ user, logoutAction }) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Coders' Arena
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {user === false ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/Register">
                    SignUp
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={"span"} onClick={() => logoutAction()}>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logoutAction })(NavbarComp);
