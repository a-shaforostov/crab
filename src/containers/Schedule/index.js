import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '@cerebral/react';
import { state } from "cerebral/tags";

import Ruler from '../../components/Ruler';
import Activity from '../../components/Activity';
import TimeBlocks from '../../components/TimeBlocks';
import WorkRange from '../../components/WorkRange';

import styles from './Schedule.less';

class Schedule extends Component {
  // static propTypes = {
  //   timeShift: PropTypes.number.isRequired,
  // };

  static defaultProps = {
    timeShift: 5,
  };

  render() {
    console.log(this.props);
    const { schedule, timeShift, colors } = this.props;
    return (
      <svg className={styles.Schedule} height="310" width="100%">
        {/*<rect x={0} y={0} height="100%" width="100%" fill="aqua" />*/}
        <TimeBlocks
          timeShift={timeShift}
          timeBlocks={schedule ? schedule.timeBlocks : []}
          milestones={schedule ? schedule.milestones : []}
          colors={colors}
        />
        <Ruler timeShift={timeShift} />
        <Activity timeShift={timeShift} activities={schedule ? schedule.activities : []} />
        <WorkRange timeShift={timeShift} activities={schedule ? schedule.activities : []} colors={colors} />
      </svg>
    )
  }
}

export const RegularSchedule = connect(
  {
    timeShift: state`data.timeShift`,
    schedule: state`data.srcSchedule`,
    colors: state`colors`,
  },
  Schedule
);

export const OptimizedSchedule = connect(
  {
    timeShift: state`data.timeShift`,
    schedule: state`data.dstSchedule`,
    colors: state`colors`,
  },
  Schedule
);
