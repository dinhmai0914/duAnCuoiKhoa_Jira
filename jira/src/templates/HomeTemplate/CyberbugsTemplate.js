import React, { Fragment } from "react";
import { NavLink, Route } from "react-router-dom";

import IndexCyberbugs from "../../pages/CyberBug/indexCyberbugs/indexCyberbugs";
import SiderTemplate from "./SiderTemplate";

export const CyberbugsTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="d-flex">
              <div>
                <SiderTemplate></SiderTemplate>
              </div>
              <div>
                <IndexCyberbugs></IndexCyberbugs>
              </div>
            </div>
          </>
        );
      }}
    ></Route>
  );
};
