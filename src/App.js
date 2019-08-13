import React from 'react';
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import Container from "./containers";
import './App.css';

export default function App () {
    return (
        <Router>
            <div>
                <ul>
                    <li className="tab">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="tab">
                        <Link to="/trace">Trace</Link>
                    </li>
                    <li className="tab">
                        <Link to="/edit">Edit Route</Link>
                    </li>
                </ul>
                <hr />
                <Switch>
                    <Route exact path="/" component={Container.Home} />
                    <Route path="/trace" component={Container.Trace} />
                    <Route path="/edit" component={Container.Edit} />
                </Switch>
            </div>
        </Router>
    );
}
