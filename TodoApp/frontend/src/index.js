import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
/* 
React boostrap configurations

*/
/*

test comment

*/
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
