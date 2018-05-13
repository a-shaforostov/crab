import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import { calcDuration } from 'app/utils';
import classNames from 'classnames';

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import EditFormFactory from 'containers/EditForm';

import { withStyles } from 'material-ui/styles';

const EditFormConditions = EditFormFactory({ entity: 'conditions' });

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: 'white',
  },
  headingIcon: {
    color: 'white',
  },
  panelSummary: {
    backgroundColor: '#3F51B5',
    color: 'white',
  },
  panelDetail: {
    display: 'flex',
    cursor: 'pointer',
    fontSize: "80%",
    color: "#777",
    flexDirection: 'column',
    marginBottom: '-15px',
    padding: '10px 0 24px',
  },
  conditionItem: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
    overflow: 'hidden',
    alignItems: 'center',
    padding: '5px 10px',
  },
  conditionItemSelected: {
    backgroundColor: '#EEE',
  },
  conditionItemStatic: {
    display: 'flex',
    width: '100%',
  },
  conditionName: {
    textAlign: 'left',
  },
  timeGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '5px',
    borderRight: '1px solid #777',
    paddingRight: '5px',
  },
  time: {

  },
  duration: {
    fontSize: "70%",
    color: '#d58b1f',
  },
});

class ConditionsEditor extends Component {
  handleDelete = id => e => {
    e.stopPropagation();
    this.props.delete({ entity: 'conditions', id });
  };

  handleSelect = id => () => {
    this.props.select({ entity: 'conditions', id });
  };

  handleEdit = id => e => {
    e.stopPropagation();
    this.props.edit({ entity: 'conditions', id, isCopy: false });
  };

  handleNew = e => {
    e.stopPropagation();
    this.props.edit({ entity: 'conditions', id: -1, isCopy: false });
  };

  handleCopy = id => e => {
    e.stopPropagation();
    this.props.edit({ entity: 'conditions', id, isCopy: true });
  };

  handleEnter = id => e => {
    if (e.keyCode === 13) {
      this.props.select({ entity: 'conditions', id });
    }
  };

  renderControls = ({ id }) => {
    return (
      <div>
        <Tooltip title={"Edit"}><IconButton onClick={this.handleEdit(id)}><EditIcon /></IconButton></Tooltip>
        <Tooltip title={"Copy"}><IconButton onClick={this.handleCopy(id)}><AddIcon /></IconButton></Tooltip>
        <Tooltip title={"Delete"}><IconButton onClick={this.handleDelete(id)}><DeleteIcon /></IconButton></Tooltip>
      </div>
    )
  };

  renderItems = (conditions) => {
    const { classes, editor } = this.props;
    return conditions.sort((a, b) => a.time1 > b.time1 ? 1 : -1).map((condition, index) => {
      const isSelected = editor.selected === condition.id;
      return (
        <div
          key={condition.id}
          className={classNames([classes.conditionItem, {[classes.conditionItemSelected]: isSelected}])}
          tabIndex={index+1}
          onClick={this.handleSelect(condition.id)}
          onKeyUp={this.handleEnter(condition.id)}
        >
          <div className={classes.conditionItemStatic}>
            <div className={classes.timeGroup}>
              <span className={classes.time}>{condition.time1}</span>
              <span>&nbsp;</span>
              <span className={classes.time}>{condition.time2}</span>
            </div>
            <div className={classes.conditionName}>
              {condition.name}&nbsp;<span className={classes.duration}>{calcDuration(condition).time}</span>
            </div>
          </div>
          {
            isSelected &&
            this.renderControls({ id: condition.id })
          }
        </div>
      )
    });
  };

  render() {
    const { classes, conditions } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon className={classes.headingIcon} />}
          className={classes.panelSummary}
        >
          <Typography className={classes.heading}>Conditions</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetail}>
          {
            conditions && this.renderItems(conditions)
          }
          <Button onClick={this.handleNew}>+ Add item</Button>
        </ExpansionPanelDetails>

        <EditFormConditions entityName="conditions" />

      </ExpansionPanel>
    )
  }
}

export default connect(
  {
    conditions: state`data.conditions`,
    editor: state`sideEditor.conditions`,

    delete: signal`deleteItem`,
    select: signal`selectItem`,
    edit: signal`editItem`,
  },
  withStyles(styles)(ConditionsEditor)
);
