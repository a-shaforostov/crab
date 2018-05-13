import React, { Component, Fragment } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";

import Tabs, { Tab } from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';

import Traffic from '@material-ui/icons/Traffic';
import Filter1 from '@material-ui/icons/Filter1';
import Filter2 from '@material-ui/icons/Filter2';
import Timeline from '@material-ui/icons/Timeline';

import ConditionsEditor from './ConditionsEditor';
import GraphEditor from './GraphEditor';
import ScheduleEditorFactory from './ScheduleEditor';

import { withStyles } from 'material-ui/styles';

const ScheduleEditor = ScheduleEditorFactory('srcSchedule');

const styles = theme => ({
  tabIcon: {
    minWidth: '60px',
  },
  badge: {
    top: '6px',
    width: '14px',
    right: '7px',
    height: '14px',
    fontSize: '70%',
  },
  tabsContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'stretch',
    overflowY: 'auto',
  }
});

class SideEditor extends Component {
  handleChangeTab = (event, value) => {
    this.props.setSideEditorTab({ tab: value });
  };

  render() {
    const { classes, sideEditor } = this.props;
    const { activeTab } = sideEditor;
    return (
      <Fragment>
        <Tabs
          value={activeTab}
          onChange={this.handleChangeTab}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<Traffic />} title="Conditions" className={classes.tabIcon}/>
          <Tab icon={<Filter1 />} title="Regular Schedule" className={classes.tabIcon}></Tab>
          <Tab icon={<Filter2 />} title="Optimized Schedule" className={classes.tabIcon}/>
          <Tab icon={<Timeline />} title="Graph" className={classes.tabIcon}/>
        </Tabs>
        <div className={classes.tabsContainer}>
          {activeTab === 0 && <ConditionsEditor />}
          {activeTab === 1 && <ScheduleEditor schedule="srcSchedule" />}
          {activeTab === 2 && <ScheduleEditor schedule="dstSchedule" />}
          {activeTab === 3 && <GraphEditor />}
        </div>
      </Fragment>
    )
  }
}

export default connect(
  {
    sideEditor: state`sideEditor`,
    setSideEditorTab: signal`setSideEditorTab`,
  },
  withStyles(styles)(SideEditor)
);
