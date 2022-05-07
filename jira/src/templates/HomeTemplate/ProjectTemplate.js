import React from "react";
import { NavLink, Route } from "react-router-dom";
import ProjectManagement from "../../pages/CyberBug/ProjectCyberBug/ProjectManagement/ProjectManagement";
import SiderTemplate from "./SiderTemplate";

export default function ProjectTemplate() {
  return (
    <div className="d-flex">
      <SiderTemplate></SiderTemplate>
      <ProjectManagement></ProjectManagement>
    </div>
  );
}
