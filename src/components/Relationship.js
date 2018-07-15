import React, { Component } from 'react';
import * as d3 from 'd3v4';

const rotate = (cx, cy, x, y, angle) => {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return {x: nx, y: ny};
};

const rotation = (source, target) => {
  return Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI;
};

const rotatePoint = (c, p, angle) => {
  return rotate(c.x, c.y, p.x, p.y, angle);
};

const unitaryNormalVector = (source, target, newLength) => {
  const center = {x: 0, y: 0};
  const vector = unitaryVector(source, target, newLength);
  return rotatePoint(center, vector, 90);
};

const unitaryVector = (source, target, newLength) => {
  const length = Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)) / Math.sqrt(newLength || 1);
  return {
    x: (target.x - source.x) / length,
    y: (target.y - source.y) / length,
  };
};

class Relationship extends Component {

  componentDidMount() {
  }

  componentWillReceiveProps() {
    //console.log('receive');
  }

  componentDidUpdate() {
    //this.renderNode();
  }

  render() {
    const { id, type, source, target, nodeRadius, arrowSize } = this.props;
    const angle = rotation(source, target);
    const angleText = (rotation(source, target) + 360) % 360;
    const isMirror = angleText > 90 && angleText < 270;
    const center = {x: 0, y: 0};
    const n = unitaryNormalVector(source, target);
    const u = unitaryVector(source, target);
    const nWeight = isMirror ? 2 : -3;
    const point = {
        x: (target.x - source.x) * 0.5 + n.x * nWeight,
        y: (target.y - source.y) * 0.5 + n.y * nWeight
      };
    const rotatedPoint = rotatePoint(center, point, angleText);

    const textBoundingBox = this.refs.text && d3.select(this.refs.text).node() ? d3.select(this.refs.text).node().getBBox() : { width : 0 };
    const textPadding = 5;

    const textMargin = {
      x: (target.x - source.x - (textBoundingBox.width + textPadding) * u.x) * 0.5,
      y: (target.y - source.y - (textBoundingBox.width + textPadding) * u.y) * 0.5
    };

    const rotatedPointA1 = rotatePoint(center, {
        x: (nodeRadius + 1) * u.x - n.x,
        y: (nodeRadius + 1) * u.y - n.y
      }, angle),
      rotatedPointB1 = rotatePoint(center, {x: textMargin.x - n.x, y: textMargin.y - n.y}, angle),
      rotatedPointC1 = rotatePoint(center, {x: textMargin.x, y: textMargin.y}, angle),
      rotatedPointD1 = rotatePoint(center, {
        x: (nodeRadius + 1) * u.x,
        y: (nodeRadius + 1) * u.y
      }, angle),
      rotatedPointA2 = rotatePoint(center, {
        x: target.x - source.x - textMargin.x - n.x,
        y: target.y - source.y - textMargin.y - n.y
      }, angle),
      rotatedPointB2 = rotatePoint(center, {
        x: target.x - source.x - (nodeRadius + 1) * u.x - n.x - u.x * arrowSize,
        y: target.y - source.y - (nodeRadius + 1) * u.y - n.y - u.y * arrowSize
      }, angle),
      rotatedPointC2 = rotatePoint(center, {
        x: target.x - source.x - (nodeRadius + 1) * u.x - n.x + (n.x - u.x) * arrowSize,
        y: target.y - source.y - (nodeRadius + 1) * u.y - n.y + (n.y - u.y) * arrowSize
      }, angle),
      rotatedPointD2 = rotatePoint(center, {
        x: target.x - source.x - (nodeRadius + 1) * u.x,
        y: target.y - source.y - (nodeRadius + 1) * u.y
      }, angle),
      rotatedPointE2 = rotatePoint(center, {
        x: target.x - source.x - (nodeRadius + 1) * u.x + (-n.x - u.x) * arrowSize,
        y: target.y - source.y - (nodeRadius + 1) * u.y + (-n.y - u.y) * arrowSize
      }, angle),
      rotatedPointF2 = rotatePoint(center, {
        x: target.x - source.x - (nodeRadius + 1) * u.x - u.x * arrowSize,
        y: target.y - source.y - (nodeRadius + 1) * u.y - u.y * arrowSize
      }, angle),
      rotatedPointG2 = rotatePoint(center, {
        x: target.x - source.x - textMargin.x,
        y: target.y - source.y - textMargin.y
      }, angle);

    const n2 = unitaryNormalVector(source, target, 50),
      rotatedPointA = rotatePoint(center, {x: 0 - n2.x, y: 0 - n2.y}, angle),
      rotatedPointB = rotatePoint(center, {
        x: target.x - source.x - n2.x,
        y: target.y - source.y - n2.y
      }, angle),
      rotatedPointC = rotatePoint(center, {
        x: target.x - source.x + n2.x - n.x,
        y: target.y - source.y + n2.y - n.y
      }, angle),
      rotatedPointD = rotatePoint(center, {x: 0 + n2.x - n.x, y: 0 + n2.y - n.y}, angle);

    return (
      <g className="relationship" id={id} transform={`translate(${source.x || 0}, ${source.y || 0}) rotate(${angle || 0})`}>
        <text
          className="text"
          ref="text"
          fill="#000000"
          fontSize="8px"
          pointerEvents="none"
          textAnchor="middle"
          transform={`translate(${rotatedPoint.x || 0}, ${rotatedPoint.y || 0}) rotate(${isMirror ? 180 : 0 })`}
        >
          {type}
        </text>
        <path
          className="outline"
          fill="#a5abb6"
          stroke="none"
          ref="outline"
          d={
            rotatedPointA1.x ? `M ${rotatedPointA1.x} ${rotatedPointA1.y}
            L ${rotatedPointB1.x} ${rotatedPointB1.y}
            L ${rotatedPointC1.x} ${rotatedPointC1.y}
            L ${rotatedPointD1.x} ${rotatedPointD1.y}
            Z M ${rotatedPointA2.x} ${rotatedPointA2.y}
            L ${rotatedPointB2.x} ${rotatedPointB2.y}
            L ${rotatedPointC2.x} ${rotatedPointC2.y}
            L ${rotatedPointD2.x} ${rotatedPointD2.y}
            L ${rotatedPointE2.x} ${rotatedPointE2.y}
            L ${rotatedPointF2.x} ${rotatedPointF2.y}
            L ${rotatedPointG2.x} ${rotatedPointG2.y} Z` : 'M0 0'
          }
        />
        <path
          className="overlay"
          ref="overlay"
          d={
            rotatedPointA.x ? `M ${rotatedPointA.x} ${rotatedPointA.y}
            L ${rotatedPointB.x} ${rotatedPointB.y}
            L ${rotatedPointC.x} ${rotatedPointC.y}
            L ${rotatedPointD.x} ${rotatedPointD.y} Z` : 'M0 0'
          }
        />
      </g>
    )
  }
}

export default Relationship;
