import React, {Component} from 'react';
import { Form } from "react-bootstrap";
import Moment from 'moment';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineMarkSeries
} from 'react-vis';

import range from '../utils';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.isConnected) {
            this.props.subscribe();
        }
    }

    render()  {
        if (!("home" in this.props.traffic.data.results)) {
            return false;
        };
        let routes = this.props.traffic.data.results.map(item => `${item["source"]} - ${item["dest"]}`);
        return (
            <>
            <Chart>
                <LineMarkSeries
                    xType="time"
                    style={{
                        strokeWidth: '3px'
                    }}
                    lineStyle={{stroke: 'red'}}
                    markStyle={{stroke: 'blue'}}
                    data={
                        this.props.traffic.data.results.home.city.map(item => ({x: Moment(item[0]), y: item[1]/60}))
                    }
                />
                <LineMarkSeries
                    curve={'curveMonotoneX'}
                    data={
                        this.props.traffic.data.results.home.korean_shop.map(item => ({x: Moment(item[0]), y: item[1]/60}))
                    }
                />
            </Chart>
            <div>
                {routes.map(route =>
                    <Form.Check type="checkbox" label={route} onClick={() => {routes[route] = !routes[route]}} />
                )}
            </div>
            <div>
                <input type="datetime" id="start" />
                <input type="datetime" id="stop" />
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
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 200;
        return (
            <XYPlot width={w} height={h} margin={{left: 400}}>
                <HorizontalGridLines />
                <XAxis
                    title="Time"
                    tickFormat={d => Moment(d).format('MM-DD HH:MM')}
                    tickTotal={10}
                />
                <YAxis
                    title="Duration (min)"
                    tickValues={range(0, 51, 5)}
                />
                {this.props.children}
            </XYPlot>
        );
    }
}
