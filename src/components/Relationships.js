import React, { Component } from 'react';
import Relationship from './Relationship';

class Relationships extends Component {
  render() {
    const { data, ...rest } = this.props;
    return (
      <g className='relationships'>
        {
          data.map(item => {
            return (
              <Relationship {...item} key={item.id} {...rest} />
            )
          })
        }
      </g>
    )
  }
}

export default Relationships;
