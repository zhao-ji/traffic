import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import './App.css';
import Home from './components/home';
import Trace from './components/trace';
import Edit from './components/edit';

import trafficActions from './actions/traffic';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render()  {
        return (
            <Router>
                <div>
                    <Header />
                    <hr />
                    <Switch>
                        <Route exact path="/" render={(props) => <Home
                                {...props}
                                connect={this.props.connect}
                                fetchTrafficData={this.props.fetchTrafficData}
                                trafficData={this.props.traffic}
                            />} />
                        <Route path="/trace" component={Trace} />
                        <Route path="/edit" component={Edit} />
                    </Switch>
                </div>
            </Router>
        );
    }
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
            </Nav>
        </Navbar>
    );
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        ...trafficActions,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
