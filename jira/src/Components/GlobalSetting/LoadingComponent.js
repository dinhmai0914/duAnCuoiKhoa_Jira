import React from "react";
import styleLoading from "./LoadingComponent.module.css";

import { useSelector } from "react-redux";

export default function LoadingComponent() {
  const { isLoading } = useSelector((state) => state.LoadingIconReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img src={require("../../assets/imgLoading/5Q0v.gif")} alt="" />
      </div>
    );
  } else {
    return "";
  }
}
