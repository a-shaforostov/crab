import { Controller } from "cerebral";
import Devtools from "cerebral/devtools";
import app from "./app/index";

const controller = Controller(app, {
  devtools: navigator.userAgent.toLowerCase().includes("chrome")
    ? Devtools({ host: "localhost:8686" })
    : null
});

export default controller;
