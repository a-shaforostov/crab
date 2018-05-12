import React, { Component } from 'react';
import { connect } from '@cerebral/react';
import { state } from "cerebral/tags";

import Title from '../../components/Title';
import Ruler from '../../components/Ruler';
import Activity from '../../components/Activity';
import TimeBlocks from '../../components/TimeBlocks';
import WorkRange from '../../components/WorkRange';

class Schedule extends Component {
  static defaultProps = {
    timeShift: 5,
  };

  render() {
    console.log(this.props);
    const { schedule, timeShift, colors } = this.props;


    return (
      <svg height="310" width="100%">
        {/*<rect x={0} y={0} height="100%" width="100%" fill="aqua" />*/}
        <TimeBlocks
          timeShift={timeShift}
          timeBlocks={schedule ? schedule.timeBlocks : []}
          milestones={schedule ? schedule.milestones : []}
          colors={colors}
        />
        <Ruler
          timeShift={timeShift}
          workActivity={schedule && schedule.activities && schedule.activities.find(item => item.isWork)}
        />
        <Activity timeShift={timeShift} activities={schedule ? schedule.activities : []} />
        <WorkRange timeShift={timeShift} activities={schedule ? schedule.activities : []} colors={colors} />
        <Title title={schedule ? schedule.name : null} />
      </svg>
    )
  }
}

export default (key) => connect(
  {
    timeShift: state`data.timeShift`,
    schedule: state`data.${key}`,
    colors: state`colors`,
  },
  Schedule
);
