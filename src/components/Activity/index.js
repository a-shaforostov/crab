import React, {Component, Fragment} from 'react';
import { timeToMins, splitBlock, calcBlockPlace } from '../../app/utils'

const styles = {
  activityBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  activityLabel: {
    fontSize: '60%',
    fontWeight: 'bold',
    letterSpacing: '1px',
    padding: '0',
    margin: '0',
    textAlign: 'center',
  },
};

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
             <div style={styles.activityBox}>
               <p xmlns="http://www.w3.org/1999/xhtml" style={styles.activityLabel}>{block.name}</p>
             </div>
           </foreignObject>
         </g>
       )
      });
    })
  };

  render() {
    return (
      <svg height="45" y="148" x="2%" width="96%">
        {
          this.renderActivities()
        }
      </svg>
    )
  }
}

export default Activity;
