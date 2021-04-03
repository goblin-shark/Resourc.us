import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/styles/styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Jane" />, mountNode);