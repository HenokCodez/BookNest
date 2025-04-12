import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Update from "./components/Update";
import Add from "./components/Add";
import "./assets/full.css";

export default function () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </Router>
  );
}
