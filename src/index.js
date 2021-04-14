import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/styles/styles.scss";
import "core-js/stable";
import "regenerator-runtime/runtime";

var mountNode = document.getElementById("app");
ReactDOM.render(<Router><App /></Router>, mountNode);