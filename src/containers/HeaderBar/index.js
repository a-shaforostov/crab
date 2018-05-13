import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { signal } from "cerebral/tags";

import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import Save from '@material-ui/icons/Save';
import FolderOpen from '@material-ui/icons/FolderOpen';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

const styles = theme => ({
  title: {
    marginRight: '30px',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    backgroundColor: '#ff5789',
    border: 0,
  },
});

class HeaderBar extends Component {

  handleDownloadSVG = () => {
    // serialize svg in string
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(window.svgRef.current);
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    //convert svg source to URI data scheme.
    const data = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    this.props.downloadFile({ data, filename: 'schedule.svg' });
  };

  handleDownloadPDF = (e) => {
    // e.preventDefault();
    // // serialize svg in string
    // const serializer = new XMLSerializer();
    // let source = serializer.serializeToString(window.svgRef.current);
    // source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    // //convert svg source to URI data scheme.
    // const data = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    // const url = 'https://api.cloudconvert.com/process';
    // const body = {
    //   apikey: 'wUC1tZEizMi2dlf7G6Qei7tq3b89C61caBiuabsNSduCV882Tjg27erfBvVCyWrT',
    //   inputformat: 'svg',
    //   outputformat: 'pdf',
    //   input: 'base64',
    //   file: data,
    //   filename: 'schedule.svg',
    //   wait: false,
    //   download: true,
    // };
    // this.props.convertOnline({ url, body, method: 'post' });
    window.print();
  };

  handleLoadData = (event) => {
    event.target.files[0] &&
    this.props.loadFile({ filename: event.target.files[0] });
  };

  handleClearDoc = (event) => {
    this.props.clearDoc();
  };

  handleSaveData = (e) => {
    e.preventDefault();
    const { data } = this.props;
    if (data) {
      const uri = "data:application/json,"+encodeURIComponent(JSON.stringify(data));
      this.props.downloadFile({ data: uri, filename: 'data.json' });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.title}>
          Schedule visualizer
        </Typography>

        <div className={classes.title}>
          <input
            accept="application/json"
            className={styles.inputFile}
            id="button-data-load"
            type="file"
            onChange={this.handleLoadData}
            hidden
          />

          <Button color="inherit" className={classes.menuButton} onClick={this.handleClearDoc}>
            <CheckBoxOutlineBlank className={classes.leftIcon} />New
          </Button>

          <label htmlFor="button-data-load">
            <Button color="inherit" className={classes.menuButton} component="span">
              <FolderOpen className={classes.leftIcon} />Open
            </Button>
          </label>

          <Button color="inherit" className={classes.menuButton} onClick={this.handleSaveData}>
            <Save className={classes.leftIcon} />Save
          </Button>
        </div>

        <div className={classes.title}>
          <span className={classes.title}>Export:</span>
          <Button color="inherit" className={classes.menuButton} onClick={this.handleDownloadSVG}>SVG</Button>
          <Button color="inherit" className={classes.menuButton} onClick={this.handleDownloadPDF}>PDF</Button>
        </div>
      </Toolbar>
    );
  }
}

export default connect(
  {
    clearDoc: signal`clearDoc`,
    loadFile: signal`loadFile`,
    downloadFile: signal`downloadFile`,
    convertOnline: signal`convertOnline`,
  },
  withStyles(styles)(HeaderBar)
);
