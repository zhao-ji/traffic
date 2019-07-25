import React from 'react';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import './App.css';
import Home from './components/home';
import Trace from './components/trace';
import Edit from './components/edit';

function App() {
  return (
      <Router>
          <div>
              <Header />
              <hr />
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/trace" component={Trace} />
                  <Route path="/edit" component={Edit} />
                  <Route path="/about" render={() => <h3>about this project</h3>} />
                  <Route render={() => <h3>No Match</h3> } />
              </Switch>
          </div>
      </Router>
  );
}

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link to="/"> Traffic Monitor </Link>
            </Navbar.Brand>
            <Nav justify variant="pills">
                <Nav.Item>
                    <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/trace">Trace Route</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/edit">Edit Point and Route</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/about">About</Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
}

export default App;
