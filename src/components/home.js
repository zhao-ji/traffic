import React, {Component} from 'react';

import * as d3 from "d3";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.isConnected) {
            this.props.subscribe();
        }
        this.drawChart();
    }

    drawChart() {
        const data = [12, 5, 6, 6, 9, 10];
        const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 200;
        const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 200;

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")
    }

    render()  {
        return (
            <div id="chart"></div>
        );
    }
}
