import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormCreateTask from "../../Components/Form/FormCreateTask/FormCreateTask";

export default function SiderTemplate(props) {
  const dispatch = useDispatch();

  return (
    <div className="row">
      {/*  -----------------SiderBar----------------- */}
      <div className="siderBar" style={{ height: window.innerHeight }}>
        <div className="siderBarItem">
          <div
            className="createTask"
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_CREATE_TASK",
                ComponentContentDrawer: <FormCreateTask></FormCreateTask>,
                title: "Create task",
              });
            }}
          >
            <i className="fa fa-plus">
              <span>Create task</span>
            </i>
          </div>
          <div className="search">
            <i className="fa fa-search" style={{ cursor: "not-allowed" }}>
              <span>Search</span>
            </i>
          </div>
        </div>
      </div>
      {/* -----------------SiderBar----------------- */}
      {/* --------------------Menu----------------- */}
      <div className="menu col">
        <div className="userInfo">
          <img src="https://picsum.photos/40" alt="..." />
          <div className="user-body">
            <span className="mt-0">Cyberbugs.vn</span> <br />
            <span style={{ fontWeight: 100 }}>Report bugs</span>
          </div>
        </div>
        <div className="menuItem">
          <div className="menuItemPJ ">
            <ul className="list-group">
              <li className="list-group-item text-left ">
                <NavLink
                  className="text-dark"
                  to="/cyberbugs"
                  activeClassName="active"
                >
                  <i className="fa fa-archive text-left"></i>
                  Cyber boards
                </NavLink>
              </li>

              <li className="list-group-item active">
                <NavLink
                  className="text-dark"
                  to="/projectmanagement"
                  activeClassName="active"
                >
                  <i className="fa fa-cog"></i> Project Management
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink
                  className="text-dark"
                  to="/createproject"
                  activeClassName="active"
                >
                  <i className="fa fa-cog"></i> Create Project
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="menuItemAction">
            <ul className="list-group">
              <li className="list-group-item" style={{ cursor: "not-allowed" }}>
                <i className="fa fa-truck"></i> <span>Release</span>
              </li>
              <li className="list-group-item" style={{ cursor: "not-allowed" }}>
                <i className="fa fa-grip-lines"></i>
                <span>Issues and fillters</span>
              </li>
              <li className="list-group-item" style={{ cursor: "not-allowed" }}>
                <i className="fa fa-paste"></i>
                <span>Page</span>
              </li>
              <li className="list-group-item" style={{ cursor: "not-allowed" }}>
                <i className="fa fa-location-arrow"></i>
                <span>Reports</span>
              </li>
              <li className="list-group-item" style={{ cursor: "not-allowed" }}>
                <i className="fa fa-box"></i>
                <span>Components</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
