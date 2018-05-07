import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from "@cerebral/react";
import controller from "./controller";


import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById("root")
);

registerServiceWorker();
