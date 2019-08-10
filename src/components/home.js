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

import range from '../utils';


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onLegendClick = this.onLegendClick.bind(this);
    }

    componentDidMount() {
        this.props.subscribe();
    }

    onLegendClick(item, number) {
        console.log(item);
        console.log(number);
        this.props.flopLineSeriesVisibility({num: number});
    }

    render()  {
        if (this.props.data.length <= 0) {
            return false;
        };
        let routes = this.props.data.map(item => `${item["start"]} - ${item["stop"]}`);
        return (
            <>
                <DiscreteColorLegend 
                    items={routes.map(route => {return {"title": route}})}
                    orientation="horizontal"
                    onItemClick={this.onLegendClick}
                />
            <Chart>
                {this.props.data.map(route => ( !route.disabled &&
                    <LineSeries data={route.data.map(item => ({x: Moment(item[0]), y: item[1]/60}))} />
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
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 200;
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
                    tickValues={range(0, 51, 5)}
                />
                {this.props.children}
            </XYPlot>
        );
    }
}
