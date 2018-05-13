import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";

import { withStyles } from 'material-ui/styles';

import dataMock from '../../data.json';

import scheduleFactory from '../Schedule';
import ScheduleGraph from '../../components/ScheduleGraph';
import Conditions from '../../components/Conditions';

const RegularSchedule = scheduleFactory('srcSchedule');
const OptimizedSchedule = scheduleFactory('dstSchedule');

const styles = theme => ({
});

class Content extends Component {

  constructor(props) {
    super(props);
    window.svgRef = React.createRef();
  };

  componentDidMount = () => {

    //TODO: REMOVE
    this.props.setData({ data: dataMock });
  };

  render() {
    const { colors, data, timeShift } = this.props;
    const schedule = data && data.chart && data.chart.schedule;
    return (
      <svg
        width="1800"
        height="940"
        xmlns="http://www.w3.org/2000/svg"
        ref={window.svgRef}
        style={{fontFamily: 'Roboto, sans-serif'}}
      >
        <svg height="110" y="800" x="2%" width="96%">
          {
            data && data.chart &&
            <ScheduleGraph
              color={colors[data.chart.color]}
              timeBlocks={data[schedule].timeBlocks}
              timeShift={timeShift}
              name={data[schedule].name}
            />
          }
        </svg>
        <svg x="2%" width="96%" height="940">
          {
            data && data.conditions &&
            <Conditions conditions={data.conditions} timeShift={timeShift} />
          }
        </svg>
        <svg width="100%" height="310" y="130">
          <RegularSchedule />
        </svg>
        <svg width="100%" height="310" y="460">
          <OptimizedSchedule />
        </svg>
      </svg>
    );
  }
}

export default connect(
  {
    data: state`data`,
    colors: state`colors`,
    timeShift: state`data.timeShift`,

    setData: signal`setData`, //TODO: REMOVE
  },
  withStyles(styles)(Content)
);
