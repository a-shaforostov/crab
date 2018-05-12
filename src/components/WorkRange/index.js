import React, { Component } from 'react';
import { calcBlockPlace } from '../../app/utils'

class WorkRange extends Component {
  renderRange = ({ activities, timeShift, colors }) => {
    const workActivity = activities.find(act => act.isWork);
    if (!workActivity) return null;

    const { x, w } = calcBlockPlace(workActivity, timeShift, 4);
    return (
      <g>
        <line x1={(2+x)+'%'} y1={23} x2={(2+x)+'%'} y2={50} stroke={colors['clRed']} />
        <line x1={(2+x+w)+'%'} y1={23} x2={(2+x+w)+'%'} y2={50} stroke={colors['clRed']} />
        <text x={(2+x)+'%'} y={20} textAnchor="middle" fill={colors['clRed']}>{workActivity.time1}</text>
        <text x={(2+3.3+x)+'%'} y={20} textAnchor="middle" fill={colors['clRed']} fontSize="80%">Work Starts</text>
        <text x={(2+x+w)+'%'} y={20} textAnchor="middle" fill={colors['clRed']}>{workActivity.time2}</text>
        <text x={(2-3+x+w)+'%'} y={20} textAnchor="middle" fill={colors['clRed']} fontSize="80%">Work Ends</text>
      </g>
    )
  };

  render() {
    const { timeShift, activities, colors } = this.props;
    return (
      <svg height="50" x="0" y="46" width="100%">
        {/*<rect x={0} y={0} width="100%" height="100%" fill="red" opacity={0.5}/>*/}
        {activities && this.renderRange({ activities, timeShift, colors })}
      </svg>
    )
  }
}

export default WorkRange;
