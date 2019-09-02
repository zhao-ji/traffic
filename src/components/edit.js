import React, {Component} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingRoute: false,
            isCreatingAddress: false,
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

    createRoute = () => {
        this.setState({ isCreatingRoute: true });
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
            <AddressTable
                allAddress={this.props.edit.address.results}
                deleteAddress={this.props.deleteAddress}
                createAddress={this.props.createAddress}
                updateAddress={this.props.updateAddress}
            />
            <hr />
            <RouteTable
                allRoute={this.props.edit.route.results}
                deleteRoute={this.props.deleteRoute}
                createRoute={this.props.createRoute}
                updateRoute={this.props.updateRoute}
                fetchTrace={this.props.fetchTrace}
            />
            <hr />
            {this.renderTrace()}
            </>
        );
    }
}


class AddressTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingAddress: false,
            newAddress: null,
            newAlias: null,
        };
    }

    createAddress = () => {
        this.setState({ isCreatingAddress: true });
    }

    onAddressChange= (event) => {
        if (this.state.isCreatingAddress) {
            this.setState({ newAddress: event.target.value });
        }
    }

    onAliasChange = (event) => {
        if (this.state.isCreatingAddress) {
            this.setState({ newAlias: event.target.value });
        }
    }

    onAddressSubmit = () => {
        this.props.createAddress({
            address: this.state.newAddress,
            alias: this.state.newAlias,
        });
        this.setState({
            isCreatingAddress: false,
            newAddress: null,
            newAlias: null,
        });
    }

    render() {
        return(
            <Row>
                <Col md={{ span: 8, offset: 2}} lg={{ span: 8, offset: 2}}>
                    <h3> Address </h3>
                    <FontAwesomeIcon className="float-right" style={{ margin: "0.3em"}}
                        icon={faPlus} size="2x" color="teal" onClick={this.createAddress}/>
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
                            {this.props.allAddress && this.props.allAddress.map(
                                (result, index) => <AddressLineItem key={index} result={result} deleteAddress={this.props.deleteAddress}/>
                            )}
                            {this.state.isCreatingAddress &&
                                <tr>
                                    <td></td>
                                    <td><Form.Control type="text" placeholder="Enter address" onChange={this.onAddressChange}/></td>
                                    <td><Form.Control type="text" placeholder="Enter alias" onChange={this.onAliasChange}/></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <Button variant="outline-success" onClick={this.onAddressSubmit}>Create</Button>
                                        <Button variant="outline-info" onClick={this.onAddressSubmitCancel}>Cancel</Button>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}


class AddressLineItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            address: null,
            alias: null,
        };
    }

    deleteAddress = () => {
        this.props.deleteAddress({address_id: this.props.result.id});
    }

    startEdit = () => {
        this.setState({ isEditing: true});
    }

    onAddressChange = (event) => {
        this.setState({ address: event.target.value });
    }

    render() {
        return (
            <tr>
                <td>{this.props.result.id}</td>
                <td onClick={this.startEdit} contentEditable={this.state.isEditing} onChange={this.onAddressChange}>{this.props.result.address}</td>
                <td>{this.props.result.alias}</td>
                <td>{this.props.result.latitude}</td>
                <td>{this.props.result.longitude}</td>
                <td>
                    {this.state.isEditing
                        ? <> <Button variant="outline-warning">Cancel</Button> <Button variant="outline-success">Submit</Button> </>
                        : <> <Button variant="outline-danger" onClick={this.deleteAddress}>Delete</Button> <Button variant="outline-info">Related Route</Button> </>
                    }
                </td>
            </tr>
        );
    }
}


class RouteTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreatingRoute: false,
            newStart: null,
            newStop: null,
        };
    }

    createRoute = () => {
        this.setState({ isCreatingRoute: true });
    }

    onStartChange= (event) => {
        if (this.state.isCreatingRoute) {
            this.setState({ newStart: event.target.value });
        }
    }

    onStopChange = (event) => {
        if (this.state.isCreatingRoute) {
            this.setState({ newStop: event.target.value });
        }
    }

    onRouteSubmit = () => {
        this.props.createRoute({
            start: this.state.newStart,
            stop: this.state.newStop,
        });
        this.setState({
            isCreatingRoute: false,
            newStart: null,
            newStop: null,
        });
    }

    render() {
        return(
            <Row>
                <Col md={{ span: 8, offset: 2}} lg={{ span: 8, offset: 2}}>
                    <h3>
                        Route
                    </h3>
                    <FontAwesomeIcon
                        className="float-right" style={{ margin: "0.3em"}}
                        icon={faPlus} size="2x" color="teal"
                        onClick={this.createRoute}
                    />
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
                            {this.props.allRoute && this.props.allRoute.map(
                                (result, index) => <RouteLineItem
                                    key={index} result={result}
                                    fetchTrace={this.props.fetchTrace} deleteRoute={this.props.deleteRoute}/>
                            )}
                            {this.state.isCreatingRoute &&
                                <tr>
                                    <td></td>
                                    <td><Form.Control type="text" placeholder="Enter start" onChange={this.onStartChange}/></td>
                                    <td><Form.Control type="text" placeholder="Enter stop" onChange={this.onStopChange}/></td>
                                    <td><Form.Control type="text" placeholder="Enter method" onChange={this.onMethodChange}/></td>
                                    <td><Form.Control type="text" placeholder="Enter cron" onChange={this.onCronChange}/></td>
                                    <td>
                                        <Button variant="outline-success" onClick={this.onRouteSubmit}>Create</Button>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}


class RouteLineItem extends Component {
    constructor(props) {
        super(props);
    }

    fetchRelatedTrace = () => {
        this.props.fetchTrace({route_id: this.props.result.id});
    }

    deleteRoute = () => {
        this.props.deleteRoute({route_id: this.props.result.id});
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
                    <Button variant="outline-danger" onClick={this.deleteRoute}>Delete</Button>
                    <Button variant="outline-info" onClick={this.fetchRelatedTrace}> Related Trace </Button>
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
                     <Button variant="outline-danger">Delete</Button>
                 </td>
             </tr>
         );
     }
 }
