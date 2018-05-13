import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";

import Tabs, { Tab } from 'material-ui/Tabs';

import Timeline from '@material-ui/icons/Timeline';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  tabs: {
    marginTop: '30px',
  },
  tabIcon: {
    minWidth: '60px',
    flexShrink: 1,
  },
});

const schedules = ['srcSchedule', 'dstSchedule'];

class GraphEditor extends Component {

  handleChangeTab = (event, value) => {
    this.props.selectGraphSchedule({ schedule: schedules[value] });
  };

  render() {
    const { classes, graph } = this.props;
    return (
      <Tabs
        value={schedules.indexOf(graph.schedule)}
        onChange={this.handleChangeTab}
        fullWidth
        indicatorColor="secondary"
        textColor="secondary"
        className={classes.tabs}
      >
        <Tab icon={<Timeline />} label="Regular Schedule" className={classes.tabIcon}/>
        <Tab icon={<Timeline />} label="Optimized Schedule" className={classes.tabIcon}/>
      </Tabs>
    )
  }
}

export default connect(
  {
    graph: state`data.chart`,
    selectGraphSchedule: signal`selectGraphSchedule`,
  },
  withStyles(styles)(GraphEditor)
);
