import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from "cerebral/tags";

import Button from 'material-ui/Button';

import Schedule from '../Schedule';

import styles from './App.less';

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
    data &&
    this.props.downloadFile({ data: JSON.stringify(data), filename: 'data.json' });
  };

  render() {
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

        <Button href='' onClick={this.handleDownloadSVG}>Save .svg</Button>

        <svg
          className="schedule-svg"
          width="100%"
          height="400"
          xmlns="http://www.w3.org/2000/svg"
          ref={this.scheduleRef}
        >
          <rect fill="#345672" id="canvas_background" height="100%" width="100%" y="-1" x="-1"/>
          <Schedule />
        </svg>

        <header className={styles.AppHeader}>
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default connect(
  {
    data: state`data`,
    loadFile: signal`loadFile`,
    downloadFile: signal`downloadFile`,
  },
  App
);
