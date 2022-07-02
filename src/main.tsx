import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import App from "./App";
import { UserDetails } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
