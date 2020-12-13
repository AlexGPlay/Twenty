import ReactDOM from "react-dom";
import React from "react";
import Login from "./Login";

document.getElementById("app");

ReactDOM.hydrate(<Login />, document.getElementById("app"));
