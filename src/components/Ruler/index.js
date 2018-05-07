import React, { Component } from 'react';

import styles from './Ruler.less';

class Ruler extends Component {
  render() {
    const { timeShift } = this.props;

    // creating hours line
    const hours = [];
    for (let i = 0; i <= 24; i++) {
      hours.push((i + timeShift) % 24);
    }

    return (
      <div className={styles.Ruler}>
        {
          hours.map((hour, index) => <div className={styles.Hour} key={index} hour={hour} index={index}>{hour}</div>)
        }
      </div>
    )
  }
}

export default Ruler;
