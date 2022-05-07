import React from "react";
import { Redirect } from "react-router-dom";

import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

export default function Profile(props) {
  if (localStorage.getItem("userLogin")) {
    return <div>Profile</div>;
  } else {
    alert("Vui long dang nhap");
    return <Redirect to="./login"></Redirect>;
  }
}
