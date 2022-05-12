import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Router,
  useHistory,
} from "react-router-dom";

import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import LoginCyberBugs from "./pages/CyberBug/LoginCyberBug/LoginCyberBugs";
import { useDispatch } from "react-redux";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import IndexCyberbugs from "./pages/CyberBug/indexCyberbugs/indexCyberbugs";

import "./scss/main.scss";
import CreateProject from "./pages/CyberBug/ProjectCyberBug/CreateProject/CreateProject";
import CreateProjectTemplate from "./templates/HomeTemplate/CreateProjectTemplate";
import ProjectManagement from "./pages/CyberBug/ProjectCyberBug/ProjectManagement/ProjectManagement";
import ProjectTemplate from "./templates/HomeTemplate/ProjectTemplate";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";
import LoadingComponent from "./Components/GlobalSetting/LoadingComponent";
import SignUpCyberBug from "./pages/CyberBug/SignUpCyberBug/SignUpCyberBug";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <>
      <LoadingComponent></LoadingComponent>
      <DrawerCyberbugs></DrawerCyberbugs>
      <Route>
        <Switch>
          <UserLoginTemplate exact path="/" Component={SignUpCyberBug} />
          <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />
          <CyberbugsTemplate
            exact
            path="/projectdetail/:projectId"
            Component={IndexCyberbugs}
          />
          <CyberbugsTemplate
            exact
            path="/cyberbugs"
            Component={IndexCyberbugs}
          />

          <CreateProjectTemplate
            exact
            path="/createproject"
            Component={CreateProject}
          />

          <ProjectTemplate
            exact
            path="/projectmanagement"
            Component={ProjectManagement}
          />
        </Switch>
      </Route>
    </>
  );
}

export default App;
