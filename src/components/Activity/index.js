import React, {Component, Fragment} from 'react';
import { timeToMins, splitBlock, calcBlockPlace } from '../../app/utils'

import styles from './Activity.less';

class Activity extends Component {
  renderActivities = () => {
    const { timeShift, activities } = this.props;
    if (!activities) return null;
    return activities.map(act => {
      return splitBlock(act, timeShift).map(block => {
        const { x, w } = calcBlockPlace(block, timeShift);
        return (
         <g key={block.id}>
           {
             !block.isTransport &&
             <rect x={x + '%'} y="0" width={w + '%'} height="30" key={block.id + '1'} fill="#e5fae6"/>
           }

           <line x1={x+'%'} y1="0" x2={x+'%'} y2="45" stroke="black" strokeWidth={2} key={block.id+'2'} />
           <line x1={(x+w)+'%'} y1="0" x2={(x+w)+'%'} y2="45" stroke="black" strokeWidth={2} key={block.id+'3'} />
           <foreignObject y={0} x={x+'%'} width={w+'%'} height="30">
             <div className={styles.ActivityBox}>
               <p xmlns="http://www.w3.org/1999/xhtml" className={styles.ActivityLabel}>{block.name}</p>
             </div>
           </foreignObject>
         </g>
       )
      });
    })
  };

  render() {
    return (
      <svg className={styles.Activity} height="45" y="148" x="2%" width="96%">
        {
          this.renderActivities()
        }
      </svg>
    )
  }
}

export default Activity;
