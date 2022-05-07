import React from "react";
import { NavLink } from "react-router-dom";
import CreateProject from "../../pages/CyberBug/ProjectCyberBug/CreateProject/CreateProject";
import SiderTemplate from "./SiderTemplate";

export default function CreateProjectTemplate() {
  return (
    <div className="d-flex">
      <div>
        <SiderTemplate></SiderTemplate>
      </div>
      <div>
        <CreateProject></CreateProject>
      </div>
    </div>
  );
}
