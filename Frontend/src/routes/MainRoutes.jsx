import React, { Profiler } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/layout/Layout";
import Projects from "../pages/Projects";
import Teams from "../pages/Teams";
import Tasks from "../pages/Tasks";
import CreateNewProject from "../pages/CreateNewProject";
import CreateNewTask from "../pages/CreateNewTask";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-new-project" element={<CreateNewProject />} />
        <Route path="/create-new-task" element={<CreateNewTask />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
