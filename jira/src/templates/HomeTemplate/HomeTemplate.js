import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "../../Components/Home/Header/Header";

export const HomeTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <Header></Header>
            <Component {...propsRoute}></Component>
          </>
        );
      }}
    ></Route>
  );
};
