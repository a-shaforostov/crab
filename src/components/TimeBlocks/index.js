import React, { Component } from 'react';
import { splitBlock, calcBlockPlace, splitText, calcDuration } from '../../app/utils'

import styles from './TimeBlocks.less';

class TimeBlocks extends Component {
  renderBlocks = ({ timeBlocks, timeShift, colors }) => {
    return timeBlocks.map(act => {
      return splitBlock(act, timeShift).map(block => {
        const splText = splitText(`${block.name} ${calcDuration(act, 1).time}`, "sans-serif 65%", 108);
        const { x, w } = calcBlockPlace(block, timeShift);
        const duration = calcDuration(block).mins;
        return (
          <g key={block.id}>
            <rect x={x + '%'} y={block.isHigh ? '0' : '5%'} width={w + '%'} height={block.isHigh ? '20%' : '15%'} fill={colors[block.color]} />

            <svg x={x+'%'} y={72} width={w + '%'} height="108">
              {/*<rect x={0} y={0} width="100%" height="100%" fill="red" />*/}
              {
                !act.isHidden &&
                <text x="50%" y="50%" dx="0" dy={108} className={styles.TimeBlockLabel} textAnchor="end" transform="rotate(-90)">
                  {
                    splText.map((span, index) => (
                      <tspan
                        dy={index === 0 ? 10-splText.length*10/2 : 10}
                        x={72}
                        dx={-20+duration/1.7}
                        textAnchor="end"
                        fill={colors[block.color]}
                        key={index}
                      >
                        {span}
                      </tspan>
                    ))
                  }
                </text>
              }
            </svg>
          </g>
        )
      });
    })
  };

  renderMilestones = ({ milestones, timeShift, colors }) => {
    return milestones.map(item => {
      const splText = splitText(item.name, "sans-serif 65%", 108);
      const { x } = calcBlockPlace(item, timeShift);
      return (
        <g key={item.id}>
          <svg x={(x-5/2)+'%'} y={72} width="5%" height="108">
            {/*<rect x={0} y={0} width="100%" height="100%" fill="red" />*/}
            {
              !item.isHidden &&
              <text x="50%" y="50%" dx="0" dy={108} className={styles.TimeBlockLabel} textAnchor="end" transform="rotate(-90)">
                {
                  splText.map((span, index) => (
                    <tspan
                      dy={index === 0 ? 10-splText.length*10/2 : 10}
                      x={72}
                      dx={20}
                      textAnchor="end"
                      fill={colors[item.color]}
                      key={index}
                    >
                      {span}
                    </tspan>
                  ))
                }
              </text>
            }
          </svg>
        </g>
      )
    });
  };

  render() {
    const { timeShift, timeBlocks, milestones, colors } = this.props;
    return (
      <svg className={styles.TimeBlocks} height="180" x="2%" y="112" width="96%">
        {timeBlocks && this.renderBlocks({ timeBlocks, timeShift, colors })}
        {milestones && this.renderMilestones({ milestones, timeShift, colors })}
      </svg>
    )
  }
}

export default TimeBlocks;