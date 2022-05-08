import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ProjectDetail from "../ProjectCyberBug/projectDetail/projectDetail";
import ReactHtmlParser from "react-html-parser";

export default function IndexCyberbugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  console.log(projectDetail);
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
    return projectDetail.lstTask?.map((task, index) => {
      return (
        <div
          data-toggle="modal"
          data-target="#exampleModal"
          key={index}
          className="card mr-2 mt-5"
          style={{ width: "18rem", cursor: "pointer" }}
        >
          <div className="card-header">BACKLOG</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae, neque?
              </p>
              <div className="block">
                <div className="block-left d-flex justify-content-start">
                  <i className="fa fa-bookmark " style={{ color: "green" }}></i>
                  <i className="fa fa-arrow-up" style={{ color: "red" }}></i>
                </div>
                <div className="block-right  ">
                  <div className="avatar-group d-flex justify-content-end">
                    <div className="avatar">
                      <img src="https://picsum.photos/20" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="list-group-item">Lorem ipsum dolor sit amet.</li>
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
            <li className="breadcrumb-item">
              <a href="createproject">Create Project</a>
            </li>
            <li className="breadcrumb-item">
              <a href="/projectmanagement">Project Management</a>
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
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="search"
              aria-label="Search"
            />
          </form>

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
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <ProjectDetail projectDetail={projectDetail}></ProjectDetail>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// data-toggle="modal"
// data-target="#exampleModal"
