import React, {Component} from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';


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
                                (result, index) =>
                                    <AddressLineItem
                                        key={index} result={result}
                                        deleteAddress={this.props.deleteAddress}
                                        updateAddress={this.props.updateAddress}
                                        fetchRoute={this.props.fetchRoute}
                                    />
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

    showRelatedRoute = () => {
        this.props.fetchRoute({address_id: this.props.result.id});
    }

    startEdit = () => {
        this.setState({ isEditing: true});
    }

    cancelEditing = () => {
        this.setState({ isEditing: false, address: null, alias: null });
    }

    submit = () => {
        this.props.updateAddress({
            address_id: this.props.result.id,
            address: this.state.address,
            alias: this.state.alias,
        });
        this.cancelEditing();
    }

    onAddressChange = (event) => {
        this.setState({ address: event.target.value });
    }

    onAliasChange = (event) => {
        this.setState({ alias: event.target.value });
    }

    render() {
        return (
            <tr>
                <td>{this.props.result.id}</td>
                {this.state.isEditing
                        ?
                        <>
                        <td>
                            <Form.Control
                                type="text" onChange={this.onAddressChange}
                                defaultValue={this.state.address || this.props.result.address} />
                        </td>
                        <td>
                            <Form.Control
                                type="text" onChange={this.onAliasChange}
                                defaultValue={this.state.alias || this.props.result.alias} />
                        </td>
                        </>
                        :
                        <>
                            <td onClick={this.startEdit}>{this.props.result.address}</td>
                            <td onClick={this.startEdit}>{this.props.result.alias}</td>
                        </>
                }
                <td>{this.props.result.latitude}</td>
                <td>{this.props.result.longitude}</td>
                <td>
                    {this.state.isEditing
                            ?
                            <>
                            <Button variant="outline-warning" onClick={this.cancelEditing}>Cancel</Button>
                            <Button variant="outline-success" onClick={this.submit}>Submit</Button>
                            </>
                            :
                            <>
                            <Button variant="outline-danger" onClick={this.deleteAddress}>Delete</Button>
                            <Button variant="outline-info" onClick={this.showRelatedRoute}>Related Route</Button>
                            </>
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
            newMethod: null,
            newCron: null,
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

    onMethodChange = (event) => {
        if (this.state.isCreatingRoute) {
            this.setState({ newMethod: event.target.value });
        }
    }

    onCronChange = (event) => {
        if (this.state.isCreatingRoute) {
            this.setState({ newCron: event.target.value });
        }
    }

    onRouteSubmit = () => {
        this.props.createRoute({
            start: this.state.newStart,
            stop: this.state.newStop,
            method: this.state.newMethod,
            cron: this.state.newCron,
        });
        this.setState({
            isCreatingRoute: false,
            newStart: null,
            newStop: null,
            newMethod: null,
            newCron: null,
        });
    }

    render() {
        return (
            <Row>
                <Col md={{ span: 8, offset: 2}} lg={{ span: 8, offset: 2}}>
                    <h3>Route</h3>
                    <FontAwesomeIcon
                        className="float-right" style={{ margin: "0.3em"}}
                        icon={faPlus} size="2x" color="teal"
                        onClick={this.createRoute} />
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
                                (result, index) =>
                                    <RouteLineItem
                                        key={index} result={result}
                                        allAddress={this.props.allAddress}
                                        fetchTrace={this.props.fetchTrace}
                                        deleteRoute={this.props.deleteRoute}
                                        updateRoute={this.props.updateRoute}
                                    />
                            )}
                            {this.state.isCreatingRoute &&
                                <tr>
                                    <td></td>
                                    <td>
                                        <Form.Control as="select" onChange={this.onStartChange}>
                                        {this.props.allAddress.map(address => (
                                            <option value={ address.id }>{ address.address }</option>
                                        ))}
                                        </Form.Control>
                                    </td>
                                    <td>
                                        <Form.Control as="select" onChange={this.onStopChange}>
                                        {this.props.allAddress.map(address => (
                                            <option value={ address.id }>{ address.address }</option>
                                        ))}
                                        </Form.Control>
                                    </td>
                                    <td>
                                        <Form.Control as="select" onChange={this.onMethodChange}>
                                        <option default></option>
                                        <option value="0">Driving</option>
                                        <option value="1">Walking</option>
                                        <option value="2">Bicycling</option>
                                        <option value="3">Transite</option>
                                        </Form.Control>
                                    </td>
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
        this.state = {
            isEditing: false,
            start: null,
            stop: null,
            method: null,
            cron: null,
        };
    }

    fetchRelatedTrace = () => {
        this.props.fetchTrace({route_id: this.props.result.id});
    }

    deleteRoute = () => {
        this.props.deleteRoute({route_id: this.props.result.id});
    }

    startEdit = () => {
        this.setState({ isEditing: true});
    }

    cancelEditing = () => {
        this.setState({ isEditing: false, start: null, stop: null, method: null, cron: null });
    }

    submit = () => {
        this.props.updateRoute({
            route_id: this.props.result.id,
            start: this.state.start,
            stop: this.state.stop,
            method: this.state.method,
            cron: this.state.cron,
        });
        this.cancelEditing();
    }

    onStartChange = (event) => {
        this.setState({ start: event.target.value });
    }

    onStopChange = (event) => {
        this.setState({ stop: event.target.value });
    }

    onMethodChange = (event) => {
        this.setState({ method: event.target.value });
    }

    onCronChange = (event) => {
        this.setState({ cron: event.target.value });
    }

    render() {
        return (
            <tr>
                <td>{this.props.result.id}</td>
                {this.state.isEditing
                        ?
                        <>
                        <td>
                            <Form.Control as="select" onChange={this.onStartChange} defaultValue={this.props.result.start.id}>
                                {this.props.allAddress.map(address => (
                                    <option value={ address.id }>{ address.address }</option>
                                ))}
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control as="select" onChange={this.onStopChange} defaultValue={this.props.result.stop.id}>
                                {this.props.allAddress.map(address => (
                                    <option value={ address.id }>{ address.address }</option>
                                ))}
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control as="select" onChange={this.onMethodChange} defaultValue={this.props.result.method}>
                                <option value="0">Driving</option>
                                <option value="1">Walking</option>
                                <option value="2">Bicycling</option>
                                <option value="3">Transite</option>
                            </Form.Control>
                        </td>
                        <td><Form.Control type="text" onChange={this.onCronChange} defaultValue={this.props.result.cron}/></td>
                        </>
                        :
                        <>
                            <td onClick={this.startEdit}>
                                {this.props.result.start.alias || this.props.result.start.address}
                            </td>
                            <td onClick={this.startEdit}>
                                {this.props.result.stop.alias || this.props.result.stop.address}
                            </td>
                            <td onClick={this.startEdit}>{this.props.result.method}</td>
                            <td onClick={this.startEdit}>{this.props.result.cron}</td>
                        </>
                }
                <td>
                    {this.state.isEditing
                            ?
                            <>
                            <Button variant="outline-warning" onClick={this.cancelEditing}>Cancel</Button>
                            <Button variant="outline-success" onClick={this.submit}>Submit</Button>
                            </>
                            :
                            <>
                            <Button variant="outline-danger" onClick={this.deleteRoute}>Delete</Button>
                            <Button variant="outline-info" onClick={this.fetchRelatedTrace}> Related Trace </Button>
                            </>
                    }
                </td>
            </tr>
        );
    }
}


class TraceTable extends Component {
    render() {
        return (
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
                                this.props.allTrace.map(
                                    (result, index) =>
                                    <TraceLineItem key={index} result={result} deleteTrace={this.props.deleteTrace}/>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

class TraceLineItem extends Component {
    deleteTrace = () => {
        this.props.deleteTrace({
            id: this.props.result.id,
            route_id: this.props.result.route.id,
        });
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
                    <Button variant="outline-danger" onClick={this.deleteTrace}>Delete</Button>
                </td>
            </tr>
        );
    }
}


const TableElement = {
    AddressTable: AddressTable,
    RouteTable: RouteTable,
    TraceTable: TraceTable,
};

export default TableElement;
