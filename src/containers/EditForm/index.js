import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import { calcDuration, calcFinish } from 'app/utils';

import entityNameFactory from "computed/entityName";

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
  }
});

class EditForm extends Component {
  state = {
    data: {},
  };

  handleSave = () => {
    this.props.closeModalEditor({ entity: this.props.entityName });
    this.props.saveEntityData({ entity: this.props.entityName, data: this.state.data });
  };

  handleClose = () => {
    this.props.closeModalEditor({ entity: this.props.entityName });
  };

  handleChange = field => e => {
    const value = e.target.value;
    let t1, t2, d;
    this.setState((state) => {
      switch (field) {
        case 'duration':
          t2 = calcFinish({time1: state.data.time1, duration: value}).time;
          d = value;
          break;
        case 'time2':
          d = calcDuration({time1: state.data.time1, time2: value}).time;
          t2 = value;
          break;
        case 'time1':
          d = calcDuration({time1: value, time2: state.data.time2}).time;
          t1 = value;
          break;
      }

      const result = {
        data: {
          ...state.data,
          [field]: value,
          time1: t1 ? t1 : state.data.time1,
          time2: t2 ? t2 : state.data.time2,
          duration: d ? d : state.data.duration,
        }
      };

      return result;
    });
  };

  componentWillReceiveProps = (props) => {
    const id = props.entity.edited;
    const data = props.data ? props.data.find(item => item.id === id) : null;
    this.setState(() => {
      const result = { data: { ...data } };
      if (!result.data.duration && result.data.time1 && result.data.time2) {
        result.data.duration = calcDuration({time1: data.time1, time2: data.time2}).time;
      }
      return result;
    });
  };

  render() {
    const { classes, entity, entityName, data } = this.props;
    console.log('state', this.state);
    return (
      <Dialog
        open={!!entity.edited}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit {entityName.slice(0, -1)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <div className={classes.row}>
            <TextField
              autoFocus
              margin="normal"
              id="time1"
              label="Start time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.data.time1 || '00:00'}
              onChange={this.handleChange('time1')}
            />
            <TextField
              margin="normal"
              id="duration"
              label="Duration"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.data.duration || '00:00'}
              onChange={this.handleChange('duration')}
            />
            <TextField
              margin="normal"
              id="time2"
              label="End time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.data.time2 || '00:00'}
              onChange={this.handleChange('time2')}
            />
          </div>
          <TextField
            margin="dense"
            id="pattern"
            label="Pattern"
            select
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.data.opacity || '0.5'}
            onChange={this.handleChange('opacity')}
          >
            <MenuItem key={1} value={0.4}>40%</MenuItem>
            <MenuItem key={2} value={0.5}>50%</MenuItem>
            <MenuItem key={3} value={0.6}>60%</MenuItem>
            <MenuItem key={4} value={0.7}>70%</MenuItem>
            <MenuItem key={5} value={0.8}>80%</MenuItem>
            <MenuItem key={6} value={0.9}>90%</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="time2"
            label="Description"
            type="text"
            fullWidth
            multiline={true}
            rowsMax={3}
            InputLabelProps={{
              shrink: true,
            }}
            value={this.state.data.name || ''}
            onChange={this.handleChange('name')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSave} color="primary">
            Save
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default entity => connect(
  {
    entityName: entityNameFactory(entity),
    entity: state`sideEditor.${entity}`,
    data: state`data.conditions`,

    closeModalEditor: signal`closeModalEditor`,
    saveEntityData: signal`saveEntityData`,
  },
  withStyles(styles)(EditForm)
);
