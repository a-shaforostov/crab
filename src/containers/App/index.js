import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/ModeEdit';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';

import SideEditor from '../SideEditor';
import Content from '../Content';
import HeaderBar from '../HeaderBar';

import styles from './styles';

class App extends Component {

  handleToggleEditor = visible => () => {
    this.props.openSideEditor({ visible });
  };

  render() {
    const { classes, sideEditorVisible } = this.props;
    return (
      <div className={classes.app}>

        <AppBar position="fixed" className={classNames(classes.appBar, {
          [classes.appBarShift]: sideEditorVisible,
          [classes[`appBarShift-left`]]: sideEditorVisible,
        })}>
          <HeaderBar />
        </AppBar>

        <Drawer
          variant="persistent"
          anchor="left"
          open={sideEditorVisible}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <div>
              <Tooltip title="Undo"><IconButton><Undo /></IconButton></Tooltip>
              <Tooltip title="Redo"><IconButton><Redo /></IconButton></Tooltip>
            </div>
            <Tooltip title="Close"><IconButton onClick={this.handleToggleEditor(false)}><ChevronLeftIcon /></IconButton></Tooltip>
          </div>
          <Divider />
          <SideEditor />
        </Drawer>

        <div className={classNames(classes.content, classes[`content-left`], {
          [classes.contentShift]: sideEditorVisible,
          [classes[`contentShift-left`]]: sideEditorVisible,
        })}>
          <Content />
        </div>

        {
          !sideEditorVisible &&
          <Button variant="fab" color="primary" className={classes.fabEdit} onClick={this.handleToggleEditor(true)}>
            <EditIcon />
          </Button>
        }
      </div>
    );
  }
}

export default connect(
  {
    sideEditorVisible: state`sideEditor.visible`,

    setData: signal`setData`, //TODO: REMOVE
    loadFile: signal`loadFile`,
    downloadFile: signal`downloadFile`,
    convertOnline: signal`convertOnline`,
    openSideEditor: signal`openSideEditor`,
  },
  withStyles(styles)(App)
);
