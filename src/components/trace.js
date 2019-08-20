import React, {Component} from 'react';
import {InputGroup, Form, Row, Col, Button} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "driving",
            start: null,
            stop: null,
        };

        this.onMethodChange = this.onMethodChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.switch = this.switch.bind(this);
    }

    componentDidMount() {
        this.props.connect();
    }

    componentWillUnmount() {
        if (this.props.websocket.connected) {
            this.props.disconnect();
        }
    }

    submit() {
        if (this.props.websocket.connected) {
            this.props.fetchTraceData({
                type: "FETCH_TRACE_DATA_TRY",
                start: this.state.start,
                stop: this.state.stop,
                method: this.state.method,
            });
        } else {
            console.log("connection failed");
        }
    }

    switch() {
        this.setState((prevState) => ({start: prevState.stop, stop: prevState.start}));
    }

    onMethodChange(event) {
        this.setState({ method: event.target.value });
    }

    onChange(type, event) {
        if (type === "start") {
            this.setState({ start: event.target.value });
        } else if (type === "stop") {
            this.setState({ stop: event.target.value });
        }
    }

    renderTable() {
        const google = this.props.trace.google;
        if (google.isLoading || !google.result) {
            return false;
        }
        return (
            <Row>
                <Col md={{ span: 8, offset: 2}} lg={{ span: 8, offset: 2}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Source</th>
                                <th>Duration</th>
                                <th>Distance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Google </td>
                                <td> {google.result.duration} </td>
                                <td> {google.result.distance} </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }

    renderLoadingIcon() {
        const google = this.props.trace.google;
        if (!google.isLoading) {
            return false;
        }
        return (
            <div style={{textAlign: "center"}}>
                <FontAwesomeIcon icon={faSpinner} size="lg" spin />
            </div>
        );
    }

    render()  {
        return (
            <>
            <Form.Row>
                <Form.Group as={Col} lg={{ span: 3, offset: 1}} md={{span: 3, offset: 1}}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Method</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" onChange={this.onMethodChange}>
                            <option value="driving">Driving</option>
                            <option value="walking">Walking</option>
                            <option value="transit">Transit</option>
                            <option value="bicycling">Bicycling</option>
                        </Form.Control>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} lg={7} md={7}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Start/Stop</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            as="input"
                            type="search"
                            placeholder="address or point"
                            defaultValue={this.state.start}
                            key={"start" + this.state.start}
                            onChange={(event) => this.onChange("start", event)}
                            autoFocus
                        />
                        <Form.Control
                            as="input"
                            type="search"
                            placeholder="address or point"
                            defaultValue={this.state.stop}
                            key={"stop" + this.state.stop}
                            onChange={(event) => this.onChange("stop", event)}
                            autoFocus
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.switch}>Reverse</Button>
                            <Button variant="outline-secondary" onClick={this.submit}>Go</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            {this.renderTable()}
            {this.renderLoadingIcon()}
            </>
        );
    }
}
