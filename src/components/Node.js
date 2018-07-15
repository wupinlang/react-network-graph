import React, { Component } from 'react';
import * as d3 from 'd3v4';
import './Node.css';

class Node extends Component {

  componentDidMount() {
    this.renderNode();
  }

  renderNode = () => {
    const node = this.refs.node;
    d3.select(node).on('click',(d) => {
      d.fx = null;
      d.fy = null;
    }).call(
      d3.drag()
      .on('start', this.dragStarted)
      .on('drag', this.dragged)
      .on('end', this.dragEnded)
    );
    this.props.simulation.alphaTarget(0.1).restart();
  };

  dragStarted = (d) => {
    if (!d3.event.active) {
      this.props.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  };

  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  };

  dragEnded = (d) => {
    if (!d3.event.active) {
      this.props.simulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
  };

  render() {
    const { id, x, y } = this.props;
    return (
      <g className="node" ref="node" id={id} transform={`translate(${x || 0}, ${y || 0})`}>
        <circle className="ring" r="29">
          <title>a</title>
        </circle>
        <circle className="outline" r="25" style={{fill: `url("#${id}_PIC")`, stroke: 'rgb(76, 144, 111)'}}>
          <title>b</title>
        </circle>
      </g>
    )
  }
}

export default Node;
