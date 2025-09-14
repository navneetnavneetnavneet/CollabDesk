import React, { Profiler } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";
import Projects from "../pages/Projects";
import CreateNewProject from "../pages/CreateNewProject";
import Profile from "../pages/Profile";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-new-project" element={<CreateNewProject />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
