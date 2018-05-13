import React, { Component } from 'react';

const styles = {
  title: {
    fontSize: '120%',
    letterSpacing: '1px',
    transform: 'scaleY(1.2)',
  },
  titleName: {
    fontWeight: 'bolder',
  },
};

class Title extends Component {
  renderTitle = ({ title }) => {
    return (
      <g>
        <text
          x={0}
          y={20}
          textAnchor="start"
          fill="black"
          style={styles.title}
        >
          <tspan style={styles.titleName}>{title}</tspan>
          &nbsp;
          <tspan>Schedule</tspan>
        </text>
      </g>
    )
  };

  render() {
    const { title } = this.props;
    return (
      <svg height="50" x="2%" y="0" width="300">
        {title && this.renderTitle({ title })}
      </svg>
    )
  }
}

export default Title;
