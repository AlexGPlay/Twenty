import ReactDOM from "react-dom";
import React from "react";

(async function () {
  const response = await fetch("http://localhost:4000");
  const json = await response.json();
  document.getElementById("app");

  ReactDOM.render(<h1>{json.msg}</h1>, document.getElementById("app"));
})();
