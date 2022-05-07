import React from "react";
import { useDispatch } from "react-redux";
import Login from "../../pages/Login/Login";
import Register from "../Register/Register";

export default function DemoHOC() {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Login></Login>,
          });
        }}
        type="button"
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng nhập
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "OPEN_FORM",
            Component: <Register></Register>,
          });
        }}
        type="button "
        className="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modelId"
      >
        Đăng ký
      </button>
    </div>
  );
}
