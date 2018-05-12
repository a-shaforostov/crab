import React, { Component } from 'react';
import {calcBlockPlace, splitBlock, calcDuration, splitText} from '../../app/utils';

const styles = {
  styleText: {
    fontSize: '60%',
    fontWeight: '700',
  },
  caption: {
    fontSize: '65%',
    fontWeight: '600',
    letterSpacing: '0',
    textAlign: 'right',
    transformOrigin: 'center',
  },
};

class Conditions extends Component {
  renderConditions = ({ timeShift = 0, conditions = [] }) => {
    return conditions.map(cond => {
      return splitBlock(cond, timeShift).map((block, index) => {
        const splText = splitText(block.name, "sans-serif 65%", 108);
        const {x, w} = calcBlockPlace(block, timeShift);
        const duration = calcDuration(block).mins;

        return (
          <svg x={x+'%'} y={0} width={w+'%'} height="100%" key={`${cond.id}/${index}`}>
            <rect x={0} y={0} width="100%" height="100%" fill="url(#Pattern)" fillOpacity={cond.opacity || 0.5} />
            <text x="100" y="50%" dx="100" dy={0} style={styles.caption} textAnchor="middle" transform="rotate(-90)">
              {
                splText.map((span, index) => (
                  <tspan
                    dy={index === 0 ? 10-splText.length*10/2 : 10}
                    x="400"
                    dx={-20+duration/1.7}
                    textAnchor="middle"
                    fill="black"
                    key={index}
                  >
                    {span}
                  </tspan>
                ))
              }
            </text>
          </svg>
        )
      })
    })
  };

  render() {
    const { conditions, timeShift } = this.props;
    return (
      <svg height="940" x="0" y="0" width="100%">
        <defs>
          <pattern id="Pattern" x="1" y="1" width="0.005" height="0.005" style={{transform: 'rotateZ(-45deg)'}}>
            <line x1={0} y1={1} x2={1} y2={1} stroke="black" strokeOpacity={0.25} strokeWidth={1} />
          </pattern>
        </defs>
        {/*<rect x={0} y={0} width="100%" height="100%" fill="red" opacity={0.5}/>*/}
        {conditions && this.renderConditions({ timeShift, conditions })}
        {/*<text y="90%" x="50%" style={styles.styleText} fill="#71b773">INTELLECTUAL WORK PRODUCTIVITY PHASES</text>*/}
      </svg>
    )
  }
}

export default Conditions;
