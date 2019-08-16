import React, {Component} from 'react';
import {InputGroup, Form, Col, Button} from 'react-bootstrap';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "driving",
            start: "",
            stop: "",
        };
    }

    componentDidMount() {
        this.props.connect();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.websocket.connected && this.props.websocket.connected) {
            this.props.subscribe();
        }
    }

    componentWillUnmount() {
        if (this.props.websocket.connected) {
            this.props.disconnect();
        }
    }

    submit() {
        if (this.props.websocket.connected) {
            this.props.submit({
                type: "TRACE_ROUTE",
                method: this.state.method,
                start: this.state.start,
                stop: this.state.stop,
            });
        } else {
            console.log("connection failed");
        }
    }

    switch() {
        this.setState((prevState) => ({start: prevState.stop, stop: prevState.start}));
    }

    onMethodChange(event) {
        this.setState({ method: event.target.data });
    }

    onChange(type, event) {
        if (type === "start") {
            this.setState({ start: event.target.data });
        } else if (type === "stop") {
            this.setState({ stop: event.target.data });
        }
    }

    render()  {
        return (
            <>
            <Form.Row>
                <Form.Group as={Col} lg={3} md={3}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Method</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select" onChange={this.onMethodChange}>
                            <option value="driving">Driving</option>
                            <option value="walking">Walking</option>
                            <option value="bus">Bus</option>
                        </Form.Control>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col} lg={9} md={9}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Start/Stop</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="address or point"
                            defaultValue={this.state.start}
                            onChange={(event) => this.onChange("start", event)}
                        />
                        <Form.Control
                            type="text"
                            placeholder="address or point"
                            defaultValue={this.state.stop}
                            onChange={(event) => this.onChange("stop", event)}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={this.switch}>Reverse</Button>
                            <Button variant="outline-secondary" onClick={this.submit}>Go</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            </>
        );
    }
}
