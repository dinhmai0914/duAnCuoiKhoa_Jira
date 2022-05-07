import React from "react";
import { NavLink } from "react-router-dom";

export default function SiderTemplate() {
  return (
    <div className="row">
      {/*  -----------------SiderBar----------------- */}
      <div className="siderBar" style={{ height: window.innerHeight }}>
        <div className="siderBarItem">
          <div className="createTask">
            <i class="fa fa-plus">
              <span>Create task</span>
            </i>
          </div>
          <div className="search">
            <i class="fa fa-search">
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
              <li className="list-group-item ">
                <NavLink
                  className="text-dark"
                  to="/cyberbugs"
                  activeClassName="active"
                >
                  <i class="fa fa-archive"></i>
                  Cyber boards
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink
                  className="text-dark"
                  to="/projectmanagement"
                  activeClassName="active"
                >
                  <i class="fa fa-cog"></i> Project Management
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink
                  className="text-dark"
                  to="/createproject"
                  activeClassName="active"
                >
                  <i class="fa fa-cog"></i> Create Project
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="menuItemAction">
            <ul className="list-group">
              <li className="list-group-item">
                <i class="fa fa-truck"></i> <span>Release</span>
              </li>
              <li className="list-group-item">
                <i class="fa fa-grip-lines"></i>
                <span>Issues and fillters</span>
              </li>
              <li className="list-group-item">
                <i class="fa fa-paste"></i>
                <span>Page</span>
              </li>
              <li className="list-group-item">
                <i class="fa fa-location-arrow"></i>
                <span>Reports</span>
              </li>
              <li className="list-group-item">
                <i class="fa fa-box"></i>
                <span>Components</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
