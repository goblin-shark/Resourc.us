import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/styles/styles.scss";
import "core-js/stable";
import "regenerator-runtime/runtime";
import UserProvider from './components/UserContext';

var mountNode = document.getElementById("app");
ReactDOM.render(<Router><UserProvider><App /></UserProvider></Router>, mountNode);