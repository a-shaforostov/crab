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

function getFormComponent({ schedule, entity }) {
  return React.createElement(
    EditFormFactory({ schedule, entity }),
    {entityName: entity, scheduleName: schedule},
  );
}

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

const expPanels = [
  {
    title: 'Activities',
    entity: 'activities',
    editTitle: 'Activity',
  },
  {
    title: 'Time Blocks',
    entity: 'timeBlocks',
    editTitle: 'Time Block',
  },
  {
    title: 'Milestones',
    entity: 'milestones',
    editTitle: 'Milestone',
  },
];

class ScheduleEditor extends Component {
  handleDelete = (entity, id) => e => {
    e.stopPropagation();
    e.preventDefault();
    this.props.delete({ schedule: this.props.schedule, entity, id });
  };

  handleSelect = (entity, id) => () => {
    this.props.select({ schedule: this.props.schedule, entity, id });
  };

  handleEdit = (entity, id) => e => {
    e.stopPropagation();
    this.props.edit({ schedule: this.props.schedule, entity, id, isCopy: false });
  };

  handleCopy = (entity, id) => e => {
    e.stopPropagation();
    this.props.edit({ schedule: this.props.schedule, entity, id, isCopy: true });
  };

  handleNew = entity => e => {
    e.stopPropagation();
    this.props.edit({ schedule: this.props.schedule, entity, isCopy: false });
  };

  handleEnter = (entity, id) => e => {
    if (e.keyCode === 13) {
      this.props.select({ schedule: this.props.schedule, entity, id });
    }
  };

  renderControls = ({ entity, id }) => {
    return (
      <div>
        <Tooltip title={"Edit"}><IconButton onClick={this.handleEdit(entity, id)}><EditIcon /></IconButton></Tooltip>
        <Tooltip title={"Copy"}><IconButton onClick={this.handleCopy(entity, id)}><AddIcon /></IconButton></Tooltip>
        <Tooltip title={"Delete"}><IconButton onClick={this.handleDelete(entity, id)}><DeleteIcon /></IconButton></Tooltip>
      </div>
    )
  };

  renderItems = (entity) => {
    const { classes, editors, data } = this.props;
    return data[entity].sort((a, b) => a.time1 > b.time1 ? 1 : -1).map((item, index) => {
      const isSelected = editors[entity].selected === item.id;
      const duration = entity === 'milestones' ? '' : calcDuration(item).time;
      return (
        <div
          key={item.id}
          className={classNames([classes.conditionItem, {[classes.conditionItemSelected]: isSelected}])}
          tabIndex={index+1}
          onClick={this.handleSelect(entity, item.id)}
          onKeyUp={this.handleEnter(entity, item.id)}
        >
          <div className={classes.conditionItemStatic}>
            <div className={classes.timeGroup}>
              <span className={classes.time}>{item.time1}</span>
              <span>&nbsp;</span>
              <span className={classes.time}>{item.time2}</span>
            </div>
            <div className={classes.conditionName}>
              {item.name}&nbsp;<span className={classes.duration}>{duration}</span>
            </div>
          </div>
          {
            isSelected &&
            this.renderControls({ entity, id: item.id })
          }
        </div>
      )
    });
  };

  render() {
    const { classes, data, schedule } = this.props;
    return (
      <div>
        {
          expPanels.map(item => {
            return (
              <ExpansionPanel key={item.entity}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon className={classes.headingIcon} />}
                  className={classes.panelSummary}
                >
                  <Typography className={classes.heading}>{item.title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.panelDetail}>
                  { data && data[item.entity] && this.renderItems(item.entity) }
                  <Button onClick={this.handleNew(item.entity)}>+ Add item</Button>
                </ExpansionPanelDetails>

                { getFormComponent({ schedule, entity: item.entity }) }

              </ExpansionPanel>
            )
          })
        }
      </div>
    )
  }
}

export default schedule => connect(
  {
    data: state`data.${schedule}`,
    editors: state`sideEditor.${schedule}`,

    delete: signal`deleteItem`,
    select: signal`selectItem`,
    edit: signal`editItem`,
  },
  withStyles(styles)(ScheduleEditor)
);
