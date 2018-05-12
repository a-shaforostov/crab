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

import { withStyles } from 'material-ui/styles';

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
          <Tab icon={<Filter1 />} title="Schedule 1" className={classes.tabIcon}></Tab>
          <Tab icon={<Filter2 />} title="Schedule 2" className={classes.tabIcon}/>
          <Tab icon={<Timeline />} title="Graph" className={classes.tabIcon}/>
        </Tabs>
        {activeTab === 0 && <ConditionsEditor />}
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
