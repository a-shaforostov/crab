import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from '@cerebral/react';
import { state } from "cerebral/tags";

import Ruler from './Ruler';

import styles from './Schedule.less';

class Schedule extends Component {
  // static propTypes = {
  //   timeShift: PropTypes.number.isRequired,
  // };

  static defaultProps = {
    timeShift: 5,
  };

  render() {
    return (
      <Ruler timeShift={this.props.timeShift} />
    )
  }
}

export default connect(
  {
    timeShift: state`data.timeShift`,
  },
  Schedule
);
