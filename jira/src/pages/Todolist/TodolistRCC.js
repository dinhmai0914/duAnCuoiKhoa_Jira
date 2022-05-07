import React, { Component } from "react";
import Axios from "axios";

export default class TodolistRCC extends Component {
  state = {
    taskList: [],
    values: { taskName: "" },
    errors: { taskName: "" },
  };

  getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });
    promise.then((res) => {
      this.setState((this.state.taskList = res.data));
    });
    promise.catch((err) => {
      console.log(err.data);
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName} </span>
            <div>
              <button onClick={() => this.delTask(item.taskName)}>
                <i className="fa fa-trash-alt"></i>
              </button>
              <button onClick={() => this.doneTask(item.taskName)}>
                <i className="fa fa-check-circle"></i>
              </button>
            </div>
          </li>
        );
      });
  };

  renderTaskToDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName} </span>
            <div>
              <button onClick={() => this.delTask(item.taskName)}>
                <i className="fa fa-trash-alt"></i>
              </button>
              <button onClick={() => this.undoTask(item.taskName)}>
                <i className="fa fa-undo"></i>
              </button>
            </div>
          </li>
        );
      });
  };

  handleChange = (e) => {
    let { value, name } = e.target;
    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...this.state.errors };

    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid!";
    } else {
      newErrors[name] = "";
    }

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };

  addTask = (e) => {
    e.preventDefault();

    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: this.state.values.taskName },
    });
    promise.then((res) => {
      this.getTaskList();
    });
    promise.catch((err) => {
      console.log("loi", err);
    });
  };

  delTask = (taskName) => {
    console.log(taskName);
    let promise = Axios({
      url: ` http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });
    promise.then((res) => {
      this.getTaskList();
    });
    promise.catch((err) => {
      console.log("loi", err);
    });
  };

  doneTask = (taskName) => {
    console.log(taskName);
    let promise = Axios({
      url: ` http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((res) => {
      this.getTaskList();
    });
    promise.catch((err) => {
      console.log("loi", err);
    });
  };

  undoTask = (taskName) => {
    console.log(taskName);
    let promise = Axios({
      url: ` http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((res) => {
      this.getTaskList();
    });
    promise.catch((err) => {
      console.log("loi", err);
    });
  };

  componentDidMount() {
    this.getTaskList();
  }

  render() {
    return (
      <div className="container">
        <div className="card">
          <img
            className="card-img-top "
            src="https://picsum.photos/200/300"
            style={{ width: 200, height: 250 }}
            alt
          />
          <div className="card-body">
            <div className="car-title">
              <h2>My task</h2>
              <p>Today</p>
            </div>
            <div className="card-title">
              <input
                type="text"
                name="taskName"
                onChange={this.handleChange}
                placeholder="Enter an activity..."
              />
              <button onClick={this.addTask}>
                <i className="fa fa-plus"></i>
              </button>
              <p className="text text-danger">{this.state.errors.taskName}</p>
            </div>
            <div id="taskToDo">
              <h5 className="text-danger">Task To Do</h5>
              <ul>{this.renderTaskToDo()}</ul>
            </div>
            <div id="taskDone">
              <h5 className="text-success">Task Done</h5>
              <ul>{this.renderTaskToDone()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
