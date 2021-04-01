import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {Link} from 'react-router-dom';
//bootstrap components
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";

function Navbars() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <h4><Link to='/'>Home</Link></h4>
          <h4><Link to='/teams'>Teams</Link></h4>
          <h4><Link to='/CreateResource'>Create Resource</Link></h4>
          <h4><Link to='/CreateTeam'>Create Team</Link></h4>
          <h4><Link to='/login'>Login</Link></h4>
          <h4><Link to='/signup'>Signup</Link></h4>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbars;
