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
                        </tbody>
                    </Table>
                </Col>
            </Row>
            </>
        );
    }
}
