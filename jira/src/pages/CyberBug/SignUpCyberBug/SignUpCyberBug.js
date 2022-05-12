import { Input, Button } from "antd";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  BookOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector } from "react-redux";
import {
  signinCyberbugAction,
  signUpCyberbugAction,
} from "../../../redux/actions/CyberBugAction";
import { USER_SIGNIN_API } from "../../../redux/constant/CyberBugs";
import theoDoiSignin from "../../../redux/sagas/Cyberbugs/UserCyberBugSaga";
import React from "react";
import { NavLink } from "react-router-dom";

function SignUpCyberBugs(props) {
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
        <h3 className="text-center">Sign Up CyberBugs</h3>

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

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            type="text"
            name="name"
            size="large"
            placeholder="name"
            prefix={<BookOutlined />}
          />
        </div>

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            type="number"
            name="phoneNumber"
            size="large"
            placeholder="phone"
            prefix={<PhoneOutlined />}
          />
        </div>

        <button
          size="large"
          type="submit"
          className="mt-4 btn btn-primary"
          style={{
            backgroundColor: "rgb(102,117,223)",
            color: "#fff",
          }}
        >
          Sign Up
        </button>
        <a href="/login">
          <button type="button" className="mt-4 btn-sm btn-secondary">
            Sign In
          </button>
        </a>

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

const SignUpCyberBugWithFormik = withFormik({
  mapPropsToValues: () => ({
    email: "",
    passWord: "",
    name: "",
    phoneNumber: "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("email is invalid!"),
    passWord: Yup.string()
      .min(6, "password must have min 6 characters")
      .max(32, "password have max 32 characters"),
  }),

  handleSubmit: (
    { email, passWord, name, phoneNumber },
    { props, setSubmitting }
  ) => {
    setSubmitting(true);
    props.dispatch(signUpCyberbugAction(email, passWord, name, phoneNumber));
  },

  displayName: "SignUp CyberBugs",
})(SignUpCyberBugs);

export default connect()(SignUpCyberBugWithFormik);
