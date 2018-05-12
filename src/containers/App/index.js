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

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/ModeEdit';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';

import SideEditor from '../SideEditor';
import Content from '../Content';
import HeaderBar from '../HeaderBar';
import EditFormFactory from '../EditForm';

import styles from './styles';

const EditFormConditions = EditFormFactory('conditions');

class App extends Component {

  handleToggleEditor = visible => () => {
    this.props.openSideEditor({ visible });
  };

  componentDidMount = () => {
    this.props.undoPush();
  };

  render() {
    const { classes, sideEditorVisible, undoUndo, undoRedo, undoHead, undoStack, editConditions } = this.props;
    console.log('undoHead', undoStack.length, undoHead);
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
              <Tooltip title="Undo">
                <span>
                  <IconButton onClick={undoUndo} disabled={undoHead <= 0}>
                    <Undo />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Redo">
                <span>
                  <IconButton onClick={undoRedo} disabled={undoHead >= undoStack.length-1}>
                    <Redo />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
            <Tooltip title="Close editor"><IconButton onClick={this.handleToggleEditor(false)}><CloseIcon /></IconButton></Tooltip>
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

        <EditFormConditions />
      </div>
    );
  }
}

export default connect(
  {
    sideEditorVisible: state`sideEditor.visible`,

    undoHead: state`undo.head`,
    undoStack: state`undo.stack`,

    setData: signal`setData`, //TODO: REMOVE
    loadFile: signal`loadFile`,
    downloadFile: signal`downloadFile`,
    convertOnline: signal`convertOnline`,
    openSideEditor: signal`openSideEditor`,
    undoPush: signal`undoPush`,
    undoUndo: signal`undoUndo`,
    undoRedo: signal`undoRedo`,
  },
  withStyles(styles)(App)
);
