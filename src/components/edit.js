import React, {Component} from 'react';

import TableElement from './table';

export default class extends Component {
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
            <TableElement.AddressTable
                allAddress={this.props.edit.address.results}
                deleteAddress={this.props.deleteAddress}
                createAddress={this.props.createAddress}
                updateAddress={this.props.updateAddress}
                fetchRoute={this.props.fetchRoute}
            />
            <hr />
            <TableElement.RouteTable
                allAddress={this.props.edit.address.results}
                allRoute={this.props.edit.route.results}
                deleteRoute={this.props.deleteRoute}
                createRoute={this.props.createRoute}
                updateRoute={this.props.updateRoute}
                fetchTrace={this.props.fetchTrace}
            />
            <hr />
            <TableElement.TraceTable
                allTrace={this.props.edit.trace.results}
                deleteTrace={this.props.deleteTrace}
            />
            </>
        );
    }
}
