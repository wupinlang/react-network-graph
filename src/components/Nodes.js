import React, { Component } from 'react';
import Node from './Node';

class Nodes extends Component {

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  render() {
    const { data, simulation } = this.props;
    return (
      <g className='nodes'>
        {
          data.map(item => {
            return (
              <Node {...item} simulation={simulation} key={item.id}/>
            )
          })
        }
        <defs>
          {
            data.map(item => {
              return (
                <pattern key={item.id} id={`${item.id}_PIC`} patternUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
                  <image xlinkHref={item.properties.logo_url} x="0" y="-3" width="50" height="56" />
                </pattern>
              );
            })
          }
        </defs>
      </g>
    )
  }
}

export default Nodes;
