import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";
import dataMock from '../../data.json';

import Button from 'material-ui/Button';

import scheduleFactory from '../Schedule';
import ScheduleGraph from '../../components/ScheduleGraph';
import OuterConditions from '../../components/OuterConditions';
import styles from './App.less';

const RegularSchedule = scheduleFactory('srcSchedule');
const OptimizedSchedule = scheduleFactory('dstSchedule');

class App extends Component {

  constructor(props) {
    super(props);
    this.scheduleRef = React.createRef();
  };

  handleDownloadSVG = () => {
    // serialize svg in string
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(this.scheduleRef.current);
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    //convert svg source to URI data scheme.
    const data = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    this.props.downloadFile({ data, filename: 'schedule.svg' });
  };

  handleLoadData = (event) => {
    event.target.files[0] &&
    this.props.loadFile({ filename: event.target.files[0] });
  };

  handleSaveData = () => {
    const { data } = this.props;
    console.log(this.props);
    debugger;
    if (data) {
      const uri = "data:application/json,"+encodeURIComponent(JSON.stringify(data));
      this.props.downloadFile({ data: uri, filename: 'data.json' });
    }
  };

  componentDidMount = () => {
    //TODO: REMOVE
    this.props.setData({ data: dataMock });
  };

  render() {
    console.log(this.props.data);
    const { colors, data, timeShift } = this.props;
    return (
      <div className={styles.App}>
        <Button onClick={this.handleSaveData}>Save Data</Button>

        <input
          accept="application/json"
          className={styles.inputFile}
          id="button-data-load"
          type="file"
          onChange={this.handleLoadData}
          hidden
        />
        <label htmlFor="button-data-load">
          <Button component="span">Open Data</Button>
        </label>

        <span>
          Export:&nbsp;
          <a href='' onClick={this.handleDownloadSVG}>svg</a>
        </span>

        <div className={styles.SVGContainer}>
          <svg
            width="1800"
            height="940"
            xmlns="http://www.w3.org/2000/svg"
            ref={this.scheduleRef}
            style={{fontFamily: 'Roboto, sans-serif'}}
          >
            {/*<rect fill="#345672" id="canvas_background" height="100%" width="100%" y="0" x="0"/>*/}
            {/*<rect fill="white" id="canvas_background" height="100%" width="100%" y="0" x="0"/>*/}
            <svg width="100%" height="110" y="800" x="2%" width="96%">
              {
                data && data.dstSchedule && data.dstSchedule.chart &&
                <ScheduleGraph
                  color={colors[data.dstSchedule.chart]}
                  timeBlocks={data.dstSchedule.timeBlocks}
                  timeShift={timeShift}
                />
              }
            </svg>
            <svg x="2%" width="96%" height="940">
              {
                data && data.outerConditions &&
                <OuterConditions conditions={data.outerConditions} timeShift={timeShift} />
              }
            </svg>
            <svg width="100%" height="310" y="130">
              <RegularSchedule />
            </svg>
            <svg width="100%" height="310" y="460">
              <OptimizedSchedule />
            </svg>
          </svg>
        </div>

        {/*<header className={styles.AppHeader}>*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
      </div>
    );
  }
}

export default connect(
  {
    data: state`data`,
    colors: state`colors`,
    timeShift: state`data.timeShift`,
    setData: signal`setData`, //TODO: REMOVE
    loadFile: signal`loadFile`,
    downloadFile: signal`downloadFile`,
  },
  App
);
