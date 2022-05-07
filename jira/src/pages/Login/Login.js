import React, { useState, Component } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    passWord: "",
    status: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };

    let valid = true;
    for (const key in newUserLogin) {
      if (key !== "status") {
        if (newUserLogin[key].trim() === "") valid = false;
      }
    }
    if (!valid) {
      newUserLogin.status = true;
    } else {
      newUserLogin.status = false;
    }
    setUserLogin(newUserLogin);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (
      userLogin.userName === "cyberlearn" &&
      userLogin.passWord === "cyberlearn"
    ) {
      // props.history.goBack();

      props.history.goBack();
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("khong dung");
      return;
    }
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>User Name</p>
        <input
          name="userName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          name="passWord"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success">Đăng nhập</button>
        <Prompt
          when={userLogin.status}
          message={(location) => {
            console.log(location);
            return "Ban dang roi khoi trang";
          }}
        ></Prompt>
      </div>
    </form>
  );
}
