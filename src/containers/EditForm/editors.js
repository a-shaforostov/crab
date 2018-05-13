import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';

export const TimeEditorFactory = ({ options }) => (props) => {
  return (
    <TextField
      autoFocus={options.autofocus}
      margin="normal"
      key={options.name}
      name={options.name}
      label={options.label}
      type="time"
      required={options.required}
      InputLabelProps={{
        shrink: true,
      }}
      value={options.value || '00:00'}
      onChange={options.onChange}
    />
  )
};

export const TextEditorFactory = ({ options }) => (props) => {
  return (
    <TextField
      autoFocus={options.autofocus}
      margin="normal"
      key={options.name}
      name={options.name}
      label={options.label}
      type="text"
      required={options.required}
      fullWidth
      multiline={true}
      rowsMax={3}
      InputLabelProps={{
        shrink: true,
      }}
      value={options.value}
      onChange={options.onChange}
    />
  )
};

export const SelectEditorFactory = ({ options, children }) => (props) => {
  return (
    <TextField
      autoFocus={options.autofocus}
      margin="normal"
      key={options.name}
      name={options.name}
      label={options.label}
      required={options.required}
      fullWidth
      select
      InputLabelProps={{
        shrink: true,
      }}
      value={String(options.value)}
      onChange={options.onChange}
    >
      {
        children &&
        children.map(element => <MenuItem key={element.key} value={element.value}>{element.text}</MenuItem>)
      }
    </TextField>
  )
};

export const SwitchEditorFactory = ({ options, children }) => (props) => {
  return (
    <FormControlLabel
      key={options.name}
      control={
        <Switch
          checked={options.value}
          onChange={options.onChange}
          id={options.name}
          key={options.name}
          value={options.name}
          color="primary"
        />
      }
      label={options.label}
    />
  )
};

export default {
  TimeEditorFactory,
  TextEditorFactory,
  SelectEditorFactory,
  SwitchEditorFactory,
};
