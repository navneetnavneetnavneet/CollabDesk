import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadUser } from "../store/actions/userActions";
import TeamDetails from "../pages/TeamDetails";
import CreateNewTeam from "../pages/CreateNewTeam";
import ProjectDetails from "../pages/ProjectDetails";
import TaskDetails from "../pages/TaskDetails";

const MainRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(asyncLoadUser());

    isAuthenticated && navigate("/");
    !isAuthenticated && navigate("/login");
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team/details/:teamId" element={<TeamDetails />} />
        <Route
          path="/project/details/:projectId"
          element={<ProjectDetails />}
        />
        <Route path="/task/details/:taskId" element={<TaskDetails />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/create-new-team" element={<CreateNewTeam />} />
        <Route path="/create-new-project" element={<CreateNewProject />} />
        <Route path="/create-new-task" element={<CreateNewTask />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
