import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import "./style.scss";
import App from "./App";
import { UserDetails } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <h1>Github searcher</h1>

      <HashRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </HashRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
