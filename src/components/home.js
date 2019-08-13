import React, {Component} from 'react';
import Moment from 'moment';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  DiscreteColorLegend,
} from 'react-vis';

import utils from '../utils';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onLegendClick = this.onLegendClick.bind(this);
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

    onLegendClick(item, number) {
        console.log(item);
        console.log(number);
        this.props.flopLineSeriesVisibility({num: number});
    }

    render()  {
        const trafficData = this.props.traffic.results;
        if (trafficData.length <= 0) {
            return false;
        };

        let routes = trafficData.map(item => `${item["start"]} - ${item["stop"]}`);
        return (
            <>
            <DiscreteColorLegend 
                items={routes.map(route => {return {"title": route}})}
                orientation="horizontal"
                onItemClick={this.onLegendClick}
            />
            <Chart>
                {trafficData.map((route, index) => ( !route.disabled &&
                    <LineSeries key={index} data={route.data.map(item => ({x: Moment(item[0]), y: item[1]/60}))} />
                ))}
            </Chart>
            <br/>
            <br/>
            <br/>
            <div>
                <label> Choose Start Time: </label> <input type="datetime" id="start" />
                <label> Choose Stop Time: </label> <input type="datetime" id="stop" />
            </div>
            </>
        );
    }
}


class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 200;
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 300;
        return (
            <XYPlot width={w} height={h}>
                <HorizontalGridLines />
                <XAxis
                    title="Time"
                    tickFormat={d => Moment(d).format('MM-DD HH:MM')}
                    tickTotal={10}
                />
                <YAxis
                    title="Duration (min)"
                    tickValues={utils.range(0, 51, 5)}
                />
                {this.props.children}
            </XYPlot>
        );
    }
}
