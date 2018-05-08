import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '@cerebral/react';
import { state } from "cerebral/tags";

import Ruler from '../../components/Ruler';
import Activity from '../../components/Activity';

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
    const { schedule, timeShift } = this.props;
    return (
      <svg className={styles.Schedule} height="200" width="100%">
        {/*<rect x={0} y={0} height="100%" width="100%" fill="aqua" />*/}
        <Ruler timeShift={timeShift} />
        <Activity timeShift={timeShift} activities={schedule ? schedule.activities : []}/>
      </svg>
    )
  }
}

export const RegularSchedule = connect(
  {
    timeShift: state`data.timeShift`,
    schedule: state`data.srcSchedule`,
  },
  Schedule
);

export const OptimizedSchedule = connect(
  {
    timeShift: state`data.timeShift`,
    schedule: state`data.dstSchedule`,
  },
  Schedule
);
