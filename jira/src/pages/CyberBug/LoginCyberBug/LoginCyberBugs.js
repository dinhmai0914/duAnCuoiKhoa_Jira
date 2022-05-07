import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { signinCyberbugAction } from "../../../redux/actions/CyberBugAction";
import { USER_SIGNIN_API } from "../../../redux/constant/CyberBugs";
import theoDoiSignin from "../../../redux/sagas/Cyberbugs/UserCyberBugSaga";
import React from "react";

function LoginCyberBugs(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center">Login CyberBugs</h3>

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            type="text"
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            size="large"
            placeholder="email"
            prefix={<UserOutlined />}
          />
        </div>

        <div className="text-danger">{errors.email}</div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            type="passWord"
            name="passWord"
            size="large"
            placeholder="passWord"
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.passWord}</div>
        <button
          size="large"
          type="submit"
          className="mt-4"
          style={{
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
          }}
        >
          Login
        </button>
        <div className="social mt-3 d-flex">
          <Button
            style={{ backgroundColor: "rgb(59,89,152)" }}
            type="primary"
            shape="circle"
            icon={<FacebookOutlined />}
            size={"large"}
          ></Button>
          <Button
            type="primary ml-3"
            shape="circle"
            icon={<TwitterOutlined />}
            size={"large"}
          ></Button>
        </div>
      </div>
    </form>
  );
}

const LoginCyberBugWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email is invalid!"),
    passWord: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password have max 32 characters"),
  }),

  handleSubmit: ({ email, passWord }, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch(signinCyberbugAction(email, passWord));
  },

  displayName: "Login CyberBugs",
})(LoginCyberBugs);

export default connect()(LoginCyberBugWithFormik);
