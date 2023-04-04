import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import buggin from './assets/buggin.png';
import AuthService from '../utils/auth';

const auth = AuthService;

function Sidebar({ handleShow, handleProjectShow }) {


  return (

      <div className="sidebar">
        <Navbar collapseOnSelect expand="lg" variant="dark" className="nav-box">
          <Navbar.Brand as="div" className="sidebar-title">
            <Image src={buggin} className="buggin-logo"/>
            <div className="buggin-title">DBUG</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto flex-column sidebar-list">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <NavDropdown title="Projects" active="false" className="nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">My Projects</NavDropdown.Item> */}
                <NavDropdown.Item href="/allprojects">All Projects</NavDropdown.Item>

                <NavDropdown.Item href="/myprojects">My Projects</NavDropdown.Item>

                <NavDropdown.Item onClick={handleProjectShow}>New Project</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Tickets" active="false" className="nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">My Tickets</NavDropdown.Item> */}
                <NavDropdown.Item href="/alltickets">All Tickets</NavDropdown.Item>

                <NavDropdown.Item href="/mytickets">My Tickets</NavDropdown.Item>

                <NavDropdown.Item onClick={handleShow}>New Ticket</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={auth.logout}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  );
}

export default Sidebar;
