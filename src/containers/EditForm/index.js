import React, { Component, Fragment } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import { calcDuration, calcFinish, checkIntersection } from 'app/utils';

import * as EditorForms from "./forms";
import editorFactories from "./editors";

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Modal from 'material-ui/Modal';

const styles = theme => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '300px',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
  },
  error: {
    color: 'red',
  }
});

class EditForm extends Component {

  state = {
    data: {},
    error: null,
  };

  componentDidMount = () => {
    this.updateStateFromProps(this.props);
  };

  componentWillReceiveProps = (props) => {
    this.updateStateFromProps(props);
  };

  validate = () => {
    const formObject = EditorForms[`${this.props.entityName}Form`]();
    for (let i = 0; i < formObject.elements.length; i++) {
      const el = formObject.elements[i];
      if (el.options.required) {
        const value = this.state.data[el.options.name];
        if ( value === undefined || value === null || value === '') {
          this.handleError(`Field "${el.options.label}" is required`);
          return false;
        }
      }
    }

    if (this.props.entityName !== 'conditions') {
      if (checkIntersection(this.state.data, this.props.data)) {
        this.handleError(`Your event intersects with another one. Please check your time settings`);
        return false;
      }
    }
    return true;
  };

  handleSave = (e) => {
    e.preventDefault();
    if (this.validate()) {
      const { scheduleName = '', entityName } = this.props;
      this.props.saveItem({ schedule: scheduleName, entity: entityName, data: this.state.data });
      this.props.closeModalEditor({ schedule: scheduleName, entity: entityName});
    }
  };

  handleClose = () => {
    const { scheduleName = '', entityName } = this.props;
    this.props.closeModalEditor({ schedule: scheduleName, entity: entityName });
  };

  handleError = message => {
    this.setState(() => ({ error: message }))
  };

  handleCloseError = () => {
    this.setState(() => ({ error: null }))
  };

  handleChange = field => e => {
    const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;
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
          d = calcDuration({time1: value, time2: state.data.time2 }).time;
          t1 = value;
          break;
        default: break;
      }

      return {
        data: {
          ...state.data,
          [field]: value,
          time1: t1 ? t1 : state.data.time1,
          time2: t2 ? t2 : state.data.time2,
          duration: d ? d : state.data.duration,
        }
      };
    });
  };

  updateStateFromProps = (props) => {
    const id = props.entity.edited;
    const isCopy = props.entity.isCopy;
    let data;
    if (id === -1) {
      data = { id: -1 }
    } else {
      data = props.data ? props.data.find(item => item.id === id) : null;
    }
    this.setState(() => {
      const formObject = EditorForms[`${props.entityName}Form`]();
      const defaults = formObject.elements.reduce((def, elem) => ({ ...def, [elem.options.name]: elem.default }), {});
      const result = { data: { ...defaults, ...data } };
      if (isCopy) {
        result.data.id = -1;
      }
      if (!result.data.duration && result.data.time1 && result.data.time2) {
        result.data.duration = calcDuration({time1: result.data.time1, time2: result.data.time2}).time;
      }
      return result;
    });
  };

  render() {
    const { classes, entity, entityName } = this.props;
    const formObject = EditorForms[`${entityName}Form`]();
    return (
      <Fragment>
        <Dialog
          open={!!entity.edited}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Edit {entityName.slice(0, -1)}</DialogTitle>
            <DialogContent>
              <DialogContentText>{formObject.text}</DialogContentText>
              <form id="form" noValidate>
                {
                  formObject.elements.map(element => {
                    const { options, children } = element;
                    options.onChange = this.handleChange(options.name);
                    options.value = this.state.data[options.name];
                    return (options.value !== undefined) ? editorFactories[element.type]({ options, children })() : null;
                  })
                }
              </form>
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

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={!!this.state.error}
        >
          <div className={classes.paper} style={{top: '50%', left:'50%', transform: 'translate(-50%, -50%)'}}>
            <Typography variant="title" id="modal-title" className={classes.error}>
              Validation error
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              {this.state.error}
            </Typography>
            <Button onClick={this.handleCloseError}>Close</Button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default ({ schedule, entity }) => {
  return connect(
    {
      entity: state`sideEditor${schedule ? '.'+schedule : ''}.${entity}`,
      data: state`data${schedule ? '.'+schedule : ''}.${entity}`,

      closeModalEditor: signal`closeModalEditor`,
      saveItem: signal`saveItem`,
    },
    withStyles(styles)(EditForm)
  )
};
