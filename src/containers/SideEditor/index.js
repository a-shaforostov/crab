import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";

import { withStyles } from 'material-ui/styles';

const drawerWidth = 240;

const styles = theme => ({
});

class SideEditor extends Component {
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div></div>
    )
  }
}

export default connect(
  {
    data: state`data`,
    colors: state`colors`,
    timeShift: state`data.timeShift`,
    setData: signal`setData`, //TODO: REMOVE
    loadFile: signal`loadFile`,
    downloadFile: signal`downloadFile`,
    convertOnline: signal`convertOnline`,
  },
  withStyles(styles)(SideEditor)
);
