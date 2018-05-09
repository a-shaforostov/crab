import React, { Component } from 'react';
import { splitBlock, calcBlockPlace, splitText, calcDuration } from '../../app/utils'

import styles from './WorkRange.less';

class WorkRange extends Component {
  // renderBlocks = ({ timeBlocks, timeShift, colors }) => {
  //   return timeBlocks.map(act => {
  //     return splitBlock(act, timeShift).map(block => {
  //       const splText = splitText(`${block.name} ${calcDuration(act, 1).time}`, "sans-serif 65%", 108);
  //       const { x, w } = calcBlockPlace(block, timeShift);
  //       const duration = calcDuration(block).mins;
  //       return (
  //         <g key={block.id}>
  //           <rect x={x + '%'} y={block.isHigh ? '0' : '5%'} width={w + '%'} height={block.isHigh ? '20%' : '15%'} fill={colors[block.color]} />
  //
  //           <svg x={x+'%'} y={72} width={w + '%'} height="108">
  //             {/*<rect x={0} y={0} width="100%" height="100%" fill="red" />*/}
  //             {
  //               !act.isHidden &&
  //               <text x="50%" y="50%" dx="0" dy={108} className={styles.TimeBlockLabel} textAnchor="end" transform="rotate(-90)">
  //                 {
  //                   splText.map((span, index) => (
  //                     <tspan
  //                       dy={index === 0 ? 10-splText.length*10/2 : 10}
  //                       x={72}
  //                       dx={-20+duration/1.7}
  //                       textAnchor="end"
  //                       fill={colors[block.color]}
  //                       key={index}
  //                     >
  //                       {span}
  //                     </tspan>
  //                   ))
  //                 }
  //               </text>
  //             }
  //           </svg>
  //         </g>
  //       )
  //     });
  //   })
  // };

  renderRange = ({ activities, timeShift, colors }) => {
    const workActivity = activities.find(act => act.isWork);
    if (!workActivity) return null;

    const splText = splitText(workActivity.name, "sans-serif 65%", 108);
    const { x, w } = calcBlockPlace(workActivity, timeShift);
    const duration = calcDuration(workActivity).mins;
    return (
      <g>
        <line />
        <text x="50%" y="50%" dx="0" dy={108} className={styles.TimeBlockLabel} textAnchor="end" transform="rotate(-90)">
          {
            splText.map((span, index) => (
              <tspan
                dy={index === 0 ? 10-splText.length*10/2 : 10}
                x={72}
                dx={20}
                textAnchor="end"
                fill={colors[workActivity.color]}
                key={index}
              >
                {span}
              </tspan>
            ))
          }
        </text>
      </g>
    )
  };

  render() {
    const { timeShift, activities, colors } = this.props;
    return (
      <svg className={styles.WorkRange} height="50" x="0" y="46" width="100%">
        <rect x={0} y={0} width="100%" height="100%" fill="red" opacity={0.5}/>
        {activities && this.renderRange({ activities, timeShift, colors })}
      </svg>
    )
  }
}

export default WorkRange;