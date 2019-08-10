import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import './App.css';

import Home from './components/home';
import Trace from './components/trace';
import Edit from './components/edit';

import trafficActions from './actions/traffic';
import websocketActions from './actions/websocket';

function renderHome(props, globalProps) {
    if (globalProps.websocket.connected) {
        return (
            <Home
                {...props}
                subscribe={globalProps.subscribe}
                flopLineSeriesVisibility={globalProps.flopLineSeriesVisibility}
                data={globalProps.traffic.data.results}
                period={globalProps.traffic.period}
            />
        );
    }
    return false;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.connect();
    }

    render()  {
        return (
            <Router>
                <div>
                    <Header />
                    <hr />
                    <Switch>
                        <Route exact path="/" render={(props) => renderHome(props, this.props)} />
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
        <div>
            <span>
                <Link to="/">Home</Link>
            </span>
            <span>
                <Link to="/trace">Trace</Link>
            </span>
            <span>
                <Link to="/edit">Edit Route</Link>
            </span>
        </div>
    );
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        ...trafficActions,
        ...websocketActions,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
