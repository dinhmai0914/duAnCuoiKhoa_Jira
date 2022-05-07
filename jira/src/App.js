import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  useHistory,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TodolistRCC from "./pages/Todolist/TodolistRCC";
import DemoHOC from "./pages/DemoHOC/DemoHOC";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBug/LoginCyberBug/LoginCyberBugs";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import indexCyberbugs from "./pages/CyberBug/indexCyberbugs/indexCyberbugs";

import "./scss/main.scss";
import projectDetail from "./pages/CyberBug/ProjectCyberBug/projectDetail/projectDetail";
import CreateProject from "./pages/CyberBug/ProjectCyberBug/CreateProject/CreateProject";
import CreateProjectTemplate from "./templates/HomeTemplate/CreateProjectTemplate";
import ProjectManagement from "./pages/CyberBug/ProjectCyberBug/ProjectManagement/ProjectManagement";
import ProjectTemplate from "./templates/HomeTemplate/ProjectTemplate";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <>
      {/* <Modal></Modal> */}
      <DrawerCyberbugs></DrawerCyberbugs>

      <Switch>
        {/* <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/about" Component={About} />
        <HomeTemplate exact path="/contact" Component={Contact} /> */}
        <CyberbugsTemplate exact path="/cyberbugs" Component={indexCyberbugs} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
        <CreateProjectTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        {/* <HomeTemplate exact path="/profile" Component={Profile} /> */}
        <ProjectTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        {/* <HomeTemplate exact path="/todolistrcc" Component={TodolistRCC} /> */}
        <HomeTemplate path="*" Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
