import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { isLogin } from "./utility";

import { Link } from "react-router-dom";

// bootstrap components
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";

function Navbars() {
  return (
    <Navbar className="sidebar" bg="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">
            <h1>Resourc.us</h1>
          </Link>
          <ul>
            <li>
              <Link to="/teams">All Teams</Link>
            </li>
            <li>
              <Link to="/">All Resources</Link>
            </li>

            {isLogin() ? (
              <li>
                <Link to="/myTeams">My Teams</Link>
              </li>
            ) : null}
            {/* <li><Link to='/CreateResource'>Create Resource</Link></li> */}
          </ul>
        </Nav>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbars;
