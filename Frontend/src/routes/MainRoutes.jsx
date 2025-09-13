import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
