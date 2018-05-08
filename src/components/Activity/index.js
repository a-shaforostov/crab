import React, {Component, Fragment} from 'react';

import styles from './Activity.less';

class Activity extends Component {
  renderActivities = () => {
    const { timeShift, activities } = this.props;
    if (!activities) return null;
    return activities.map(act => {
      const minWidth = 96 / 24 / 60;
      let tArr = act.time1.split(':');
      const t1Min = (+tArr[0] - timeShift) * 60 + +tArr[1];
      const x = 2 + minWidth * t1Min;
      tArr = act.time2.split(':');
      const t2Min = (+tArr[0] - timeShift) * 60 + +tArr[1];
      const w = minWidth * (t2Min - t1Min);
      return (
        <g>
          <rect x={x+'%'} y="0" width={w+'%'} height="30" key={act.id+'1'} />
          <line x1={x+'%'} y1="0" x2={x+'%'} y2="45" stroke="black" strokeWidth={2} key={act.id+'2'} />
          <line x1={(x+w)+'%'} y1="0" x2={(x+w)+'%'} y2="45" stroke="black" strokeWidth={2} key={act.id+'3'} />
          <text fill="black" y={20} x={x+'%'} dx={(w/2)+'%'} textAnchor="middle">{act.name}</text>
        </g>
      )
    })
  };

  render() {
    return (
      <svg className={styles.Activity} height="45" y="150">
        {
          this.renderActivities()
        }
      </svg>
    )
  }
}

export default Activity;
