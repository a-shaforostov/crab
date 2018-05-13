import React, { Component } from 'react';
import {calcBlockPlace, splitBlock} from '../../app/utils';
import { area, curveBundle} from 'd3-shape';

const styles = {
  styleText: {
    fontSize: '60%',
    fontWeight: '700',
  },
};

class ScheduleGraph extends Component {
  buildData = (timeBlocks, timeShift) => {
    const data = [];
    timeBlocks.forEach(act => {
      splitBlock(act, timeShift).forEach(block => {
        const { x, w } = calcBlockPlace(block, timeShift);
        data.push({ x: 1800*0.96 / 100 * (x + w/2), y: block.type, block });
      })
    });
    return data;
  };

  buildPath = (data) => {
    const areaFunc = area()
      .x(function (d) { return d.x })
      .y1(function (d) { return 111 - (d.y * 140 / 2) })
      .y0(function(d) { return 111 })
      .curve(curveBundle.beta(1));
    const dataPrepared = data.sort((a, b) => a.x - b.x );
    return areaFunc(dataPrepared);
  };

  renderGraph = ({ color, timeBlocks, timeShift = 0 }) => {
    const path = this.buildPath(this.buildData(timeBlocks, timeShift));
    return (
      <path d={path} stroke={color} fill={color} />
    )
  };

  render() {
    const { color, timeBlocks, timeShift, name } = this.props;
    return (
      <svg height="110" x="0" y="0" width="100%">
        {/*<rect x={0} y={0} width="100%" height="100%" fill="red" opacity={0.5}/>*/}
        {color && this.renderGraph({ color, timeBlocks, timeShift })}
        <text y="90%" x="44%" style={styles.styleText} fill="#71b773">INTELLECTUAL WORK PRODUCTIVITY PHASES - {name} Schedule</text>
      </svg>
    )
  }
}

export default ScheduleGraph;
