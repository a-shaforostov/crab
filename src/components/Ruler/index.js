import React, {Component, Fragment} from 'react';

const styleHour = {
  fill: 'black',
  fontSize: '80%',
  transform: 'translateX(-0.8%) translateY(-5px)'
};

class Ruler extends Component {
  constructor(props) {
    super(props);
    this.me = React.createRef();
  }

  drawMarkup = ({ timeShift, workActivity }) => {
    // creating hours line
    const hours = [];
    for (let i = 0; i <= 24; i++) {
      hours.push((i + timeShift) % 24);
    }

    const elements = [];
    const largeStep = 96 / 24; // 100% / 25 lines - 1h
    const smallStep = largeStep / 4; // 15m
    const y1 = '100%';
    for (let i = 0; i < 24; i++) {
      const lx = largeStep * i + 2;
      const y2 = `${100-50}%`;
      elements.push(<line x1={`${lx}%`} y1={y1} x2={`${lx}%`} y2={y2} stroke="black" strokeWidth="2" key={i} />);
      const hr = `${hours[i]}`.padStart(2,0)+':00';
      if (!workActivity || (workActivity.time1 !== hr && workActivity.time2 !== hr)) {
        elements.push(<text y={y2} x={`${lx}%`} style={styleHour} key={`t${i}`} hour={hours[i]} index={i}>{hr}</text>);
      }
      for (let j = 1; j <= 3; j++) {
        const sx = lx + smallStep * j;
        const y2 = j === 2 ? `${100-50}%` : `${100-40}%`;
        elements.push(<line x1={`${sx}%`} y1={y1} x2={`${sx}%`} y2={y2} stroke="black" key={`${i}-${j}`} />);
      }
    }
    const lx = largeStep * 24 + 2;
    const y2 = `${100-50}%`;
    elements.push(<line x1={`${lx}%`} y1={y1} x2={`${lx}%`} y2={y2} stroke="black" strokeWidth="2" key={24} />);
    const hr = `${hours[24]}`.padStart(2,0)+':00';
    elements.push(<text y={y2} x={`${lx}%`} style={styleHour} key="t24" hour={hours[24]} index={24}>{hr}</text>);

    return (
      <g>
        {elements}
      </g>
    )
  };

  render() {
    const { timeShift, workActivity } = this.props;

    return (
      <svg height="104" y="44" >
        {this.drawMarkup({ timeShift, workActivity })}
      </svg>
    )
  }
}

export default Ruler;
