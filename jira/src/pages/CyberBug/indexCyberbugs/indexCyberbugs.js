import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ProjectDetail from "../ProjectCyberBug/projectDetail/projectDetail";
import ReactHtmlParser from "react-html-parser";

export default function IndexCyberbugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    //khi nguoi dung link qua trang nay thi se lay tham so tu url => goi saga
    const { projectId } = props.props.computedMatch.params;
    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId: projectId,
    });
  }, []);

  const renderProgressTab = () => {
    return projectDetail.lstTask?.map((taskListDetail, index) => {
      return (
        <div
          key={index}
          className="card mr-2 mt-5 shadow rounded border-0"
          style={{
            width: "18rem",
            height: "auto",
            background: "rgb(244, 245, 247)",
          }}
        >
          <div className="card-header" style={{ color: "rgb(94, 108, 132)" }}>
            {taskListDetail.statusName}
          </div>
          <ul className="list-group list-group-flush">
            {taskListDetail.lstTaskDeTail?.map((task, index) => {
              return (
                <li
                  data-toggle="modal"
                  data-target="#exampleModal"
                  style={{
                    cursor: "pointer",
                  }}
                  key={index}
                  className="list-group-item"
                  onClick={() => {
                    dispatch({
                      type: "GET_TASK_DETAIL_SAGA",
                      taskId: task.taskId,
                    });
                  }}
                >
                  <p style={{ color: "#172B4D" }}>{task.taskName}</p>
                  <div className="row">
                    <div className=" col-3 ">
                      <p className="text-danger">
                        {task.priorityTask.priority}
                      </p>
                    </div>
                    <div className="col-9">
                      <div className="avatar-group d-flex  pull-right">
                        {task.assigness?.map((member, index) => {
                          return (
                            <div key={index} className="avatar overflow-hidden">
                              <img
                                src={member.avatar}
                                alt="member.avatar"
                                style={{ width: "30px", height: "30px" }}
                                className="rounded-circle mr-1 "
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="mainContents col pl-0 container">
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item ">
              <a style={{ color: "rgb(94, 108, 132)" }} href="/createproject">
                Create Project
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                style={{ color: "rgb(94, 108, 132)" }}
                href="/projectmanagement"
              >
                Project Management
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {projectDetail.projectName}
            </li>
          </ol>
        </nav>
      </div>
      <div className="title">
        <div className="mainTitle">
          <h4>{projectDetail.projectName}</h4>
        </div>
        <div className="description">
          {ReactHtmlParser(projectDetail.description)}
        </div>
        <div className="navbarTab d-flex">
          {/* <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="search"
              aria-label="Search"
              style={{ background: "rgb(244, 245, 247)" }}
            />
          </form> */}

          <div className="d-flex ">
            {projectDetail.members?.map((user, index) => {
              return (
                <div className="media mr-1">
                  <img
                    src={user.avatar}
                    alt={user.avatar}
                    style={{
                      witdth: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="d-flex ">{renderProgressTab()}</div>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </button>
              </div>
              <div className="modal-body">
                <ProjectDetail projectDetail={projectDetail}></ProjectDetail>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
