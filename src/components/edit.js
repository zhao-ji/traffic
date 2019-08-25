import React, {Component} from 'react';
import {ListGroup, InputGroup, Form, Row, Col, Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.connect();
    }

    componentWillUnmount() {
        if (this.props.websocket.connected) {
            this.props.disconnect();
        }
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.websocket.connected && this.props.websocket.connected) {
            this.props.fetchAddress({});
            this.props.fetchRoute({});
        }
    }

    renderTrace() {
        return (
            <>
            <hr />
            <Row>
                <Col md={{ span: 8, offset: 2}} lg={{ span: 8, offset: 2}}>
                    <h3>
                        Trace
                    </h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Route</th>
                                <th>Duration</th>
                                <th>Distance</th>
                                <th>Time</th>
                                <th>Operate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !this.props.edit.trace.results.isLoading &&
                                this.props.edit.trace.results.map(
                                    (result, index) => <TraceLineItem key={index} result={result} />
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </>
        );
    }

    render() {
        return (
            <>
            <Row>
                <Col md={{ span: 8, offset: 2}} lg={{ span: 8, offset: 2}}>
                    <h3>
                        Address
                    </h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Address</th>
                                <th>Alias</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Operate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !this.props.edit.address.results.isLoading &&
                                this.props.edit.address.results.map(
                                    (result, index) => <AddressLineItem key={index} result={result} />
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={{ span: 8, offset: 2}} lg={{ span: 8, offset: 2}}>
                    <h3>
                        Route
                    </h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Start</th>
                                <th>Stop</th>
                                <th>Method</th>
                                <th>Cron</th>
                                <th>Operate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !this.props.edit.route.results.isLoading &&
                                this.props.edit.route.results.map(
                                    (result, index) =>
                                    <RouteLineItem
                                        key={index} result={result}
                                        fetchTrace={this.props.fetchTrace}
                                    />
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            {this.renderTrace()}
            </>
        );
    }
}


class AddressLineItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <tr>
                <td>{this.props.result.id}</td>
                <td>{this.props.result.address}</td>
                <td>{this.props.result.alias}</td>
                <td>{this.props.result.latitude}</td>
                <td>{this.props.result.longitude}</td>
                <td>
                    <button>Delete</button>
                    <button>Related Route</button>
                </td>
            </tr>
        );
    }
}


class RouteLineItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <tr>
                <td>{this.props.result.id}</td>
                <td>{this.props.result.start.alias || this.props.result.start.address}</td>
                <td>{this.props.result.stop.alias || this.props.result.stop.address}</td>
                <td>{this.props.result.method}</td>
                <td>{this.props.result.cron}</td>
                <td>
                    <button>Delete</button>
                    <button onClick={() => this.props.fetchTrace({route_id: this.props.result.id})}>
                        Related Trace
                    </button>
                </td>
            </tr>
        );
    }
}


class TraceLineItem extends Component {
     constructor(props) {
         super(props);
         this.state = {
         };
     }
 
     render() {
         return (
             <tr>
                 <td>{this.props.result.id}</td>
                 <td>{this.props.result.route.id}</td>
                 <td>{(this.props.result.duration/60).toFixed(2)} min</td>
                 <td>{(this.props.result.distance/1000).toFixed(2)} km</td>
                 <td>{this.props.result.created_at}</td>
                 <td>
                     <button>Delete</button>
                 </td>
             </tr>
         );
     }
 }
