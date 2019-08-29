import React from 'react';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import Container from "./containers";
import './App.css';

export default function App () {
    return (
        <Router>
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/home">
                    <Navbar.Brand>Auckland Traffic</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <LinkContainer to="/home">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/edit">
                        <Nav.Link>Edit</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/trace">
                        <Nav.Link>Trace</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar>
            <br/>
            <br/>
            <Switch>
                <Route exact path="/home" component={Container.Home} />
                <Route path="/trace" component={Container.Trace} />
                <Route path="/edit" component={Container.Edit} />
            </Switch>
        </Router>
    );
}
