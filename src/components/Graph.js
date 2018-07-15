import React, { Component } from 'react';
import * as d3 from 'd3v4';
import Nodes from './Nodes';
import Relationships from './Relationships';

class Graph extends Component {

  static defaultProps = {
    nodeRadius : 25,
    arrowSize: 4,
  };

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      scale: 1,
    };
  }

  componentWillReceiveProps(a) {
    console.log('receive', a);
  }

  componentDidMount() {
    const graph = d3.select('.network-graph');
    graph.call(this.zoom).on('dblclick.zoom', null);
    this.simulation.force('center', d3.forceCenter(graph.node().clientWidth / 2, graph.node().clientHeight / 2)).restart();
    this.update();
  }

  componentDidUpdate() {
    console.log('big didupdate');
    this.update();
  }

  zoom = d3.zoom().on('zoom', () => {
    this.setState({
      x: d3.event.transform.x,
      y: d3.event.transform.y,
      scale: d3.event.transform.k,
    });
  });

  simulation = d3.forceSimulation()
    .force('collide', d3.forceCollide().radius(() => this.props.nodeRadius * 3).iterations(20))
    .force('charge', d3.forceManyBody())
    .force('link', d3.forceLink().id(function (d) {
      return d ? d.id : this.id;
    }))
    .on('tick', () => {
      this.forceUpdate();
    })
    .on('end', function () {
      console.log('end');
    });

  update = () => {
    const { nodes, relationships } = this.props.data;
    d3.selectAll('.node')
      .data(nodes, function (d) {
        return d ? d.id : this.id;
      });
    d3.select('.network-graph').selectAll('.relationship')
      .data(relationships, function (d) {
        return d ? d.id : this.id;
      });
    this.simulation.nodes(nodes);
    this.simulation.force('link').links(relationships);
  };

  render() {
    const { data, nodeRadius, arrowSize } = this.props;
    const { nodes, relationships } = data;
    const { x, y, scale } = this.state;
    return (
      <svg width="100%" height="100%" className="network-graph">
        <g width="100%" height="100%" transform={`translate(${x}, ${y}) scale(${scale})`}>
          <Relationships data={relationships} nodeRadius={nodeRadius} arrowSize={arrowSize} />
          <Nodes data={nodes} simulation={this.simulation} />
        </g>
      </svg>
    )
  }
}

export default Graph;
